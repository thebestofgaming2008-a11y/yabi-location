const assert = require('node:assert/strict');
const { test } = require('node:test');
const path = require('node:path');
const { buildSync } = require('esbuild');

// Exercise the actual Convex query and mutation handlers with isolated records.
// No credentials, network requests, or changes to the live fleet are needed.
const bundled = buildSync({
  entryPoints: [path.join(__dirname, '../convex/portal.ts')],
  bundle: true, platform: 'node', format: 'cjs', packages: 'external', write: false,
});
const loaded = { exports: {} };
new Function('require', 'module', 'exports', bundled.outputFiles[0].text)(require, loaded, loaded.exports);
const portal = loaded.exports;

function fixture(extra = {}) {
  const tables = structuredClone({
    portalAccounts: [{ _id: 'admin', active: true, role: 'admin', displayName: 'Admin' }],
    customerDrivers: [
      { _id: 'driver', customerId: 'company', fullName: 'Driver', active: true },
      { _id: 'other', customerId: 'other-company', fullName: 'Other driver', active: true },
    ],
    operationalVehicles: [{
      _id: 'car', registrationPlate: 'TEST-001', make: 'Renault', model: 'Master',
      status: 'available', currentMileage: 50000, year: 2023, color: 'white',
      format: 'l2h2', createdAt: 1, updatedAt: 1,
    }],
    rentals: [], driverVehicleAssignments: [], vehicleReplacementCases: [],
    operationalActivities: [], auditEvents: [], ...extra,
  });
  const db = {
    async get(id) { return Object.values(tables).flat().find((row) => row._id === id) ?? null; },
    async patch(id, fields) {
      const row = await this.get(id);
      assert.ok(row, `Missing record: ${id}`);
      Object.assign(row, fields);
    },
    async insert(table, fields) {
      const _id = `${table}-${tables[table].length + 1}`;
      tables[table].push({ _id, ...fields });
      return _id;
    },
    query(table) {
      let rows = [...tables[table]];
      return {
        withIndex(_name, range) {
          const builder = { eq(key, value) { rows = rows.filter((row) => row[key] === value); return builder; } };
          range?.(builder);
          return this;
        },
        order(direction) { rows.sort((a, b) => ((a._creationTime || 0) - (b._creationTime || 0)) * (direction === 'desc' ? -1 : 1)); return this; },
        async take(n) { return rows.slice(0, n); },
      };
    },
  };
  return { ctx: { db }, tables };
}
const list = (f, driverId = 'driver', actorAccountId = 'admin') => portal.getDriverAssignmentVehicles._handler(f.ctx, { driverId, actorAccountId });
const assign = (f, vehicleIds = ['car'], driverId = 'driver') => portal.setDriverVehicleAssignments._handler(f.ctx, { actorAccountId: 'admin', driverId, vehicleIds });
const booked = (customerId = 'company') => ({ _id: 'rental', customerId, vehicleId: 'car', status: 'scheduled' });

test('a company-booked car appears and saves for its driver, even when rented/reserved', async () => {
  for (const status of ['available', 'reserved', 'rented']) {
    const f = fixture({ rentals: [booked()] });
    f.tables.operationalVehicles[0].status = status;
    assert.deepEqual((await list(f)).vehicles.map((v) => v.id), ['car']);
    await assign(f);
    assert.equal(f.tables.driverVehicleAssignments[0].vehicleId, 'car');
    assert.equal(f.tables.operationalVehicles[0].status, 'rented');
    assert.equal(f.tables.rentals.length, 1);
    assert.equal(f.tables.operationalActivities[0].kind, 'vehicle.assignment_changed');
  }
});

test('another customer booking is excluded and rejected even if status says available', async () => {
  const f = fixture({ rentals: [booked('other-company')] });
  assert.equal((await list(f)).vehicles.length, 0);
  await assert.rejects(assign(f), /vehicle_unavailable/);
  assert.equal(f.tables.driverVehicleAssignments.length, 0);
});

test('another driver assignment is excluded, including legacy assignments without active flag', async () => {
  for (const active of [true, undefined]) {
    const f = fixture({ driverVehicleAssignments: [{ _id: 'assignment', driverId: 'other', vehicleId: 'car', active }] });
    assert.equal((await list(f)).vehicles.length, 0);
    await assert.rejects(assign(f), /vehicle_unavailable/);
  }
});

test('a vehicle taken after opening the selector is rejected on save', async () => {
  const f = fixture();
  assert.equal((await list(f)).vehicles.length, 1);
  f.tables.driverVehicleAssignments.push({ _id: 'taken', driverId: 'other', vehicleId: 'car', active: true });
  await assert.rejects(assign(f), /vehicle_unavailable/);
});

test('completed replacement history and ended assignments do not permanently reserve a car', async () => {
  const f = fixture({
    vehicleReplacementCases: [{ _id: 'case', replacementVehicleId: 'car', driverId: 'other', customerId: 'other-company', status: 'completed' }],
    driverVehicleAssignments: [{ _id: 'old', vehicleId: 'car', driverId: 'other', active: false, endedAt: 10 }],
  });
  assert.equal((await list(f)).vehicles.length, 1);
  await assign(f);
  assert.equal(f.tables.driverVehicleAssignments.filter((a) => a.active === true).length, 1);
});

test('planned and active replacements for another driver remain excluded', async () => {
  for (const status of ['planned', 'active']) {
    const f = fixture({ vehicleReplacementCases: [{ _id: 'case', replacementVehicleId: 'car', driverId: 'other', customerId: 'company', status }] });
    assert.equal((await list(f)).vehicles.length, 0);
    await assert.rejects(assign(f), /vehicle_unavailable/);
  }
});

test('maintenance, cleaning, and inactive cars are not new assignments', async () => {
  for (const status of ['maintenance', 'cleaning', 'inactive']) {
    const f = fixture({ rentals: [booked()] });
    f.tables.operationalVehicles[0].status = status;
    assert.equal((await list(f)).vehicles.length, 0);
    await assert.rejects(assign(f), /vehicle_unavailable/);
  }
});

test('current assignment remains visible during repair', async () => {
  const f = fixture({ driverVehicleAssignments: [{ _id: 'current', driverId: 'driver', vehicleId: 'car', active: true }] });
  f.tables.operationalVehicles[0].status = 'maintenance';
  const result = await list(f);
  assert.equal(result.currentVehicleId, 'car');
  assert.equal(result.vehicles.length, 1);
  await assign(f);
  assert.equal(f.tables.operationalVehicles[0].status, 'maintenance');
  assert.equal(f.tables.driverVehicleAssignments.length, 1);
});

test('changing to an already-booked car does not merge two company rentals', async () => {
  const f = fixture({
    rentals: [booked(), { _id: 'previous-rental', customerId: 'company', vehicleId: 'old-car', status: 'active' }],
    driverVehicleAssignments: [{ _id: 'old-assignment', driverId: 'driver', vehicleId: 'old-car', active: true }],
  });
  f.tables.operationalVehicles.push({ ...f.tables.operationalVehicles[0], _id: 'old-car', status: 'rented' });
  await assign(f);
  assert.deepEqual(f.tables.rentals.map((r) => r.vehicleId), ['car', 'old-car']);
  assert.equal(f.tables.operationalVehicles[1].status, 'rented');
  assert.equal(f.tables.driverVehicleAssignments[0].active, false);
  assert.ok(f.tables.driverVehicleAssignments[0].endedAt);
});

test('reassignment moves the current rental to a free car but preserves the old repair status', async () => {
  const f = fixture({
    rentals: [{ _id: 'rental', customerId: 'company', vehicleId: 'old-car', status: 'active' }],
    driverVehicleAssignments: [{ _id: 'old-assignment', driverId: 'driver', vehicleId: 'old-car', active: true }],
  });
  f.tables.operationalVehicles.push({ ...f.tables.operationalVehicles[0], _id: 'old-car', status: 'maintenance' });
  await assign(f);
  assert.equal(f.tables.rentals[0].vehicleId, 'car');
  assert.equal(f.tables.rentals[0].contractVehicleId, 'old-car');
  assert.equal(f.tables.operationalVehicles[1].status, 'maintenance');
});

test('unassigning releases an unused car, but preserves an open rental or maintenance status', async () => {
  for (const [status, rentals, expected] of [['rented', [], 'available'], ['rented', [booked()], 'rented'], ['maintenance', [], 'maintenance']]) {
    const f = fixture({ rentals, driverVehicleAssignments: [{ _id: 'current', driverId: 'driver', vehicleId: 'car', active: true }] });
    f.tables.operationalVehicles[0].status = status;
    await assign(f, []);
    assert.equal(f.tables.operationalVehicles[0].status, expected);
    assert.equal(f.tables.driverVehicleAssignments[0].active, false);
  }
});

test('admin authorization and one-vehicle rule are enforced by the backend', async () => {
  const f = fixture();
  f.tables.portalAccounts.push({ _id: 'customer', role: 'customer', active: true });
  await assert.rejects(list(f, 'driver', 'customer'), /forbidden/);
  await assert.rejects(portal.setDriverVehicleAssignments._handler(f.ctx, { actorAccountId: 'customer', driverId: 'driver', vehicleIds: ['car'] }), /forbidden/);
  await assert.rejects(assign(f, ['car', 'car']), /one_active_vehicle_per_driver/);
});
