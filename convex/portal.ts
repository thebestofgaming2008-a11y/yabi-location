import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import {
  internalMutation,
  internalQuery,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import {
  accidentLiabilityValidator,
  belgianProvinceValidator,
  captureSourceValidator,
  maintenanceInterventionTypeValidator,
  mediaCategoryValidator,
  operationalVehicleStatusValidator,
  portalRoleValidator,
  rentalStatusValidator,
  vehicleFormatValidator,
  workflowTypeValidator,
  vehicleDispositionValidator,
} from "./schema";
import { maintenanceItemCodes } from "./maintenanceCatalog";
import { portalRateLimiter } from "./rateLimits";

type PortalRole = Doc<"portalAccounts">["role"];
type WorkflowType = Doc<"workflowRecords">["type"];
const maintenanceItemCodeSet = new Set<string>(maintenanceItemCodes);

const accountPublicValidator = v.object({
  id: v.id("portalAccounts"),
  displayName: v.string(),
  role: portalRoleValidator,
  codeHint: v.string(),
  active: v.boolean(),
  linkedCustomerId: v.optional(v.id("customers")),
  linkedDriverId: v.optional(v.id("customerDrivers")),
  allowedWorkflowTypes: v.optional(v.array(workflowTypeValidator)),
  lastLoginAt: v.optional(v.number()),
  createdAt: v.number(),
});

const customerPublicValidator = v.object({
  id: v.id("customers"),
  fullName: v.string(),
  company: v.optional(v.string()),
  companyVatNumber: v.optional(v.string()),
  email: v.string(),
  phone: v.string(),
  address: v.optional(v.string()),
  street: v.optional(v.string()),
  houseNumber: v.optional(v.string()),
  addressBox: v.optional(v.string()),
  postalCode: v.optional(v.string()),
  city: v.optional(v.string()),
  province: v.optional(v.string()),
  identityCardNumber: v.optional(v.string()),
  nationalRegisterNumber: v.optional(v.string()),
  drivingLicenseNumber: v.optional(v.string()),
  emergencyContact: v.optional(v.string()),
  notes: v.optional(v.string()),
  status: v.union(v.literal("lead"), v.literal("active"), v.literal("inactive")),
  portalAccountId: v.optional(v.id("portalAccounts")),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const driverPublicValidator = v.object({
  id: v.id("customerDrivers"),
  customerId: v.id("customers"),
  portalAccountId: v.optional(v.id("portalAccounts")),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  fullName: v.string(),
  email: v.optional(v.string()),
  phone: v.string(),
  identityCardNumber: v.string(),
  dateOfBirth: v.optional(v.string()),
  drivingLicenceNumber: v.string(),
  licenceIssueDate: v.string(),
  licenceValidSince: v.string(),
  active: v.boolean(),
  accountActive: v.optional(v.boolean()),
  codeHint: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const operationalVehiclePublicValidator = v.object({
  id: v.id("operationalVehicles"),
  registrationPlate: v.string(),
  make: v.string(),
  model: v.string(),
  year: v.number(),
  format: vehicleFormatValidator,
  color: v.string(),
  vin: v.optional(v.string()),
  status: operationalVehicleStatusValidator,
  currentMileage: v.number(),
  fuelPercent: v.optional(v.number()),
  notes: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const rentalPublicValidator = v.object({
  id: v.id("rentals"),
  reference: v.string(),
  customerId: v.id("customers"),
  vehicleId: v.id("operationalVehicles"),
  status: rentalStatusValidator,
  startDate: v.string(),
  expectedEndDate: v.optional(v.string()),
  actualEndDate: v.optional(v.string()),
  monthlyPriceCents: v.number(),
  vatExcluded: v.boolean(),
  depositCents: v.optional(v.number()),
  mileageAllowance: v.optional(v.number()),
  notes: v.optional(v.string()),
  createdBy: v.id("portalAccounts"),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const workflowPublicValidator = v.object({
  id: v.id("workflowRecords"),
  reference: v.string(),
  type: workflowTypeValidator,
  actorAccountId: v.id("portalAccounts"),
  vehicleId: v.optional(v.id("operationalVehicles")),
  customerId: v.optional(v.id("customers")),
  rentalId: v.optional(v.id("rentals")),
  driverId: v.optional(v.id("customerDrivers")),
  licensePlate: v.optional(v.string()),
  occurredAt: v.number(),
  mileage: v.optional(v.number()),
  mileageAfter: v.optional(v.number()),
  fuelPercent: v.optional(v.number()),
  autonomyKm: v.optional(v.number()),
  personName: v.optional(v.string()),
  customerName: v.optional(v.string()),
  employeeName: v.optional(v.string()),
  secondaryLicensePlate: v.optional(v.string()),
  secondaryMileage: v.optional(v.number()),
  secondaryAutonomyKm: v.optional(v.number()),
  originAddress: v.optional(v.string()),
  destinationAddress: v.optional(v.string()),
  disposition: v.optional(vehicleDispositionValidator),
  mechanicName: v.optional(v.string()),
  maintenanceInterventionType: v.optional(maintenanceInterventionTypeValidator),
  maintenanceItems: v.optional(v.array(v.string())),
  maintenanceOtherDetails: v.optional(v.string()),
  roadTestPerformed: v.optional(v.boolean()),
  readyForService: v.optional(v.boolean()),
  eventOccurredAt: v.optional(v.number()),
  accidentLiability: v.optional(accidentLiabilityValidator),
  amicableSettlement: v.optional(v.boolean()),
  invoiceReference: v.optional(v.string()),
  inspectionMonth: v.optional(v.string()),
  performedByName: v.optional(v.string()),
  maintenanceWork: v.optional(v.string()),
  changesMade: v.optional(v.string()),
  reportCategory: v.optional(
    v.union(
      v.literal("damage"),
      v.literal("mechanical"),
      v.literal("administrative"),
      v.literal("request"),
      v.literal("other"),
    ),
  ),
  reportPriority: v.optional(
    v.union(v.literal("low"), v.literal("normal"), v.literal("urgent")),
  ),
  description: v.optional(v.string()),
  status: v.union(v.literal("submitted"), v.literal("resolved")),
  resolution: v.optional(v.string()),
  resolvedAt: v.optional(v.number()),
  resolvedBy: v.optional(v.id("portalAccounts")),
  notificationEmailStatus: v.optional(
    v.union(
      v.literal("not_configured"),
      v.literal("pending"),
      v.literal("sent"),
      v.literal("failed"),
    ),
  ),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const auditPublicValidator = v.object({
  id: v.id("auditEvents"),
  actorAccountId: v.optional(v.id("portalAccounts")),
  action: v.string(),
  entityType: v.string(),
  entityId: v.string(),
  summary: v.string(),
  metadata: v.optional(v.string()),
  createdAt: v.number(),
});

const reportCategoryValidator = v.union(
  v.literal("damage"),
  v.literal("mechanical"),
  v.literal("administrative"),
  v.literal("request"),
  v.literal("other"),
);

const reportPriorityValidator = v.union(
  v.literal("low"),
  v.literal("normal"),
  v.literal("urgent"),
);

function publicAccount(account: Doc<"portalAccounts">) {
  return {
    id: account._id,
    displayName: account.displayName,
    role: account.role,
    codeHint: account.codeHint,
    active: account.active,
    linkedCustomerId: account.linkedCustomerId,
    linkedDriverId: account.linkedDriverId,
    allowedWorkflowTypes: account.allowedWorkflowTypes,
    lastLoginAt: account.lastLoginAt,
    createdAt: account.createdAt,
  };
}

function publicCustomer(customer: Doc<"customers">) {
  return {
    id: customer._id,
    fullName: customer.fullName,
    company: customer.company,
    companyVatNumber: customer.companyVatNumber,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    street: customer.street,
    houseNumber: customer.houseNumber,
    addressBox: customer.addressBox,
    postalCode: customer.postalCode,
    city: customer.city,
    province: customer.province,
    identityCardNumber: customer.identityCardNumber,
    nationalRegisterNumber: customer.nationalRegisterNumber,
    drivingLicenseNumber: customer.drivingLicenseNumber,
    emergencyContact: customer.emergencyContact,
    notes: customer.notes,
    status: customer.status,
    portalAccountId: customer.portalAccountId,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
}

function publicDriver(
  driver: Doc<"customerDrivers">,
  account?: Doc<"portalAccounts"> | null,
) {
  return {
    id: driver._id,
    customerId: driver.customerId,
    portalAccountId: driver.portalAccountId,
    firstName: driver.firstName,
    lastName: driver.lastName,
    fullName: driver.fullName,
    email: driver.email,
    phone: driver.phone,
    identityCardNumber: driver.identityCardNumber,
    dateOfBirth: driver.dateOfBirth,
    drivingLicenceNumber: driver.drivingLicenceNumber,
    licenceIssueDate: driver.licenceIssueDate,
    licenceValidSince: driver.licenceValidSince,
    active: driver.active,
    accountActive: account?.active,
    codeHint: account?.codeHint,
    createdAt: driver.createdAt,
    updatedAt: driver.updatedAt,
  };
}

function publicVehicle(vehicle: Doc<"operationalVehicles">, restricted = false) {
  return {
    id: vehicle._id,
    registrationPlate: vehicle.registrationPlate,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    format: vehicle.format,
    color: vehicle.color,
    vin: restricted ? undefined : vehicle.vin,
    status: vehicle.status,
    currentMileage: vehicle.currentMileage,
    fuelPercent: restricted ? undefined : vehicle.fuelPercent,
    notes: restricted ? undefined : vehicle.notes,
    createdAt: vehicle.createdAt,
    updatedAt: vehicle.updatedAt,
  };
}

function publicRental(rental: Doc<"rentals">) {
  return {
    id: rental._id,
    reference: rental.reference,
    customerId: rental.customerId,
    vehicleId: rental.vehicleId,
    status: rental.status,
    startDate: rental.startDate,
    expectedEndDate: rental.expectedEndDate,
    actualEndDate: rental.actualEndDate,
    monthlyPriceCents: rental.monthlyPriceCents,
    vatExcluded: rental.vatExcluded,
    depositCents: rental.depositCents,
    mileageAllowance: rental.mileageAllowance,
    notes: rental.notes,
    createdBy: rental.createdBy,
    createdAt: rental.createdAt,
    updatedAt: rental.updatedAt,
  };
}

function publicWorkflow(record: Doc<"workflowRecords">) {
  return {
    id: record._id,
    reference: record.reference,
    type: record.type,
    actorAccountId: record.actorAccountId,
    vehicleId: record.vehicleId,
    customerId: record.customerId,
    rentalId: record.rentalId,
    driverId: record.driverId,
    licensePlate: record.licensePlate,
    occurredAt: record.occurredAt,
    mileage: record.mileage,
    mileageAfter: record.mileageAfter,
    fuelPercent: record.fuelPercent,
    autonomyKm: record.autonomyKm,
    personName: record.personName,
    customerName: record.customerName,
    employeeName: record.employeeName,
    secondaryLicensePlate: record.secondaryLicensePlate,
    secondaryMileage: record.secondaryMileage,
    secondaryAutonomyKm: record.secondaryAutonomyKm,
    originAddress: record.originAddress,
    destinationAddress: record.destinationAddress,
    disposition: record.disposition,
    mechanicName: record.mechanicName,
    maintenanceInterventionType: record.maintenanceInterventionType,
    maintenanceItems: record.maintenanceItems,
    maintenanceOtherDetails: record.maintenanceOtherDetails,
    roadTestPerformed: record.roadTestPerformed,
    readyForService: record.readyForService,
    eventOccurredAt: record.eventOccurredAt,
    accidentLiability: record.accidentLiability,
    amicableSettlement: record.amicableSettlement,
    invoiceReference: record.invoiceReference,
    inspectionMonth: record.inspectionMonth,
    performedByName: record.performedByName,
    maintenanceWork: record.maintenanceWork,
    changesMade: record.changesMade,
    reportCategory: record.reportCategory,
    reportPriority: record.reportPriority,
    description: record.description,
    status: record.status,
    resolution: record.resolution,
    resolvedAt: record.resolvedAt,
    resolvedBy: record.resolvedBy,
    notificationEmailStatus: record.notificationEmailStatus,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

async function requireActor(
  ctx: QueryCtx | MutationCtx,
  accountId: Id<"portalAccounts">,
) {
  const actor = await ctx.db.get(accountId);
  if (!actor || !actor.active) throw new Error("unauthorized");
  return actor;
}

function requireRole(actor: Doc<"portalAccounts">, roles: PortalRole[]) {
  if (!roles.includes(actor.role)) throw new Error("forbidden");
}

async function audit(
  ctx: MutationCtx,
  actorAccountId: Id<"portalAccounts"> | undefined,
  action: string,
  entityType: string,
  entityId: string,
  summary: string,
  metadata?: string,
) {
  await ctx.db.insert("auditEvents", {
    actorAccountId,
    action,
    entityType,
    entityId,
    summary,
    metadata,
    createdAt: Date.now(),
  });
}

async function customerHasVehicle(
  ctx: QueryCtx | MutationCtx,
  customerId: Id<"customers">,
  vehicleId: Id<"operationalVehicles">,
): Promise<boolean> {
  const rentals = await ctx.db
    .query("rentals")
    .withIndex("by_customer_id", (q) => q.eq("customerId", customerId))
    .order("desc")
    .take(100);
  return rentals.some(
    (rental) =>
      rental.vehicleId === vehicleId &&
      ["draft", "scheduled", "active"].includes(rental.status),
  );
}

function yearsBeforeToday(years: number): string {
  const date = new Date();
  date.setUTCFullYear(date.getUTCFullYear() - years);
  return date.toISOString().slice(0, 10);
}

const workflowRoles: Record<WorkflowType, PortalRole[]> = {
  customer_onboarding: ["admin", "employee", "customer"],
  check_in: ["admin", "employee", "contractor"],
  check_out: ["admin", "employee", "contractor"],
  wash: ["admin", "employee"],
  maintenance: ["admin", "mechanic"],
  handover_take: ["admin", "employee", "contractor"],
  handover_return: ["admin", "employee", "contractor"],
  breakdown_replacement: ["admin", "employee", "contractor"],
  vehicle_transfer: ["admin", "employee", "contractor"],
  report: ["admin", "employee", "customer", "mechanic", "contractor"],
  problem_report: ["admin", "customer", "driver"],
  accident_report: ["admin", "customer", "driver"],
  payment_proof: ["admin", "customer"],
  monthly_inspection: ["admin", "customer", "driver"],
};

const customerWorkflowTypes: WorkflowType[] = [
  "problem_report",
  "accident_report",
  "payment_proof",
  "monthly_inspection",
];

const standardPhotoSlots = ["front", "right", "left", "rear", "interior"];

function requiredMediaSlots(
  type: WorkflowType,
  disposition?: Doc<"workflowRecords">["disposition"],
  amicableSettlement = false,
) {
  if (type === "wash") {
    return standardPhotoSlots.flatMap((slot) => [`before_${slot}`, `after_${slot}`]);
  }
  if (type === "check_in" || type === "check_out") {
    return ["dashboard_started", ...standardPhotoSlots, "customer_signature"];
  }
  if (type === "breakdown_replacement") {
    return [
      "outgoing_dashboard_started",
      ...standardPhotoSlots.map((slot) => `outgoing_${slot}`),
      "customer_signature",
      "defective_dashboard_started",
      ...standardPhotoSlots.map((slot) => `defective_${slot}`),
      ...(disposition === "self" ? ["employee_signature"] : []),
    ];
  }
  if (type === "vehicle_transfer") {
    return ["dashboard_started", ...standardPhotoSlots, "employee_signature"];
  }
  if (type === "maintenance") {
    return ["mechanic_signature"];
  }
  if (type === "problem_report") {
    return ["problem_photo_1"];
  }
  if (type === "accident_report") {
    return [
      "own_vehicle_damage_1",
      "third_party_damage_1",
      "accident_form",
      ...(amicableSettlement ? ["amicable_agreement"] : []),
    ];
  }
  if (type === "payment_proof") {
    return ["payment_proof"];
  }
  if (type === "monthly_inspection") {
    return ["interior", "front", "right", "left", "rear", "dashboard_started"];
  }
  return [];
}

export const bootstrapAdmin = internalMutation({
  args: {
    displayName: v.string(),
    codeHash: v.string(),
    codeHint: v.string(),
  },
  returns: v.object({
    created: v.boolean(),
    accountId: v.optional(v.id("portalAccounts")),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("portalAccounts")
      .withIndex("by_role", (q) => q.eq("role", "admin"))
      .take(1);
    if (existing.length > 0) return { created: false };

    const now = Date.now();
    const accountId = await ctx.db.insert("portalAccounts", {
      displayName: args.displayName,
      role: "admin",
      codeHash: args.codeHash,
      codeHint: args.codeHint,
      active: true,
      createdAt: now,
      updatedAt: now,
    });
    await audit(
      ctx,
      accountId,
      "portal.bootstrap",
      "portalAccount",
      String(accountId),
      "Initial administrator created",
    );
    return { created: true, accountId };
  },
});

export const loginWithCode = internalMutation({
  args: {
    codeHash: v.string(),
    tokenHash: v.string(),
    fingerprint: v.string(),
    userAgentHash: v.optional(v.string()),
  },
  returns: v.object({
    ok: v.boolean(),
    reason: v.optional(
      v.union(
        v.literal("invalid"),
        v.literal("inactive"),
        v.literal("rate_limited"),
      ),
    ),
    retryAfter: v.optional(v.number()),
    account: v.optional(accountPublicValidator),
  }),
  handler: async (ctx, args) => {
    const globalLimit = await portalRateLimiter.limit(ctx, "portalLoginGlobal");
    const fingerprintLimit = await portalRateLimiter.limit(
      ctx,
      "portalLoginByFingerprint",
      { key: args.fingerprint },
    );
    if (!globalLimit.ok || !fingerprintLimit.ok) {
      return {
        ok: false,
        reason: "rate_limited" as const,
        retryAfter: Math.max(
          globalLimit.retryAfter ?? 0,
          fingerprintLimit.retryAfter ?? 0,
        ),
      };
    }

    const account = await ctx.db
      .query("portalAccounts")
      .withIndex("by_code_hash", (q) => q.eq("codeHash", args.codeHash))
      .unique();
    if (!account) {
      await audit(
        ctx,
        undefined,
        "portal.login_failed",
        "fingerprint",
        args.fingerprint,
        "Invalid access code",
      );
      return { ok: false, reason: "invalid" as const };
    }
    if (!account.active) {
      return { ok: false, reason: "inactive" as const };
    }

    const now = Date.now();
    await ctx.db.insert("portalSessions", {
      accountId: account._id,
      tokenHash: args.tokenHash,
      expiresAt:
        now +
        (account.role === "customer"
          ? 7 * 24 * 60 * 60 * 1000
          : 12 * 60 * 60 * 1000),
      userAgentHash: args.userAgentHash,
      createdAt: now,
      lastSeenAt: now,
    });
    await ctx.db.patch(account._id, { lastLoginAt: now, updatedAt: now });
    await audit(
      ctx,
      account._id,
      "portal.login",
      "portalAccount",
      String(account._id),
      `${account.displayName} signed in`,
    );
    return { ok: true, account: publicAccount({ ...account, lastLoginAt: now }) };
  },
});

export const getSessionContext = internalQuery({
  args: { tokenHash: v.string(), now: v.number() },
  returns: v.union(
    v.null(),
    v.object({
      sessionId: v.id("portalSessions"),
      account: accountPublicValidator,
    }),
  ),
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("portalSessions")
      .withIndex("by_token_hash", (q) => q.eq("tokenHash", args.tokenHash))
      .unique();
    if (
      !session ||
      session.revokedAt !== undefined ||
      session.expiresAt <= args.now
    ) {
      return null;
    }
    const account = await ctx.db.get(session.accountId);
    if (!account || !account.active) return null;
    return { sessionId: session._id, account: publicAccount(account) };
  },
});

export const revokeSession = internalMutation({
  args: { tokenHash: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("portalSessions")
      .withIndex("by_token_hash", (q) => q.eq("tokenHash", args.tokenHash))
      .unique();
    if (session && session.revokedAt === undefined) {
      await ctx.db.patch(session._id, { revokedAt: Date.now() });
    }
    return null;
  },
});

export const getPortalData = internalQuery({
  args: { actorAccountId: v.id("portalAccounts") },
  returns: v.object({
    account: accountPublicValidator,
    accounts: v.array(accountPublicValidator),
    customers: v.array(customerPublicValidator),
    drivers: v.array(driverPublicValidator),
    vehicles: v.array(operationalVehiclePublicValidator),
    rentals: v.array(rentalPublicValidator),
    workflows: v.array(workflowPublicValidator),
    auditEvents: v.array(auditPublicValidator),
  }),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);

    let vehicles =
      actor.role === "customer" || actor.role === "driver"
        ? []
        : await ctx.db.query("operationalVehicles").order("desc").take(100);

    let accounts: Doc<"portalAccounts">[] = [];
    let customers: Doc<"customers">[] = [];
    let drivers: Doc<"customerDrivers">[] = [];
    let rentals: Doc<"rentals">[] = [];
    let workflows: Doc<"workflowRecords">[] = [];
    let auditEvents: Doc<"auditEvents">[] = [];

    if (actor.role === "admin") {
      [accounts, customers, drivers, rentals, workflows, auditEvents] = await Promise.all([
        ctx.db.query("portalAccounts").order("desc").take(100),
        ctx.db.query("customers").order("desc").take(100),
        ctx.db.query("customerDrivers").order("desc").take(100),
        ctx.db.query("rentals").order("desc").take(100),
        ctx.db.query("workflowRecords").order("desc").take(100),
        ctx.db.query("auditEvents").order("desc").take(100),
      ]);
    } else if (actor.role === "employee") {
      workflows = await ctx.db
        .query("workflowRecords")
        .withIndex("by_actor_account_id", (q) => q.eq("actorAccountId", actor._id))
        .order("desc")
        .take(100);
      if (!actor.allowedWorkflowTypes) {
        [customers, rentals] = await Promise.all([
          ctx.db.query("customers").order("desc").take(100),
          ctx.db.query("rentals").order("desc").take(100),
        ]);
      }
    } else if (actor.role === "mechanic") {
      workflows = await ctx.db
        .query("workflowRecords")
        .withIndex("by_type", (q) => q.eq("type", "maintenance"))
        .order("desc")
        .take(100);
    } else if (actor.role === "contractor") {
      workflows = await ctx.db
        .query("workflowRecords")
        .withIndex("by_actor_account_id", (q) =>
          q.eq("actorAccountId", actor._id),
        )
        .order("desc")
        .take(100);
      rentals = await ctx.db
        .query("rentals")
        .withIndex("by_status", (q) => q.eq("status", "active"))
        .order("desc")
        .take(100);
    } else if (
      (actor.role === "customer" || actor.role === "driver") &&
      actor.linkedCustomerId
    ) {
      const linkedCustomer = await ctx.db.get(actor.linkedCustomerId);
      if (linkedCustomer && actor.role === "customer") customers = [linkedCustomer];
      const customerRentals = await ctx.db
        .query("rentals")
        .withIndex("by_customer_id", (q) =>
          q.eq("customerId", actor.linkedCustomerId!),
        )
        .order("desc")
        .take(50);
      const openRentals = customerRentals.filter((rental) =>
        ["draft", "scheduled", "active"].includes(rental.status),
      );
      const customerVehicleIds = [
        ...new Set(openRentals.map((rental) => rental.vehicleId)),
      ];
      vehicles = (
        await Promise.all(
          customerVehicleIds.map((vehicleId) => ctx.db.get(vehicleId)),
        )
      ).filter(
        (vehicle): vehicle is Doc<"operationalVehicles"> => vehicle !== null,
      );
      rentals = [];
      if (actor.role === "customer") {
        workflows = await ctx.db
          .query("workflowRecords")
          .withIndex("by_customer_id", (q) =>
            q.eq("customerId", actor.linkedCustomerId!),
          )
          .order("desc")
          .take(100);
        drivers = await ctx.db
          .query("customerDrivers")
          .withIndex("by_customer_id", (q) =>
            q.eq("customerId", actor.linkedCustomerId!),
          )
          .order("desc")
          .take(100);
      } else {
        workflows = await ctx.db
          .query("workflowRecords")
          .withIndex("by_actor_account_id", (q) =>
            q.eq("actorAccountId", actor._id),
          )
          .order("desc")
          .take(100);
        if (actor.linkedDriverId) {
          const linkedDriver = await ctx.db.get(actor.linkedDriverId);
          if (linkedDriver && linkedDriver.customerId === actor.linkedCustomerId) {
            drivers = [linkedDriver];
          }
        }
      }
    }

    const driverAccounts = await Promise.all(
      drivers.map((driver) =>
        driver.portalAccountId ? ctx.db.get(driver.portalAccountId) : null,
      ),
    );

    return {
      account: publicAccount(actor),
      accounts: accounts.map(publicAccount),
      customers: customers.map(publicCustomer),
      drivers: drivers.map((driver, index) =>
        publicDriver(driver, driverAccounts[index]),
      ),
      vehicles: vehicles.map((vehicle) => publicVehicle(vehicle, actor.role === "customer" || actor.role === "driver")),
      rentals: rentals.map(publicRental),
      workflows: workflows.map(publicWorkflow),
      auditEvents: auditEvents.map((event) => ({
        id: event._id,
        actorAccountId: event.actorAccountId,
        action: event.action,
        entityType: event.entityType,
        entityId: event.entityId,
        summary: event.summary,
        metadata: event.metadata,
        createdAt: event.createdAt,
      })),
    };
  },
});

export const createAccount = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    displayName: v.string(),
    role: portalRoleValidator,
    codeHash: v.string(),
    codeHint: v.string(),
    linkedCustomerId: v.optional(v.id("customers")),
    linkedDriverId: v.optional(v.id("customerDrivers")),
    allowedWorkflowTypes: v.optional(v.array(workflowTypeValidator)),
  },
  returns: v.id("portalAccounts"),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);

    const existing = await ctx.db
      .query("portalAccounts")
      .withIndex("by_code_hash", (q) => q.eq("codeHash", args.codeHash))
      .unique();
    if (existing) throw new Error("code_collision");

    if (args.role === "customer" && !args.linkedCustomerId) {
      throw new Error("customer_link_required");
    }
    if (args.role === "driver" && (!args.linkedCustomerId || !args.linkedDriverId)) {
      throw new Error("driver_link_required");
    }
    if (args.linkedCustomerId) {
      const customer = await ctx.db.get(args.linkedCustomerId);
      if (!customer) throw new Error("customer_not_found");
      if (args.role === "customer" && customer.portalAccountId) {
        throw new Error("customer_already_linked");
      }
    }
    if (args.linkedDriverId) {
      const driver = await ctx.db.get(args.linkedDriverId);
      if (!driver || driver.customerId !== args.linkedCustomerId) {
        throw new Error("driver_not_found");
      }
      if (driver.portalAccountId) throw new Error("driver_already_linked");
    }

    const now = Date.now();
    const accountId = await ctx.db.insert("portalAccounts", {
      displayName: args.displayName,
      role: args.role,
      codeHash: args.codeHash,
      codeHint: args.codeHint,
      active: true,
      linkedCustomerId: args.linkedCustomerId,
      linkedDriverId: args.linkedDriverId,
      allowedWorkflowTypes: args.allowedWorkflowTypes,
      createdBy: actor._id,
      createdAt: now,
      updatedAt: now,
    });
    if (args.role === "customer" && args.linkedCustomerId) {
      await ctx.db.patch(args.linkedCustomerId, {
        portalAccountId: accountId,
        updatedAt: now,
      });
    }
    if (args.role === "driver" && args.linkedDriverId) {
      await ctx.db.patch(args.linkedDriverId, {
        portalAccountId: accountId,
        updatedAt: now,
      });
    }
    await audit(
      ctx,
      actor._id,
      "portal.account_created",
      "portalAccount",
      String(accountId),
      `${args.displayName} created as ${args.role}`,
    );
    return accountId;
  },
});

export const updateAccount = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    targetAccountId: v.id("portalAccounts"),
    displayName: v.string(),
    role: portalRoleValidator,
    linkedCustomerId: v.optional(v.id("customers")),
    allowedWorkflowTypes: v.optional(v.array(workflowTypeValidator)),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);
    const target = await ctx.db.get(args.targetAccountId);
    if (!target) throw new Error("account_not_found");
    if (target._id === actor._id && args.role !== "admin") {
      throw new Error("cannot_change_self_role");
    }
    if (args.role === "customer" && !args.linkedCustomerId) {
      throw new Error("customer_link_required");
    }
    if (args.role === "driver") {
      if (!target.linkedDriverId || !args.linkedCustomerId) {
        throw new Error("driver_link_required");
      }
      const driver = await ctx.db.get(target.linkedDriverId);
      if (!driver || driver.customerId !== args.linkedCustomerId) {
        throw new Error("driver_not_found");
      }
    }
    const newCustomer = args.linkedCustomerId
      ? await ctx.db.get(args.linkedCustomerId)
      : null;
    if (args.linkedCustomerId && !newCustomer) throw new Error("customer_not_found");
    if (
      args.role === "customer" &&
      newCustomer?.portalAccountId &&
      newCustomer.portalAccountId !== target._id
    ) {
      throw new Error("customer_already_linked");
    }

    const now = Date.now();
    if (
      target.role === "customer" &&
      target.linkedCustomerId &&
      target.linkedCustomerId !== args.linkedCustomerId
    ) {
      const oldCustomer = await ctx.db.get(target.linkedCustomerId);
      if (oldCustomer?.portalAccountId === target._id) {
        await ctx.db.patch(oldCustomer._id, {
          portalAccountId: undefined,
          updatedAt: now,
        });
      }
    }
    if (args.role === "customer" && newCustomer) {
      await ctx.db.patch(newCustomer._id, {
        portalAccountId: target._id,
        updatedAt: now,
      });
    }
    await ctx.db.patch(target._id, {
      displayName: args.displayName,
      role: args.role,
      linkedCustomerId: args.linkedCustomerId,
      linkedDriverId: args.role === "driver" ? target.linkedDriverId : undefined,
      allowedWorkflowTypes: ["employee", "contractor"].includes(args.role)
        ? args.allowedWorkflowTypes
        : undefined,
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "portal.account_updated",
      "portalAccount",
      String(target._id),
      `${args.displayName} account updated`,
    );
    return null;
  },
});

export const rotateAccountCode = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    targetAccountId: v.id("portalAccounts"),
    codeHash: v.string(),
    codeHint: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);
    const target = await ctx.db.get(args.targetAccountId);
    if (!target) throw new Error("account_not_found");

    const now = Date.now();
    await ctx.db.patch(target._id, {
      codeHash: args.codeHash,
      codeHint: args.codeHint,
      updatedAt: now,
    });
    const sessions = await ctx.db
      .query("portalSessions")
      .withIndex("by_account_id", (q) => q.eq("accountId", target._id))
      .take(100);
    await Promise.all(
      sessions
        .filter((session) => session.revokedAt === undefined)
        .map((session) => ctx.db.patch(session._id, { revokedAt: now })),
    );
    await audit(
      ctx,
      actor._id,
      "portal.code_rotated",
      "portalAccount",
      String(target._id),
      `Access code rotated for ${target.displayName}`,
    );
    return null;
  },
});

export const setAccountActive = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    targetAccountId: v.id("portalAccounts"),
    active: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);
    if (actor._id === args.targetAccountId && !args.active) {
      throw new Error("cannot_deactivate_self");
    }
    const target = await ctx.db.get(args.targetAccountId);
    if (!target) throw new Error("account_not_found");

    const now = Date.now();
    await ctx.db.patch(target._id, { active: args.active, updatedAt: now });
    if (!args.active) {
      const sessions = await ctx.db
        .query("portalSessions")
        .withIndex("by_account_id", (q) => q.eq("accountId", target._id))
        .take(100);
      await Promise.all(
        sessions
          .filter((session) => session.revokedAt === undefined)
          .map((session) => ctx.db.patch(session._id, { revokedAt: now })),
      );
    }
    await audit(
      ctx,
      actor._id,
      args.active ? "portal.account_activated" : "portal.account_deactivated",
      "portalAccount",
      String(target._id),
      `${target.displayName} ${args.active ? "activated" : "deactivated"}`,
    );
    return null;
  },
});

export const createCustomer = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    fullName: v.string(),
    company: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    notes: v.optional(v.string()),
  },
  returns: v.id("customers"),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin", "employee"]);
    const now = Date.now();
    const customerId = await ctx.db.insert("customers", {
      fullName: args.fullName,
      company: args.company,
      email: args.email,
      phone: args.phone,
      notes: args.notes,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "customer.created",
      "customer",
      String(customerId),
      `Customer ${args.fullName} created`,
    );
    return customerId;
  },
});

export const updateCustomer = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    customerId: v.id("customers"),
    fullName: v.string(),
    company: v.optional(v.string()),
    companyVatNumber: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    address: v.optional(v.string()),
    street: v.optional(v.string()),
    houseNumber: v.optional(v.string()),
    addressBox: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    city: v.optional(v.string()),
    province: v.optional(belgianProvinceValidator),
    identityCardNumber: v.optional(v.string()),
    nationalRegisterNumber: v.optional(v.string()),
    drivingLicenseNumber: v.optional(v.string()),
    emergencyContact: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.union(v.literal("lead"), v.literal("active"), v.literal("inactive")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);
    const customer = await ctx.db.get(args.customerId);
    if (!customer) throw new Error("customer_not_found");
    await ctx.db.patch(customer._id, {
      fullName: args.fullName,
      company: args.company,
      companyVatNumber: args.companyVatNumber,
      email: args.email,
      phone: args.phone,
      address: args.address,
      street: args.street,
      houseNumber: args.houseNumber,
      addressBox: args.addressBox,
      postalCode: args.postalCode,
      city: args.city,
      province: args.province,
      identityCardNumber: args.identityCardNumber,
      nationalRegisterNumber: args.nationalRegisterNumber,
      drivingLicenseNumber: args.drivingLicenseNumber,
      emergencyContact: args.emergencyContact,
      notes: args.notes,
      status: args.status,
      updatedAt: Date.now(),
    });
    await audit(
      ctx,
      actor._id,
      "customer.updated",
      "customer",
      String(customer._id),
      `Customer ${args.fullName} updated`,
    );
    return null;
  },
});

export const updateOwnCustomerProfile = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    fullName: v.string(),
    company: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    postalCode: v.string(),
    city: v.string(),
    drivingLicenseNumber: v.string(),
    emergencyContact: v.optional(v.string()),
  },
  returns: v.id("customers"),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["customer"]);
    if (!actor.linkedCustomerId) throw new Error("customer_not_linked");
    const customer = await ctx.db.get(actor.linkedCustomerId);
    if (!customer) throw new Error("customer_not_found");
    const now = Date.now();
    await ctx.db.patch(customer._id, {
      fullName: args.fullName,
      company: args.company,
      email: args.email,
      phone: args.phone,
      address: args.address,
      postalCode: args.postalCode,
      city: args.city,
      drivingLicenseNumber: args.drivingLicenseNumber,
      emergencyContact: args.emergencyContact,
      status: "active",
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "customer.profile_updated",
      "customer",
      String(customer._id),
      "Customer completed or updated their profile",
    );
    return customer._id;
  },
});

export const createDriverWithAccount = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    customerId: v.optional(v.id("customers")),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    identityCardNumber: v.string(),
    dateOfBirth: v.string(),
    drivingLicenceNumber: v.string(),
    licenceIssueDate: v.string(),
    licenceValidSince: v.string(),
    uploadGroupId: v.string(),
    mediaIds: v.array(v.id("mediaAssets")),
    codeHash: v.string(),
    codeHint: v.string(),
  },
  returns: v.object({
    driverId: v.id("customerDrivers"),
    accountId: v.id("portalAccounts"),
  }),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin", "customer"]);
    const customerId =
      actor.role === "customer" ? actor.linkedCustomerId : args.customerId;
    if (!customerId) throw new Error("customer_not_linked");
    if (actor.role === "customer" && args.customerId && args.customerId !== customerId) {
      throw new Error("forbidden");
    }
    const customer = await ctx.db.get(customerId);
    if (!customer) throw new Error("customer_not_found");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(args.dateOfBirth) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(args.licenceIssueDate) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(args.licenceValidSince) ||
      args.dateOfBirth > yearsBeforeToday(23) ||
      args.licenceValidSince > yearsBeforeToday(5) ||
      args.licenceIssueDate > new Date().toISOString().slice(0, 10)
    ) {
      throw new Error("driver_eligibility_failed");
    }
    const existingCode = await ctx.db
      .query("portalAccounts")
      .withIndex("by_code_hash", (q) => q.eq("codeHash", args.codeHash))
      .unique();
    if (existingCode) throw new Error("code_collision");
    if (args.mediaIds.length !== 4 || new Set(args.mediaIds.map(String)).size !== 4) {
      throw new Error("driver_documents_required");
    }
    const media = await Promise.all(args.mediaIds.map((id) => ctx.db.get(id)));
    if (
      media.some(
        (item) =>
          !item ||
          item.createdBy !== actor._id ||
          item.uploadGroupId !== args.uploadGroupId ||
          item.status !== "uploaded" ||
          item.category !== "driver_document" ||
          !item.contentType.startsWith("image/") ||
          item.recordId !== undefined ||
          item.driverId !== undefined,
      )
    ) {
      throw new Error("invalid_media");
    }
    const uploadedMedia = media.filter(
      (item): item is Doc<"mediaAssets"> => item !== null,
    );
    const requiredSlots = [
      "driver_identity_front",
      "driver_identity_back",
      "driver_licence_front",
      "driver_licence_back",
    ];
    const slots = uploadedMedia.map((item) => item.slot);
    if (
      new Set(slots).size !== slots.length ||
      requiredSlots.some((slot) => !slots.includes(slot))
    ) {
      throw new Error("driver_documents_required");
    }
    const existingDrivers = await ctx.db
      .query("customerDrivers")
      .withIndex("by_customer_id", (q) => q.eq("customerId", customerId))
      .take(100);
    const now = Date.now();
    const fullName = `${args.firstName} ${args.lastName}`.trim();
    const driverId = await ctx.db.insert("customerDrivers", {
      customerId,
      kind: "additional",
      sortOrder: existingDrivers.length,
      firstName: args.firstName,
      lastName: args.lastName,
      fullName,
      email: args.email,
      phone: args.phone,
      identityCardNumber: args.identityCardNumber,
      dateOfBirth: args.dateOfBirth,
      drivingLicenceNumber: args.drivingLicenceNumber,
      licenceIssueDate: args.licenceIssueDate,
      licenceValidSince: args.licenceValidSince,
      active: true,
      createdAt: now,
      updatedAt: now,
    });
    const accountId = await ctx.db.insert("portalAccounts", {
      displayName: fullName,
      role: "driver",
      codeHash: args.codeHash,
      codeHint: args.codeHint,
      active: true,
      linkedCustomerId: customerId,
      linkedDriverId: driverId,
      allowedWorkflowTypes: [
        "problem_report",
        "accident_report",
        "monthly_inspection",
      ],
      createdBy: actor._id,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(driverId, { portalAccountId: accountId, updatedAt: now });
    await Promise.all(
      uploadedMedia.map((item) => ctx.db.patch(item._id, { driverId })),
    );
    await audit(
      ctx,
      actor._id,
      "driver.created",
      "customerDriver",
      String(driverId),
      `${fullName} added as a driver`,
    );
    return { driverId, accountId };
  },
});

export const createDriverAccess = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    driverId: v.id("customerDrivers"),
    codeHash: v.string(),
    codeHint: v.string(),
  },
  returns: v.id("portalAccounts"),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin", "customer"]);
    const driver = await ctx.db.get(args.driverId);
    if (!driver) throw new Error("driver_not_found");
    if (actor.role === "customer" && driver.customerId !== actor.linkedCustomerId) {
      throw new Error("forbidden");
    }
    if (driver.portalAccountId) throw new Error("driver_already_linked");
    const existingCode = await ctx.db
      .query("portalAccounts")
      .withIndex("by_code_hash", (q) => q.eq("codeHash", args.codeHash))
      .unique();
    if (existingCode) throw new Error("code_collision");
    const now = Date.now();
    const accountId = await ctx.db.insert("portalAccounts", {
      displayName: driver.fullName,
      role: "driver",
      codeHash: args.codeHash,
      codeHint: args.codeHint,
      active: driver.active,
      linkedCustomerId: driver.customerId,
      linkedDriverId: driver._id,
      allowedWorkflowTypes: [
        "problem_report",
        "accident_report",
        "monthly_inspection",
      ],
      createdBy: actor._id,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(driver._id, { portalAccountId: accountId, updatedAt: now });
    await audit(
      ctx,
      actor._id,
      "driver.access_created",
      "customerDriver",
      String(driver._id),
      `Driver access created for ${driver.fullName}`,
    );
    return accountId;
  },
});

export const setDriverActive = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    driverId: v.id("customerDrivers"),
    active: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin", "customer"]);
    const driver = await ctx.db.get(args.driverId);
    if (!driver) throw new Error("driver_not_found");
    if (actor.role === "customer" && driver.customerId !== actor.linkedCustomerId) {
      throw new Error("forbidden");
    }
    const now = Date.now();
    await ctx.db.patch(driver._id, { active: args.active, updatedAt: now });
    if (driver.portalAccountId) {
      await ctx.db.patch(driver.portalAccountId, {
        active: args.active,
        updatedAt: now,
      });
      if (!args.active) {
        const sessions = await ctx.db
          .query("portalSessions")
          .withIndex("by_account_id", (q) =>
            q.eq("accountId", driver.portalAccountId!),
          )
          .take(100);
        await Promise.all(
          sessions
            .filter((session) => session.revokedAt === undefined)
            .map((session) => ctx.db.patch(session._id, { revokedAt: now })),
        );
      }
    }
    await audit(
      ctx,
      actor._id,
      args.active ? "driver.activated" : "driver.deactivated",
      "customerDriver",
      String(driver._id),
      `${driver.fullName} ${args.active ? "activated" : "deactivated"}`,
    );
    return null;
  },
});

export const createVehicle = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    registrationPlate: v.string(),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    format: vehicleFormatValidator,
    color: v.string(),
    vin: v.optional(v.string()),
    currentMileage: v.number(),
    fuelPercent: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  returns: v.id("operationalVehicles"),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);
    const existing = await ctx.db
      .query("operationalVehicles")
      .withIndex("by_registration_plate", (q) =>
        q.eq("registrationPlate", args.registrationPlate),
      )
      .unique();
    if (existing) throw new Error("vehicle_exists");
    const now = Date.now();
    const vehicleId = await ctx.db.insert("operationalVehicles", {
      registrationPlate: args.registrationPlate,
      make: args.make,
      model: args.model,
      year: args.year,
      format: args.format,
      color: args.color,
      vin: args.vin,
      status: "available",
      currentMileage: args.currentMileage,
      fuelPercent: args.fuelPercent,
      notes: args.notes,
      createdAt: now,
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "vehicle.created",
      "vehicle",
      String(vehicleId),
      `${args.registrationPlate} added to the fleet`,
    );
    return vehicleId;
  },
});

export const createRental = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    reference: v.string(),
    customerId: v.id("customers"),
    vehicleId: v.id("operationalVehicles"),
    startDate: v.string(),
    expectedEndDate: v.optional(v.string()),
    monthlyPriceCents: v.number(),
    depositCents: v.optional(v.number()),
    mileageAllowance: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  returns: v.id("rentals"),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);
    const [customer, vehicle] = await Promise.all([
      ctx.db.get(args.customerId),
      ctx.db.get(args.vehicleId),
    ]);
    if (!customer) throw new Error("customer_not_found");
    if (!vehicle) throw new Error("vehicle_not_found");
    if (!["available", "reserved"].includes(vehicle.status)) {
      throw new Error("vehicle_unavailable");
    }
    const existing = await ctx.db
      .query("rentals")
      .withIndex("by_reference", (q) => q.eq("reference", args.reference))
      .unique();
    if (existing) throw new Error("rental_reference_exists");

    const now = Date.now();
    const rentalId = await ctx.db.insert("rentals", {
      reference: args.reference,
      customerId: customer._id,
      vehicleId: vehicle._id,
      status: "scheduled",
      startDate: args.startDate,
      expectedEndDate: args.expectedEndDate,
      monthlyPriceCents: args.monthlyPriceCents,
      vatExcluded: true,
      depositCents: args.depositCents,
      mileageAllowance: args.mileageAllowance,
      notes: args.notes,
      createdBy: actor._id,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(vehicle._id, { status: "reserved", updatedAt: now });
    await audit(
      ctx,
      actor._id,
      "rental.created",
      "rental",
      String(rentalId),
      `Rental ${args.reference} created`,
    );
    return rentalId;
  },
});

export const updateVehicleStatus = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    vehicleId: v.id("operationalVehicles"),
    status: operationalVehicleStatusValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin", "employee"]);
    const vehicle = await ctx.db.get(args.vehicleId);
    if (!vehicle) throw new Error("vehicle_not_found");

    if (args.status === "available") {
      const [scheduled, active] = await Promise.all([
        ctx.db
          .query("rentals")
          .withIndex("by_vehicle_id_and_status", (q) =>
            q.eq("vehicleId", vehicle._id).eq("status", "scheduled"),
          )
          .first(),
        ctx.db
          .query("rentals")
          .withIndex("by_vehicle_id_and_status", (q) =>
            q.eq("vehicleId", vehicle._id).eq("status", "active"),
          )
          .first(),
      ]);
      if (scheduled || active) throw new Error("vehicle_has_open_rental");
    }

    const now = Date.now();
    await ctx.db.patch(vehicle._id, { status: args.status, updatedAt: now });
    await audit(
      ctx,
      actor._id,
      "vehicle.status_updated",
      "vehicle",
      String(vehicle._id),
      `${vehicle.registrationPlate} changed to ${args.status}`,
    );
    return null;
  },
});

export const updateRentalStatus = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    rentalId: v.id("rentals"),
    status: rentalStatusValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin"]);
    const rental = await ctx.db.get(args.rentalId);
    if (!rental) throw new Error("rental_not_found");
    const now = Date.now();
    await ctx.db.patch(rental._id, {
      status: args.status,
      actualEndDate:
        ["returned", "closed"].includes(args.status)
          ? new Date(now).toISOString().slice(0, 10)
          : rental.actualEndDate,
      updatedAt: now,
    });
    const vehicleStatus =
      args.status === "active"
        ? "rented"
        : ["returned", "closed", "cancelled"].includes(args.status)
          ? "available"
          : "reserved";
    await ctx.db.patch(rental.vehicleId, {
      status: vehicleStatus,
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "rental.status_updated",
      "rental",
      String(rental._id),
      `${rental.reference} changed to ${args.status}`,
    );
    return null;
  },
});

export const createPendingMedia = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    r2Key: v.string(),
    uploadGroupId: v.string(),
    fileName: v.string(),
    contentType: v.string(),
    size: v.number(),
    category: mediaCategoryValidator,
    slot: v.optional(v.string()),
    captureSource: v.optional(captureSourceValidator),
    sortOrder: v.optional(v.number()),
    expiresAt: v.number(),
  },
  returns: v.id("mediaAssets"),
  handler: async (ctx, args) => {
    await requireActor(ctx, args.actorAccountId);
    if (args.size <= 0 || args.size > 8_000_000) {
      throw new Error("invalid_file_size");
    }
    if (
      !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(
        args.contentType,
      )
    ) {
      throw new Error("invalid_file_type");
    }
    return await ctx.db.insert("mediaAssets", {
      r2Key: args.r2Key,
      uploadGroupId: args.uploadGroupId,
      createdBy: args.actorAccountId,
      fileName: args.fileName,
      contentType: args.contentType,
      size: args.size,
      category: args.category,
      slot: args.slot,
      captureSource: args.captureSource,
      sortOrder: args.sortOrder,
      status: "pending",
      createdAt: Date.now(),
      expiresAt: args.expiresAt,
    });
  },
});

export const markMediaUploaded = internalMutation({
  args: {
    r2Key: v.string(),
    etag: v.optional(v.string()),
    size: v.number(),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const media = await ctx.db
      .query("mediaAssets")
      .withIndex("by_r2_key", (q) => q.eq("r2Key", args.r2Key))
      .unique();
    if (!media || media.status !== "pending" || media.expiresAt < Date.now()) {
      return false;
    }
    if (args.size !== media.size) return false;
    await ctx.db.patch(media._id, {
      status: "uploaded",
      etag: args.etag,
      uploadedAt: Date.now(),
    });
    return true;
  },
});

export const createWorkflowRecord = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    reference: v.string(),
    type: workflowTypeValidator,
    uploadGroupId: v.string(),
    mediaIds: v.array(v.id("mediaAssets")),
    vehicleId: v.optional(v.id("operationalVehicles")),
    customerId: v.optional(v.id("customers")),
    rentalId: v.optional(v.id("rentals")),
    occurredAt: v.number(),
    mileage: v.optional(v.number()),
    mileageAfter: v.optional(v.number()),
    fuelPercent: v.optional(v.number()),
    autonomyKm: v.optional(v.number()),
    personName: v.optional(v.string()),
    customerName: v.optional(v.string()),
    employeeName: v.optional(v.string()),
    secondaryLicensePlate: v.optional(v.string()),
    secondaryMileage: v.optional(v.number()),
    secondaryAutonomyKm: v.optional(v.number()),
    originAddress: v.optional(v.string()),
    destinationAddress: v.optional(v.string()),
    disposition: v.optional(vehicleDispositionValidator),
    maintenanceInterventionType: v.optional(maintenanceInterventionTypeValidator),
    maintenanceItems: v.optional(v.array(v.string())),
    maintenanceOtherDetails: v.optional(v.string()),
    roadTestPerformed: v.optional(v.boolean()),
    readyForService: v.optional(v.boolean()),
    eventOccurredAt: v.optional(v.number()),
    accidentLiability: v.optional(accidentLiabilityValidator),
    amicableSettlement: v.optional(v.boolean()),
    invoiceReference: v.optional(v.string()),
    inspectionMonth: v.optional(v.string()),
    maintenanceWork: v.optional(v.string()),
    changesMade: v.optional(v.string()),
    reportCategory: v.optional(reportCategoryValidator),
    reportPriority: v.optional(reportPriorityValidator),
    description: v.optional(v.string()),
  },
  returns: v.object({
    recordId: v.id("workflowRecords"),
    reference: v.string(),
  }),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    if (!workflowRoles[args.type].includes(actor.role)) {
      throw new Error("forbidden_workflow");
    }
    if (
      actor.role !== "admin" &&
      actor.allowedWorkflowTypes &&
      !actor.allowedWorkflowTypes.includes(args.type)
    ) {
      throw new Error("forbidden_workflow");
    }
    if (args.mediaIds.length > 24) throw new Error("too_many_files");
    if (new Set(args.mediaIds.map(String)).size !== args.mediaIds.length) {
      throw new Error("invalid_media");
    }

    let customerId = args.customerId;
    let driverId: Id<"customerDrivers"> | undefined;
    if (actor.role === "customer" || actor.role === "driver") {
      if (!actor.linkedCustomerId) throw new Error("customer_not_linked");
      customerId = actor.linkedCustomerId;
      if (actor.role === "driver") {
        if (!actor.linkedDriverId) throw new Error("driver_not_linked");
        const driver = await ctx.db.get(actor.linkedDriverId);
        if (
          !driver ||
          !driver.active ||
          driver.customerId !== actor.linkedCustomerId ||
          driver.portalAccountId !== actor._id
        ) {
          throw new Error("driver_not_linked");
        }
        driverId = driver._id;
      }
    }

    const vehicle = args.vehicleId ? await ctx.db.get(args.vehicleId) : null;
    const rental = args.rentalId ? await ctx.db.get(args.rentalId) : null;
    if (args.vehicleId && !vehicle) throw new Error("vehicle_not_found");
    if (args.rentalId && !rental) throw new Error("rental_not_found");
    if (
      (actor.role === "customer" || actor.role === "driver") &&
      rental &&
      rental.customerId !== actor.linkedCustomerId
    ) {
      throw new Error("forbidden");
    }
    if (
      (actor.role === "customer" || actor.role === "driver") &&
      vehicle &&
      !(await customerHasVehicle(ctx, actor.linkedCustomerId!, vehicle._id))
    ) {
        throw new Error("forbidden");
    }
    if (
      rental &&
      (rental.vehicleId !== args.vehicleId || rental.customerId !== customerId)
    ) {
      throw new Error("rental_mismatch");
    }
    if (
      ["check_in", "check_out", "wash", "maintenance", "handover_take", "handover_return", "breakdown_replacement", "vehicle_transfer", "problem_report", "accident_report", "monthly_inspection"].includes(
        args.type,
      ) &&
      !vehicle
    ) {
      throw new Error("vehicle_required");
    }
    if (
      ["check_in", "check_out", "wash", "maintenance", "handover_take", "handover_return", "breakdown_replacement", "vehicle_transfer", "monthly_inspection"].includes(
        args.type,
      ) &&
      args.mileage === undefined
    ) {
      throw new Error("mileage_required");
    }
    if (args.type === "maintenance") {
      const maintenanceItems = args.maintenanceItems ?? [];
      if (
        maintenanceItems.length > maintenanceItemCodes.length ||
        new Set(maintenanceItems).size !== maintenanceItems.length ||
        maintenanceItems.some((item) => !maintenanceItemCodeSet.has(item))
      ) {
        throw new Error("invalid_maintenance_items");
      }
      if (
        !args.maintenanceInterventionType ||
        (maintenanceItems.length === 0 && !args.maintenanceOtherDetails) ||
        args.roadTestPerformed === undefined ||
        args.readyForService === undefined
      ) {
        throw new Error("maintenance_details_required");
      }
    }
    if (args.type === "problem_report" && !args.description) {
      throw new Error("description_required");
    }
    if (args.type === "accident_report") {
      if (
        !args.description ||
        args.eventOccurredAt === undefined ||
        args.eventOccurredAt < 946684800000 ||
        args.eventOccurredAt > args.occurredAt + 5 * 60 * 1000 ||
        !args.accidentLiability ||
        (args.accidentLiability === "at_fault" &&
          args.amicableSettlement === undefined) ||
        (args.accidentLiability === "not_at_fault" && args.amicableSettlement)
      ) {
        throw new Error("accident_details_required");
      }
    }
    if (args.type === "payment_proof" && !args.invoiceReference) {
      throw new Error("payment_details_required");
    }
    if (args.type === "monthly_inspection") {
      const expectedMonth = new Date(args.occurredAt).toISOString().slice(0, 7);
      if (args.inspectionMonth !== expectedMonth) {
        throw new Error("inspection_details_required");
      }
      const existingInspection = await ctx.db
        .query("workflowRecords")
        .withIndex("by_vehicle_id_and_inspection_month", (q) =>
          q.eq("vehicleId", args.vehicleId!).eq("inspectionMonth", expectedMonth),
        )
        .first();
      if (existingInspection) throw new Error("inspection_already_submitted");
    }
    if (args.type === "report" && !args.description) {
      throw new Error("description_required");
    }
    if (["check_in", "check_out"].includes(args.type) && (!args.personName || args.autonomyKm === undefined)) {
      throw new Error("operation_details_required");
    }
    if (
      args.type === "breakdown_replacement" &&
      (!args.customerName || !args.secondaryLicensePlate || args.secondaryMileage === undefined ||
        args.secondaryAutonomyKm === undefined || !args.disposition)
    ) {
      throw new Error("operation_details_required");
    }
    if (
      args.type === "vehicle_transfer" &&
      (!args.originAddress || !args.destinationAddress || !args.employeeName)
    ) {
      throw new Error("operation_details_required");
    }
    if (args.type === "breakdown_replacement" && args.disposition === "self" && (!args.destinationAddress || !args.employeeName)) {
      throw new Error("operation_details_required");
    }

    const media = await Promise.all(args.mediaIds.map((id) => ctx.db.get(id)));
    if (
      media.some(
        (item) =>
          !item ||
          item.createdBy !== actor._id ||
          item.uploadGroupId !== args.uploadGroupId ||
          item.status !== "uploaded" ||
          item.recordId !== undefined ||
          item.driverId !== undefined,
      )
    ) {
      throw new Error("invalid_media");
    }
    const uploadedMedia = media
      .filter((item): item is Doc<"mediaAssets"> => item !== null)
    if (
      args.type !== "payment_proof" &&
      uploadedMedia.some((item) => !item.contentType.startsWith("image/"))
    ) {
      throw new Error("invalid_file_type");
    }
    const categories = uploadedMedia.map((item) => item.category);
    if (
      ["check_in", "check_out"].includes(args.type) &&
      (!categories.includes("signature") || media.length < 3)
    ) {
      throw new Error("inspection_media_required");
    }
    if (
      ["wash", "handover_take", "handover_return"].includes(args.type) &&
      media.length < 2
    ) {
      throw new Error("before_after_media_required");
    }
    const slots = uploadedMedia.map((item) => item.slot).filter((slot): slot is string => Boolean(slot));
    if (new Set(slots).size !== slots.length) throw new Error("invalid_media");
    const missingSlots = requiredMediaSlots(
      args.type,
      args.disposition,
      args.amicableSettlement,
    ).filter((slot) => !slots.includes(slot));
    if (missingSlots.length) throw new Error("required_evidence_missing");

    const now = Date.now();
    const recordId = await ctx.db.insert("workflowRecords", {
      reference: args.reference,
      type: args.type,
      actorAccountId: actor._id,
      vehicleId: vehicle?._id,
      customerId,
      rentalId: rental?._id,
      driverId,
      licensePlate: vehicle?.registrationPlate,
      occurredAt: args.occurredAt,
      mileage: args.mileage,
      mileageAfter: args.mileageAfter,
      fuelPercent: args.fuelPercent,
      autonomyKm: args.autonomyKm,
      personName: args.personName,
      customerName: args.customerName,
      employeeName: args.employeeName,
      secondaryLicensePlate: args.secondaryLicensePlate,
      secondaryMileage: args.secondaryMileage,
      secondaryAutonomyKm: args.secondaryAutonomyKm,
      originAddress: args.originAddress,
      destinationAddress: args.destinationAddress,
      disposition: args.disposition,
      mechanicName: args.type === "maintenance" ? actor.displayName : undefined,
      maintenanceInterventionType: args.maintenanceInterventionType,
      maintenanceItems: args.maintenanceItems,
      maintenanceOtherDetails: args.maintenanceOtherDetails,
      roadTestPerformed: args.roadTestPerformed,
      readyForService: args.readyForService,
      eventOccurredAt: args.eventOccurredAt,
      accidentLiability: args.accidentLiability,
      amicableSettlement: args.amicableSettlement,
      invoiceReference: args.invoiceReference,
      inspectionMonth: args.inspectionMonth,
      performedByName: customerWorkflowTypes.includes(args.type)
        ? actor.displayName
        : undefined,
      maintenanceWork:
        args.maintenanceWork ??
        (args.type === "maintenance" && args.maintenanceItems?.length
          ? args.maintenanceItems.join(", ")
          : undefined),
      changesMade: args.changesMade,
      reportCategory: args.reportCategory,
      reportPriority: args.reportPriority,
      description: args.description,
      status: "submitted",
      notificationEmailStatus: customerWorkflowTypes.includes(args.type)
        ? "pending"
        : undefined,
      createdAt: now,
      updatedAt: now,
    });

    await Promise.all(
      media
        .filter((item): item is Doc<"mediaAssets"> => item !== null)
        .map((item) => ctx.db.patch(item._id, { recordId })),
    );

    if (vehicle && args.mileage !== undefined) {
      let status = vehicle.status;
      if (args.type === "check_out") status = "rented";
      if (args.type === "check_in") status = "available";
      if (args.type === "maintenance") status = "maintenance";
      await ctx.db.patch(vehicle._id, {
        currentMileage: Math.max(
          vehicle.currentMileage,
          args.mileageAfter ?? args.mileage,
        ),
        fuelPercent: args.fuelPercent ?? vehicle.fuelPercent,
        status,
        updatedAt: now,
      });
    }
    if (rental) {
      if (args.type === "check_out") {
        await ctx.db.patch(rental._id, { status: "active", updatedAt: now });
      } else if (args.type === "check_in") {
        await ctx.db.patch(rental._id, {
          status: "returned",
          actualEndDate: new Date(now).toISOString().slice(0, 10),
          updatedAt: now,
        });
      }
    }
    await audit(
      ctx,
      actor._id,
      `workflow.${args.type}`,
      "workflowRecord",
      String(recordId),
      `${args.reference} submitted`,
    );
    return { recordId, reference: args.reference };
  },
});

export const getWorkflowForNotification = internalQuery({
  args: { recordId: v.id("workflowRecords") },
  returns: v.union(
    v.null(),
    v.object({
      reference: v.string(),
      type: workflowTypeValidator,
      occurredAt: v.number(),
      performedByName: v.optional(v.string()),
      description: v.optional(v.string()),
      invoiceReference: v.optional(v.string()),
      licensePlate: v.optional(v.string()),
      customerName: v.optional(v.string()),
      customerCompany: v.optional(v.string()),
      customerEmail: v.optional(v.string()),
      notificationEmailStatus: v.optional(
        v.union(
          v.literal("not_configured"),
          v.literal("pending"),
          v.literal("sent"),
          v.literal("failed"),
        ),
      ),
    }),
  ),
  handler: async (ctx, args) => {
    const record = await ctx.db.get(args.recordId);
    if (!record || !customerWorkflowTypes.includes(record.type)) return null;
    const customer = record.customerId ? await ctx.db.get(record.customerId) : null;
    return {
      reference: record.reference,
      type: record.type,
      occurredAt: record.occurredAt,
      performedByName: record.performedByName,
      description: record.description,
      invoiceReference: record.invoiceReference,
      licensePlate: record.licensePlate,
      customerName: customer?.fullName,
      customerCompany: customer?.company,
      customerEmail: customer?.email,
      notificationEmailStatus: record.notificationEmailStatus,
    };
  },
});

export const setWorkflowNotificationStatus = internalMutation({
  args: {
    recordId: v.id("workflowRecords"),
    notificationEmailStatus: v.union(
      v.literal("not_configured"),
      v.literal("pending"),
      v.literal("sent"),
      v.literal("failed"),
    ),
    notificationEmailProviderId: v.optional(v.string()),
    notificationEmailLastError: v.optional(v.string()),
    notificationEmailAttemptedAt: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const record = await ctx.db.get(args.recordId);
    if (!record || !customerWorkflowTypes.includes(record.type)) return null;
    await ctx.db.patch(record._id, {
      notificationEmailStatus: args.notificationEmailStatus,
      notificationEmailProviderId: args.notificationEmailProviderId,
      notificationEmailLastError: args.notificationEmailLastError,
      notificationEmailAttemptedAt: args.notificationEmailAttemptedAt,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const resolveReport = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    recordId: v.id("workflowRecords"),
    resolution: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    requireRole(actor, ["admin", "employee"]);
    const record = await ctx.db.get(args.recordId);
    if (
      !record ||
      !["report", "problem_report", "accident_report", "payment_proof"].includes(
        record.type,
      )
    ) {
      throw new Error("report_not_found");
    }
    const now = Date.now();
    await ctx.db.patch(record._id, {
      status: "resolved",
      resolution: args.resolution,
      resolvedAt: now,
      resolvedBy: actor._id,
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "report.resolved",
      "workflowRecord",
      String(record._id),
      `${record.reference} resolved`,
    );
    return null;
  },
});

export const getRecordMedia = internalQuery({
  args: {
    actorAccountId: v.id("portalAccounts"),
    recordId: v.id("workflowRecords"),
  },
  returns: v.array(
    v.object({
      id: v.id("mediaAssets"),
      r2Key: v.string(),
      fileName: v.string(),
      contentType: v.string(),
      category: mediaCategoryValidator,
      slot: v.optional(v.string()),
      captureSource: v.optional(captureSourceValidator),
      sortOrder: v.optional(v.number()),
    }),
  ),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    const record = await ctx.db.get(args.recordId);
    if (!record) throw new Error("record_not_found");
    if (actor.role === "customer" && record.customerId !== actor.linkedCustomerId) {
      throw new Error("forbidden");
    }
    if (actor.role === "driver" && record.actorAccountId !== actor._id) {
      throw new Error("forbidden");
    }
    if (actor.role === "mechanic" && record.type !== "maintenance") {
      throw new Error("forbidden");
    }
    if (
      actor.role === "employee" &&
      actor.allowedWorkflowTypes &&
      record.actorAccountId !== actor._id
    ) {
      throw new Error("forbidden");
    }
    if (
      actor.role === "contractor" &&
      record.actorAccountId !== actor._id
    ) {
      throw new Error("forbidden");
    }
    const media = await ctx.db
      .query("mediaAssets")
      .withIndex("by_record_id", (q) => q.eq("recordId", record._id))
      .take(24);
    return media
      .filter((item) => item.status === "uploaded")
      .map((item) => ({
        id: item._id,
        r2Key: item.r2Key,
        fileName: item.fileName,
        contentType: item.contentType,
        category: item.category,
        slot: item.slot,
        captureSource: item.captureSource,
        sortOrder: item.sortOrder,
      }));
  },
});

export const getDriverMedia = internalQuery({
  args: {
    actorAccountId: v.id("portalAccounts"),
    driverId: v.id("customerDrivers"),
  },
  returns: v.array(
    v.object({
      id: v.id("mediaAssets"),
      r2Key: v.string(),
      fileName: v.string(),
      contentType: v.string(),
      category: mediaCategoryValidator,
      slot: v.optional(v.string()),
      captureSource: v.optional(captureSourceValidator),
      sortOrder: v.optional(v.number()),
    }),
  ),
  handler: async (ctx, args) => {
    const actor = await requireActor(ctx, args.actorAccountId);
    const driver = await ctx.db.get(args.driverId);
    if (!driver) throw new Error("driver_not_found");
    const allowed =
      actor.role === "admin" ||
      (actor.role === "customer" && driver.customerId === actor.linkedCustomerId) ||
      (actor.role === "driver" && driver._id === actor.linkedDriverId);
    if (!allowed) throw new Error("forbidden");
    const media = await ctx.db
      .query("mediaAssets")
      .withIndex("by_driver_id", (q) => q.eq("driverId", driver._id))
      .take(12);
    return media
      .filter((item) => item.status === "uploaded")
      .map((item) => ({
        id: item._id,
        r2Key: item.r2Key,
        fileName: item.fileName,
        contentType: item.contentType,
        category: item.category,
        slot: item.slot,
        captureSource: item.captureSource,
        sortOrder: item.sortOrder,
      }));
  },
});
