import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const vehicleValidator = v.union(
  v.literal("unspecified"),
  v.literal("l1h1"),
  v.literal("master_l2h2_2023"),
  v.literal("citroen_l2h2_2019"),
  v.literal("l3h2"),
  v.literal("fleet"),
);

export const durationValidator = v.union(
  v.literal("1_month"),
  v.literal("2_months"),
  v.literal("3_months"),
  v.literal("4_6_months"),
  v.literal("over_6_months"),
);

export const leadStatusValidator = v.union(
  v.literal("new"),
  v.literal("contacted"),
  v.literal("qualified"),
  v.literal("won"),
  v.literal("lost"),
  v.literal("spam"),
);

export const portalRoleValidator = v.union(
  v.literal("admin"),
  v.literal("employee"),
  v.literal("customer"),
  v.literal("mechanic"),
  v.literal("contractor"),
);

export const vehicleFormatValidator = v.union(
  v.literal("l1h1"),
  v.literal("l2h2"),
  v.literal("l3h2"),
);

export const operationalVehicleStatusValidator = v.union(
  v.literal("available"),
  v.literal("reserved"),
  v.literal("rented"),
  v.literal("maintenance"),
  v.literal("cleaning"),
  v.literal("inactive"),
);

export const rentalStatusValidator = v.union(
  v.literal("draft"),
  v.literal("scheduled"),
  v.literal("active"),
  v.literal("returned"),
  v.literal("closed"),
  v.literal("cancelled"),
);

export const workflowTypeValidator = v.union(
  v.literal("customer_onboarding"),
  v.literal("check_in"),
  v.literal("check_out"),
  v.literal("wash"),
  v.literal("maintenance"),
  v.literal("handover_take"),
  v.literal("handover_return"),
  v.literal("report"),
);

export const mediaCategoryValidator = v.union(
  v.literal("vehicle_exterior"),
  v.literal("vehicle_interior"),
  v.literal("before"),
  v.literal("after"),
  v.literal("license_plate"),
  v.literal("person"),
  v.literal("selfie"),
  v.literal("signature"),
  v.literal("damage"),
  v.literal("maintenance"),
  v.literal("other"),
);

export default defineSchema({
  quoteRequests: defineTable({
    reference: v.string(),
    idempotencyKey: v.string(),
    fullName: v.string(),
    company: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    vehicle: vehicleValidator,
    duration: durationValidator,
    startDate: v.optional(v.string()),
    message: v.optional(v.string()),
    consentAt: v.number(),
    status: leadStatusValidator,
    source: v.literal("website"),
    locale: v.literal("fr-BE"),
    pageUrl: v.optional(v.string()),
    referrer: v.optional(v.string()),
    requestFingerprint: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    emailStatus: v.union(
      v.literal("not_configured"),
      v.literal("pending"),
      v.literal("sent"),
      v.literal("failed"),
    ),
  })
    .index("by_idempotency_key", ["idempotencyKey"])
    .index("by_reference", ["reference"])
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  portalAccounts: defineTable({
    displayName: v.string(),
    role: portalRoleValidator,
    codeHash: v.string(),
    codeHint: v.string(),
    active: v.boolean(),
    linkedCustomerId: v.optional(v.id("customers")),
    createdBy: v.optional(v.id("portalAccounts")),
    lastLoginAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code_hash", ["codeHash"])
    .index("by_role", ["role"])
    .index("by_active", ["active"]),

  portalSessions: defineTable({
    accountId: v.id("portalAccounts"),
    tokenHash: v.string(),
    expiresAt: v.number(),
    revokedAt: v.optional(v.number()),
    userAgentHash: v.optional(v.string()),
    createdAt: v.number(),
    lastSeenAt: v.number(),
  })
    .index("by_token_hash", ["tokenHash"])
    .index("by_account_id", ["accountId"])
    .index("by_expires_at", ["expiresAt"]),

  customers: defineTable({
    fullName: v.string(),
    company: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    address: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    city: v.optional(v.string()),
    drivingLicenseNumber: v.optional(v.string()),
    emergencyContact: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("lead"),
      v.literal("active"),
      v.literal("inactive"),
    ),
    portalAccountId: v.optional(v.id("portalAccounts")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_portal_account_id", ["portalAccountId"]),

  operationalVehicles: defineTable({
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
  })
    .index("by_registration_plate", ["registrationPlate"])
    .index("by_status", ["status"]),

  rentals: defineTable({
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
  })
    .index("by_reference", ["reference"])
    .index("by_customer_id", ["customerId"])
    .index("by_vehicle_id", ["vehicleId"])
    .index("by_vehicle_id_and_status", ["vehicleId", "status"])
    .index("by_status", ["status"]),

  workflowRecords: defineTable({
    reference: v.string(),
    type: workflowTypeValidator,
    actorAccountId: v.id("portalAccounts"),
    vehicleId: v.optional(v.id("operationalVehicles")),
    customerId: v.optional(v.id("customers")),
    rentalId: v.optional(v.id("rentals")),
    licensePlate: v.optional(v.string()),
    occurredAt: v.number(),
    mileage: v.optional(v.number()),
    mileageAfter: v.optional(v.number()),
    fuelPercent: v.optional(v.number()),
    personName: v.optional(v.string()),
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_reference", ["reference"])
    .index("by_type", ["type"])
    .index("by_actor_account_id", ["actorAccountId"])
    .index("by_vehicle_id", ["vehicleId"])
    .index("by_customer_id", ["customerId"])
    .index("by_rental_id", ["rentalId"])
    .index("by_status", ["status"]),

  mediaAssets: defineTable({
    r2Key: v.string(),
    uploadGroupId: v.string(),
    recordId: v.optional(v.id("workflowRecords")),
    createdBy: v.id("portalAccounts"),
    fileName: v.string(),
    contentType: v.string(),
    size: v.number(),
    category: mediaCategoryValidator,
    status: v.union(
      v.literal("pending"),
      v.literal("uploaded"),
      v.literal("deleted"),
    ),
    etag: v.optional(v.string()),
    createdAt: v.number(),
    uploadedAt: v.optional(v.number()),
    expiresAt: v.number(),
  })
    .index("by_r2_key", ["r2Key"])
    .index("by_upload_group_id", ["uploadGroupId"])
    .index("by_record_id", ["recordId"])
    .index("by_created_by", ["createdBy"])
    .index("by_status", ["status"]),

  auditEvents: defineTable({
    actorAccountId: v.optional(v.id("portalAccounts")),
    action: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    summary: v.string(),
    metadata: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_actor_account_id", ["actorAccountId"])
    .index("by_entity_type_and_entity_id", ["entityType", "entityId"]),
});
