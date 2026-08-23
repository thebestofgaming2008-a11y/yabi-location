import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const vehicleValidator = v.union(
  v.literal("unspecified"),
  v.literal("l1h1"),
  v.literal("l2h2"),
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
  v.literal("driver"),
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
  v.literal("breakdown_replacement"),
  v.literal("vehicle_transfer"),
  v.literal("report"),
  v.literal("problem_report"),
  v.literal("accident_report"),
  v.literal("payment_proof"),
  v.literal("monthly_inspection"),
);

export const accidentLiabilityValidator = v.union(
  v.literal("at_fault"),
  v.literal("not_at_fault"),
);

export const vehicleDispositionValidator = v.union(
  v.literal("self"),
  v.literal("towing"),
  v.literal("mechanic"),
  v.literal("other"),
);

export const maintenanceInterventionTypeValidator = v.union(
  v.literal("regular_service"),
  v.literal("breakdown_repair"),
  v.literal("technical_inspection"),
);

export const captureSourceValidator = v.union(
  v.literal("camera"),
  v.literal("gallery"),
  v.literal("signature"),
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
  v.literal("accident"),
  v.literal("payment"),
  v.literal("inspection"),
  v.literal("driver_document"),
  v.literal("other"),
);

export const applicationStatusValidator = v.union(
  v.literal("draft"),
  v.literal("submitted"),
  v.literal("contacted"),
  v.literal("agreed"),
  v.literal("activated"),
  v.literal("rejected"),
);

export const applicationDriverKindValidator = v.union(
  v.literal("main"),
  v.literal("additional"),
);

export const applicantTypeValidator = v.union(
  v.literal("individual"),
  v.literal("company"),
);

export const belgianProvinceValidator = v.union(
  v.literal("antwerp"),
  v.literal("brussels_capital"),
  v.literal("east_flanders"),
  v.literal("flemish_brabant"),
  v.literal("hainaut"),
  v.literal("liege"),
  v.literal("limburg"),
  v.literal("luxembourg"),
  v.literal("namur"),
  v.literal("walloon_brabant"),
  v.literal("west_flanders"),
);

export const applicationDocumentCategoryValidator = v.union(
  v.literal("identity_front"),
  v.literal("identity_back"),
  v.literal("licence_front"),
  v.literal("licence_back"),
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
    emailProviderId: v.optional(v.string()),
    emailLastError: v.optional(v.string()),
    emailAttemptedAt: v.optional(v.number()),
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
    accessCodeCiphertext: v.optional(v.string()),
    accessCodeIv: v.optional(v.string()),
    active: v.boolean(),
    linkedCustomerId: v.optional(v.id("customers")),
    linkedDriverId: v.optional(v.id("customerDrivers")),
    allowedWorkflowTypes: v.optional(v.array(workflowTypeValidator)),
    createdBy: v.optional(v.id("portalAccounts")),
    lastLoginAt: v.optional(v.number()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("portalAccounts")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code_hash", ["codeHash"])
    .index("by_role", ["role"])
    .index("by_active", ["active"])
    .index("by_deleted_at", ["deletedAt"]),

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
    .index("by_account_id_and_revoked_at", ["accountId", "revokedAt"])
    .index("by_expires_at", ["expiresAt"]),

  customers: defineTable({
    fullName: v.string(),
    company: v.optional(v.string()),
    companyVatNumber: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    address: v.optional(v.string()),
    street: v.optional(v.string()),
    houseNumber: v.optional(v.string()),
    addressBox: v.optional(v.string()),
    identityCardNumber: v.optional(v.string()),
    nationalRegisterNumber: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    city: v.optional(v.string()),
    province: v.optional(belgianProvinceValidator),
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
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("portalAccounts")),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_portal_account_id", ["portalAccountId"])
    .index("by_deleted_at", ["deletedAt"]),

  customerDrivers: defineTable({
    customerId: v.id("customers"),
    sourceApplicationDriverId: v.optional(v.id("applicationDrivers")),
    portalAccountId: v.optional(v.id("portalAccounts")),
    kind: applicationDriverKindValidator,
    sortOrder: v.number(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    fullName: v.string(),
    address: v.optional(v.string()),
    street: v.optional(v.string()),
    houseNumber: v.optional(v.string()),
    addressBox: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    city: v.optional(v.string()),
    province: v.optional(belgianProvinceValidator),
    email: v.optional(v.string()),
    phone: v.string(),
    identityCardNumber: v.string(),
    nationalRegisterNumber: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    companyPosition: v.optional(v.string()),
    drivingLicenceNumber: v.string(),
    licenceIssueDate: v.string(),
    licenceValidSince: v.string(),
    active: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("portalAccounts")),
  })
    .index("by_customer_id", ["customerId"])
    .index("by_portal_account_id", ["portalAccountId"])
    .index("by_source_application_driver_id", ["sourceApplicationDriverId"])
    .index("by_deleted_at", ["deletedAt"]),

  driverVehicleAssignments: defineTable({
    driverId: v.id("customerDrivers"),
    vehicleId: v.id("operationalVehicles"),
    assignedBy: v.id("portalAccounts"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_driver_id", ["driverId"])
    .index("by_vehicle_id", ["vehicleId"])
    .index("by_driver_id_and_vehicle_id", ["driverId", "vehicleId"]),

  rentalApplications: defineTable({
    reference: v.string(),
    tokenHash: v.string(),
    locale: v.union(v.literal("en"), v.literal("fr"), v.literal("nl")),
    status: applicationStatusValidator,
    applicantType: v.optional(applicantTypeValidator),
    holderFullName: v.optional(v.string()),
    companyName: v.optional(v.string()),
    companyVatNumber: v.optional(v.string()),
    holderNameOrCompany: v.optional(v.string()),
    holderAddress: v.optional(v.string()),
    holderStreet: v.optional(v.string()),
    holderHouseNumber: v.optional(v.string()),
    holderAddressBox: v.optional(v.string()),
    holderPostalCode: v.optional(v.string()),
    holderCity: v.optional(v.string()),
    holderProvince: v.optional(belgianProvinceValidator),
    holderPhone: v.optional(v.string()),
    holderIdentityCardNumber: v.optional(v.string()),
    holderNationalRegisterNumber: v.optional(v.string()),
    holderEmail: v.optional(v.string()),
    consentAt: v.optional(v.number()),
    privacyVersion: v.optional(v.string()),
    submittedAt: v.optional(v.number()),
    reviewedBy: v.optional(v.id("portalAccounts")),
    reviewedAt: v.optional(v.number()),
    adminNotes: v.optional(v.string()),
    customerId: v.optional(v.id("customers")),
    portalAccountId: v.optional(v.id("portalAccounts")),
    emailStatus: v.optional(
      v.union(
        v.literal("not_configured"),
        v.literal("pending"),
        v.literal("sent"),
        v.literal("failed"),
      ),
    ),
    emailProviderId: v.optional(v.string()),
    emailLastError: v.optional(v.string()),
    emailAttemptedAt: v.optional(v.number()),
    expiresAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("portalAccounts")),
  })
    .index("by_reference", ["reference"])
    .index("by_token_hash", ["tokenHash"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .index("by_deleted_at", ["deletedAt"]),

  applicationDrivers: defineTable({
    applicationId: v.id("rentalApplications"),
    clientKey: v.string(),
    kind: applicationDriverKindValidator,
    sortOrder: v.number(),
    fullName: v.string(),
    address: v.optional(v.string()),
    street: v.optional(v.string()),
    houseNumber: v.optional(v.string()),
    addressBox: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    city: v.optional(v.string()),
    province: v.optional(belgianProvinceValidator),
    email: v.optional(v.string()),
    phone: v.string(),
    identityCardNumber: v.string(),
    nationalRegisterNumber: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    companyPosition: v.optional(v.string()),
    drivingLicenceNumber: v.string(),
    licenceIssueDate: v.string(),
    licenceValidSince: v.string(),
    ageConfirmed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("portalAccounts")),
  })
    .index("by_application_id", ["applicationId"])
    .index("by_application_id_and_client_key", ["applicationId", "clientKey"]),

  applicationMedia: defineTable({
    applicationId: v.id("rentalApplications"),
    driverClientKey: v.string(),
    r2Key: v.string(),
    category: applicationDocumentCategoryValidator,
    contentType: v.string(),
    size: v.number(),
    width: v.number(),
    height: v.number(),
    capturedAt: v.number(),
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
    .index("by_application_id", ["applicationId"])
    .index("by_application_id_and_driver_key", [
      "applicationId",
      "driverClientKey",
    ]),

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
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("portalAccounts")),
  })
    .index("by_registration_plate", ["registrationPlate"])
    .index("by_status", ["status"])
    .index("by_deleted_at", ["deletedAt"]),

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
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("portalAccounts")),
  })
    .index("by_reference", ["reference"])
    .index("by_customer_id", ["customerId"])
    .index("by_vehicle_id", ["vehicleId"])
    .index("by_vehicle_id_and_status", ["vehicleId", "status"])
    .index("by_status", ["status"])
    .index("by_deleted_at", ["deletedAt"]),

  workflowRecords: defineTable({
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
    notificationEmailProviderId: v.optional(v.string()),
    notificationEmailLastError: v.optional(v.string()),
    notificationEmailAttemptedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_reference", ["reference"])
    .index("by_type", ["type"])
    .index("by_actor_account_id", ["actorAccountId"])
    .index("by_driver_id", ["driverId"])
    .index("by_vehicle_id", ["vehicleId"])
    .index("by_vehicle_id_and_inspection_month", ["vehicleId", "inspectionMonth"])
    .index("by_customer_id", ["customerId"])
    .index("by_rental_id", ["rentalId"])
    .index("by_status", ["status"]),

  mediaAssets: defineTable({
    r2Key: v.string(),
    uploadGroupId: v.string(),
    recordId: v.optional(v.id("workflowRecords")),
    driverId: v.optional(v.id("customerDrivers")),
    createdBy: v.id("portalAccounts"),
    fileName: v.string(),
    contentType: v.string(),
    size: v.number(),
    category: mediaCategoryValidator,
    slot: v.optional(v.string()),
    captureSource: v.optional(captureSourceValidator),
    sortOrder: v.optional(v.number()),
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
    .index("by_driver_id", ["driverId"])
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
