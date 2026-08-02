import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import {
  internalMutation,
  internalQuery,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import {
  applicantTypeValidator,
  applicationDocumentCategoryValidator,
  applicationDriverKindValidator,
  applicationStatusValidator,
  belgianProvinceValidator,
} from "./schema";
import { portalRateLimiter } from "./rateLimits";

const localeValidator = v.union(
  v.literal("en"),
  v.literal("fr"),
  v.literal("nl"),
);

const emailStatusValidator = v.union(
  v.literal("not_configured"),
  v.literal("pending"),
  v.literal("sent"),
  v.literal("failed"),
);

const driverInputValidator = v.object({
  clientKey: v.string(),
  kind: applicationDriverKindValidator,
  sortOrder: v.number(),
  fullName: v.string(),
  address: v.string(),
  street: v.string(),
  houseNumber: v.string(),
  addressBox: v.optional(v.string()),
  postalCode: v.string(),
  city: v.string(),
  province: belgianProvinceValidator,
  email: v.string(),
  phone: v.string(),
  identityCardNumber: v.string(),
  nationalRegisterNumber: v.string(),
  dateOfBirth: v.string(),
  companyPosition: v.optional(v.string()),
  drivingLicenceNumber: v.string(),
  licenceIssueDate: v.string(),
  licenceValidSince: v.string(),
  ageConfirmed: v.boolean(),
});

const applicationSummaryValidator = v.object({
  id: v.id("rentalApplications"),
  reference: v.string(),
  status: applicationStatusValidator,
  holderNameOrCompany: v.optional(v.string()),
  holderEmail: v.optional(v.string()),
  holderPhone: v.optional(v.string()),
  submittedAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const driverPublicValidator = v.object({
  id: v.id("applicationDrivers"),
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
});

const documentPublicValidator = v.object({
  id: v.id("applicationMedia"),
  driverClientKey: v.string(),
  r2Key: v.string(),
  category: applicationDocumentCategoryValidator,
  contentType: v.string(),
  size: v.number(),
  width: v.number(),
  height: v.number(),
  capturedAt: v.number(),
});

async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
  actorAccountId: Id<"portalAccounts">,
) {
  const actor = await ctx.db.get(actorAccountId);
  if (!actor || !actor.active) throw new Error("unauthorized");
  if (actor.role !== "admin") throw new Error("forbidden");
  return actor;
}

async function audit(
  ctx: MutationCtx,
  actorAccountId: Id<"portalAccounts"> | undefined,
  action: string,
  entityId: string,
  summary: string,
) {
  await ctx.db.insert("auditEvents", {
    actorAccountId,
    action,
    entityType: "rentalApplication",
    entityId,
    summary,
    createdAt: Date.now(),
  });
}

function validIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

function dateAtLeastYearsAgo(value: string, years: number): boolean {
  if (!validIsoDate(value)) return false;
  const cutoff = new Date();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - years);
  return value <= cutoff.toISOString().slice(0, 10);
}

function emailAddressValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function nationalRegisterNumberValid(value: string): boolean {
  return (
    /^[0-9.\s/-]+$/.test(value) && value.replace(/\D/g, "").length === 11
  );
}

function belgianVatNumberValid(value: string): boolean {
  return /^(?:BE)?[01]\d{9}$/.test(value.replace(/[.\s-]/g, "").toUpperCase());
}

function belgianPostalCodeValid(value: string): boolean {
  return /^\d{4}$/.test(value);
}

export const startApplication = internalMutation({
  args: {
    tokenHash: v.string(),
    reference: v.string(),
    locale: localeValidator,
    fingerprint: v.string(),
  },
  returns: v.object({
    ok: v.boolean(),
    applicationId: v.optional(v.id("rentalApplications")),
    retryAfter: v.optional(v.number()),
  }),
  handler: async (ctx, args) => {
    const limit = await portalRateLimiter.limit(
      ctx,
      "applicationStartByFingerprint",
      { key: args.fingerprint },
    );
    if (!limit.ok) {
      return { ok: false, retryAfter: limit.retryAfter };
    }
    const now = Date.now();
    const applicationId = await ctx.db.insert("rentalApplications", {
      reference: args.reference,
      tokenHash: args.tokenHash,
      locale: args.locale,
      status: "draft",
      expiresAt: now + 24 * 60 * 60 * 1000,
      createdAt: now,
      updatedAt: now,
    });
    return { ok: true, applicationId };
  },
});

export const getApplicationSession = internalQuery({
  args: { tokenHash: v.string(), now: v.number() },
  returns: v.union(
    v.null(),
    v.object({
      applicationId: v.id("rentalApplications"),
      reference: v.string(),
      status: applicationStatusValidator,
      expiresAt: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const application = await ctx.db
      .query("rentalApplications")
      .withIndex("by_token_hash", (query) => query.eq("tokenHash", args.tokenHash))
      .unique();
    if (
      !application ||
      application.expiresAt <= args.now ||
      application.status !== "draft"
    ) {
      return null;
    }
    return {
      applicationId: application._id,
      reference: application.reference,
      status: application.status,
      expiresAt: application.expiresAt,
    };
  },
});

export const createPendingDocument = internalMutation({
  args: {
    applicationId: v.id("rentalApplications"),
    tokenHash: v.string(),
    driverClientKey: v.string(),
    r2Key: v.string(),
    category: applicationDocumentCategoryValidator,
    contentType: v.string(),
    size: v.number(),
    width: v.number(),
    height: v.number(),
    capturedAt: v.number(),
    expiresAt: v.number(),
  },
  returns: v.id("applicationMedia"),
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (
      !application ||
      application.tokenHash !== args.tokenHash ||
      application.status !== "draft" ||
      application.expiresAt <= Date.now()
    ) {
      throw new Error("application_unauthorized");
    }
    const limit = await portalRateLimiter.limit(
      ctx,
      "applicationUploadsByApplication",
      { key: String(application._id) },
    );
    if (!limit.ok) throw new Error("application_upload_rate_limited");
    if (
      args.size <= 0 ||
      args.size > 8_000_000 ||
      args.width < 640 ||
      args.height < 480 ||
      args.width > 10_000 ||
      args.height > 10_000
    ) {
      throw new Error("invalid_capture");
    }
    if (!["image/jpeg", "image/webp"].includes(args.contentType)) {
      throw new Error("invalid_file_type");
    }
    const previous = await ctx.db
      .query("applicationMedia")
      .withIndex("by_application_id_and_driver_key", (query) =>
        query
          .eq("applicationId", application._id)
          .eq("driverClientKey", args.driverClientKey),
      )
      .take(12);
    await Promise.all(
      previous
        .filter(
          (item) =>
            item.category === args.category && item.status !== "deleted",
        )
        .map((item) => ctx.db.patch(item._id, { status: "deleted" as const })),
    );
    return await ctx.db.insert("applicationMedia", {
      applicationId: application._id,
      driverClientKey: args.driverClientKey,
      r2Key: args.r2Key,
      category: args.category,
      contentType: args.contentType,
      size: args.size,
      width: args.width,
      height: args.height,
      capturedAt: args.capturedAt,
      status: "pending",
      createdAt: Date.now(),
      expiresAt: args.expiresAt,
    });
  },
});

export const markDocumentUploaded = internalMutation({
  args: {
    r2Key: v.string(),
    etag: v.optional(v.string()),
    size: v.number(),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const media = await ctx.db
      .query("applicationMedia")
      .withIndex("by_r2_key", (query) => query.eq("r2Key", args.r2Key))
      .unique();
    if (
      !media ||
      media.status !== "pending" ||
      media.expiresAt < Date.now() ||
      media.size !== args.size
    ) {
      return false;
    }
    await ctx.db.patch(media._id, {
      status: "uploaded",
      etag: args.etag,
      uploadedAt: Date.now(),
    });
    return true;
  },
});

export const submitApplication = internalMutation({
  args: {
    applicationId: v.id("rentalApplications"),
    tokenHash: v.string(),
    applicantType: applicantTypeValidator,
    holderFullName: v.string(),
    companyName: v.optional(v.string()),
    companyVatNumber: v.optional(v.string()),
    holderAddress: v.string(),
    holderStreet: v.string(),
    holderHouseNumber: v.string(),
    holderAddressBox: v.optional(v.string()),
    holderPostalCode: v.string(),
    holderCity: v.string(),
    holderProvince: belgianProvinceValidator,
    holderPhone: v.string(),
    holderIdentityCardNumber: v.string(),
    holderNationalRegisterNumber: v.string(),
    holderEmail: v.string(),
    privacyVersion: v.string(),
    drivers: v.array(driverInputValidator),
  },
  returns: v.object({ reference: v.string() }),
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (
      !application ||
      application.tokenHash !== args.tokenHash ||
      application.status !== "draft" ||
      application.expiresAt <= Date.now()
    ) {
      throw new Error("application_unauthorized");
    }
    if (
      args.drivers.length < 1 ||
      args.drivers.length > 6 ||
      args.drivers.filter((driver) => driver.kind === "main").length !== 1 ||
      new Set(args.drivers.map((driver) => driver.clientKey)).size !==
        args.drivers.length ||
      !args.holderFullName ||
      !args.holderAddress ||
      !args.holderStreet ||
      !args.holderHouseNumber ||
      !belgianPostalCodeValid(args.holderPostalCode) ||
      !args.holderCity ||
      !args.holderPhone ||
      !args.holderIdentityCardNumber ||
      !nationalRegisterNumberValid(args.holderNationalRegisterNumber) ||
      !emailAddressValid(args.holderEmail) ||
      (args.applicantType === "company" &&
        (!args.companyName ||
          !args.companyVatNumber ||
          !belgianVatNumberValid(args.companyVatNumber))) ||
      args.drivers.some(
        (driver) =>
          !driver.ageConfirmed ||
          !driver.address ||
          !driver.street ||
          !driver.houseNumber ||
          !belgianPostalCodeValid(driver.postalCode) ||
          !driver.city ||
          !emailAddressValid(driver.email) ||
          !nationalRegisterNumberValid(driver.nationalRegisterNumber) ||
          !dateAtLeastYearsAgo(driver.dateOfBirth, 23) ||
          !dateAtLeastYearsAgo(driver.licenceIssueDate, 0) ||
          !dateAtLeastYearsAgo(driver.licenceValidSince, 5) ||
          (args.applicantType === "company" && !driver.companyPosition),
      )
    ) {
      throw new Error("application_validation_failed");
    }
    const documents = await ctx.db
      .query("applicationMedia")
      .withIndex("by_application_id", (query) =>
        query.eq("applicationId", application._id),
      )
      .take(48);
    const required = [
      "identity_front",
      "identity_back",
      "licence_front",
      "licence_back",
    ];
    for (const driver of args.drivers) {
      const categories = new Set(
        documents
          .filter(
            (media) =>
              media.driverClientKey === driver.clientKey &&
              media.status === "uploaded",
          )
          .map((media) => media.category),
      );
      if (!required.every((category) => categories.has(category as never))) {
        throw new Error("application_documents_missing");
      }
    }
    const now = Date.now();
    for (const driver of args.drivers) {
      await ctx.db.insert("applicationDrivers", {
        applicationId: application._id,
        ...driver,
        createdAt: now,
        updatedAt: now,
      });
    }
    await ctx.db.patch(application._id, {
      applicantType: args.applicantType,
      holderFullName: args.holderFullName,
      companyName: args.companyName,
      companyVatNumber: args.companyVatNumber,
      holderNameOrCompany:
        args.applicantType === "company"
          ? args.companyName
          : args.holderFullName,
      holderAddress: args.holderAddress,
      holderStreet: args.holderStreet,
      holderHouseNumber: args.holderHouseNumber,
      holderAddressBox: args.holderAddressBox,
      holderPostalCode: args.holderPostalCode,
      holderCity: args.holderCity,
      holderProvince: args.holderProvince,
      holderPhone: args.holderPhone,
      holderIdentityCardNumber: args.holderIdentityCardNumber,
      holderNationalRegisterNumber: args.holderNationalRegisterNumber,
      holderEmail: args.holderEmail,
      consentAt: now,
      privacyVersion: args.privacyVersion,
      status: "submitted",
      submittedAt: now,
      emailStatus: "pending",
      updatedAt: now,
      expiresAt: now,
    });
    await audit(
      ctx,
      undefined,
      "application.submitted",
      String(application._id),
      `${application.reference} submitted`,
    );
    return { reference: application.reference };
  },
});

export const getApplicationForEmail = internalQuery({
  args: { applicationId: v.id("rentalApplications") },
  returns: v.union(
    v.null(),
    v.object({
      reference: v.string(),
      locale: localeValidator,
      applicantType: applicantTypeValidator,
      holderFullName: v.string(),
      companyName: v.optional(v.string()),
      companyVatNumber: v.optional(v.string()),
      holderAddress: v.string(),
      holderPhone: v.string(),
      holderEmail: v.string(),
      submittedAt: v.number(),
      emailStatus: v.optional(emailStatusValidator),
      drivers: v.array(
        v.object({
          kind: applicationDriverKindValidator,
          fullName: v.string(),
          email: v.optional(v.string()),
          phone: v.string(),
          companyPosition: v.optional(v.string()),
        }),
      ),
      documentCount: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (
      !application ||
      application.status === "draft" ||
      !application.applicantType ||
      !application.holderFullName ||
      !application.holderAddress ||
      !application.holderPhone ||
      !application.holderEmail ||
      !application.submittedAt
    ) {
      return null;
    }
    const [drivers, documents] = await Promise.all([
      ctx.db
        .query("applicationDrivers")
        .withIndex("by_application_id", (query) =>
          query.eq("applicationId", application._id),
        )
        .take(6),
      ctx.db
        .query("applicationMedia")
        .withIndex("by_application_id", (query) =>
          query.eq("applicationId", application._id),
        )
        .take(48),
    ]);
    return {
      reference: application.reference,
      locale: application.locale,
      applicantType: application.applicantType,
      holderFullName: application.holderFullName,
      companyName: application.companyName,
      companyVatNumber: application.companyVatNumber,
      holderAddress: application.holderAddress,
      holderPhone: application.holderPhone,
      holderEmail: application.holderEmail,
      submittedAt: application.submittedAt,
      emailStatus: application.emailStatus,
      drivers: drivers
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((driver) => ({
          kind: driver.kind,
          fullName: driver.fullName,
          email: driver.email,
          phone: driver.phone,
          companyPosition: driver.companyPosition,
        })),
      documentCount: documents.filter(
        (document) => document.status === "uploaded",
      ).length,
    };
  },
});

export const setApplicationEmailStatus = internalMutation({
  args: {
    applicationId: v.id("rentalApplications"),
    emailStatus: v.union(
      v.literal("not_configured"),
      v.literal("sent"),
      v.literal("failed"),
    ),
    emailProviderId: v.optional(v.string()),
    emailLastError: v.optional(v.string()),
    emailAttemptedAt: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) return null;
    await ctx.db.patch(application._id, {
      emailStatus: args.emailStatus,
      emailProviderId: args.emailProviderId,
      emailLastError: args.emailLastError,
      emailAttemptedAt: args.emailAttemptedAt,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const listApplicationsForAdmin = internalQuery({
  args: { actorAccountId: v.id("portalAccounts") },
  returns: v.array(applicationSummaryValidator),
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.actorAccountId);
    const applications = await ctx.db
      .query("rentalApplications")
      .withIndex("by_created_at")
      .order("desc")
      .take(100);
    return applications
      .filter((application) => application.status !== "draft")
      .map((application) => ({
        id: application._id,
        reference: application.reference,
        status: application.status,
        holderNameOrCompany: application.holderNameOrCompany,
        holderEmail: application.holderEmail,
        holderPhone: application.holderPhone,
        submittedAt: application.submittedAt,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      }));
  },
});

export const getApplicationForAdmin = internalQuery({
  args: {
    actorAccountId: v.id("portalAccounts"),
    applicationId: v.id("rentalApplications"),
  },
  returns: v.object({
    application: v.object({
      id: v.id("rentalApplications"),
      reference: v.string(),
      locale: localeValidator,
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
      submittedAt: v.optional(v.number()),
      adminNotes: v.optional(v.string()),
      customerId: v.optional(v.id("customers")),
      portalAccountId: v.optional(v.id("portalAccounts")),
    }),
    drivers: v.array(driverPublicValidator),
    documents: v.array(documentPublicValidator),
  }),
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.actorAccountId);
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("application_not_found");
    const [drivers, documents] = await Promise.all([
      ctx.db
        .query("applicationDrivers")
        .withIndex("by_application_id", (query) =>
          query.eq("applicationId", application._id),
        )
        .take(6),
      ctx.db
        .query("applicationMedia")
        .withIndex("by_application_id", (query) =>
          query.eq("applicationId", application._id),
        )
        .take(48),
    ]);
    return {
      application: {
        id: application._id,
        reference: application.reference,
        locale: application.locale,
        status: application.status,
        applicantType: application.applicantType,
        holderFullName: application.holderFullName,
        companyName: application.companyName,
        companyVatNumber: application.companyVatNumber,
        holderNameOrCompany: application.holderNameOrCompany,
        holderAddress: application.holderAddress,
        holderStreet: application.holderStreet,
        holderHouseNumber: application.holderHouseNumber,
        holderAddressBox: application.holderAddressBox,
        holderPostalCode: application.holderPostalCode,
        holderCity: application.holderCity,
        holderProvince: application.holderProvince,
        holderPhone: application.holderPhone,
        holderIdentityCardNumber: application.holderIdentityCardNumber,
        holderNationalRegisterNumber:
          application.holderNationalRegisterNumber,
        holderEmail: application.holderEmail,
        consentAt: application.consentAt,
        submittedAt: application.submittedAt,
        adminNotes: application.adminNotes,
        customerId: application.customerId,
        portalAccountId: application.portalAccountId,
      },
      drivers: drivers
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((driver) => ({
          id: driver._id,
          clientKey: driver.clientKey,
          kind: driver.kind,
          sortOrder: driver.sortOrder,
          fullName: driver.fullName,
          address: driver.address,
          street: driver.street,
          houseNumber: driver.houseNumber,
          addressBox: driver.addressBox,
          postalCode: driver.postalCode,
          city: driver.city,
          province: driver.province,
          email: driver.email,
          phone: driver.phone,
          identityCardNumber: driver.identityCardNumber,
          nationalRegisterNumber: driver.nationalRegisterNumber,
          dateOfBirth: driver.dateOfBirth,
          companyPosition: driver.companyPosition,
          drivingLicenceNumber: driver.drivingLicenceNumber,
          licenceIssueDate: driver.licenceIssueDate,
          licenceValidSince: driver.licenceValidSince,
          ageConfirmed: driver.ageConfirmed,
        })),
      documents: documents
        .filter((media) => media.status === "uploaded")
        .map((media) => ({
          id: media._id,
          driverClientKey: media.driverClientKey,
          r2Key: media.r2Key,
          category: media.category,
          contentType: media.contentType,
          size: media.size,
          width: media.width,
          height: media.height,
          capturedAt: media.capturedAt,
        })),
    };
  },
});

export const updateApplicationStatus = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    applicationId: v.id("rentalApplications"),
    status: v.union(
      v.literal("contacted"),
      v.literal("agreed"),
      v.literal("rejected"),
    ),
    adminNotes: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireAdmin(ctx, args.actorAccountId);
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("application_not_found");
    if (application.status === "activated" || application.status === "draft") {
      throw new Error("application_status_locked");
    }
    const now = Date.now();
    await ctx.db.patch(application._id, {
      status: args.status,
      adminNotes: args.adminNotes,
      reviewedBy: actor._id,
      reviewedAt: now,
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "application.status_updated",
      String(application._id),
      `${application.reference} changed to ${args.status}`,
    );
    return null;
  },
});

export const activateApplication = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    applicationId: v.id("rentalApplications"),
    codeHash: v.string(),
    codeHint: v.string(),
  },
  returns: v.object({
    customerId: v.id("customers"),
    portalAccountId: v.id("portalAccounts"),
  }),
  handler: async (ctx, args) => {
    const actor = await requireAdmin(ctx, args.actorAccountId);
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("application_not_found");
    if (application.status !== "agreed") {
      throw new Error("application_must_be_agreed");
    }
    const holderFullName =
      application.holderFullName ?? application.holderNameOrCompany;
    if (
      !application.holderNameOrCompany ||
      !holderFullName ||
      !application.holderEmail ||
      !application.holderPhone ||
      !application.holderNationalRegisterNumber
    ) {
      throw new Error("application_validation_failed");
    }
    const collision = await ctx.db
      .query("portalAccounts")
      .withIndex("by_code_hash", (query) => query.eq("codeHash", args.codeHash))
      .unique();
    if (collision) throw new Error("code_collision");
    const drivers = await ctx.db
      .query("applicationDrivers")
      .withIndex("by_application_id", (query) =>
        query.eq("applicationId", application._id),
      )
      .take(6);
    if (
      drivers.length < 1 ||
      drivers.some((driver) => !driver.nationalRegisterNumber)
    ) {
      throw new Error("application_validation_failed");
    }
    const now = Date.now();
    const customerId = await ctx.db.insert("customers", {
      fullName: holderFullName,
      ...(application.applicantType === "company" && application.companyName
        ? { company: application.companyName }
        : {}),
      ...(application.applicantType === "company" &&
      application.companyVatNumber
        ? { companyVatNumber: application.companyVatNumber }
        : {}),
      email: application.holderEmail,
      phone: application.holderPhone,
      address: application.holderAddress,
      street: application.holderStreet,
      houseNumber: application.holderHouseNumber,
      addressBox: application.holderAddressBox,
      postalCode: application.holderPostalCode,
      city: application.holderCity,
      province: application.holderProvince,
      identityCardNumber: application.holderIdentityCardNumber,
      nationalRegisterNumber: application.holderNationalRegisterNumber,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    const portalAccountId = await ctx.db.insert("portalAccounts", {
      displayName:
        application.applicantType === "company"
          ? application.companyName ?? holderFullName
          : holderFullName,
      role: "customer",
      codeHash: args.codeHash,
      codeHint: args.codeHint,
      active: true,
      linkedCustomerId: customerId,
      createdBy: actor._id,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(customerId, { portalAccountId, updatedAt: now });
    for (const driver of drivers) {
      await ctx.db.insert("customerDrivers", {
        customerId,
        sourceApplicationDriverId: driver._id,
        kind: driver.kind,
        sortOrder: driver.sortOrder,
        fullName: driver.fullName,
        address: driver.address,
        street: driver.street,
        houseNumber: driver.houseNumber,
        addressBox: driver.addressBox,
        postalCode: driver.postalCode,
        city: driver.city,
        province: driver.province,
        email: driver.email,
        phone: driver.phone,
        identityCardNumber: driver.identityCardNumber,
        nationalRegisterNumber: driver.nationalRegisterNumber,
        dateOfBirth: driver.dateOfBirth,
        companyPosition: driver.companyPosition,
        drivingLicenceNumber: driver.drivingLicenceNumber,
        licenceIssueDate: driver.licenceIssueDate,
        licenceValidSince: driver.licenceValidSince,
        active: true,
        createdAt: now,
        updatedAt: now,
      });
    }
    await ctx.db.patch(application._id, {
      status: "activated",
      customerId,
      portalAccountId,
      reviewedBy: actor._id,
      reviewedAt: now,
      updatedAt: now,
    });
    await audit(
      ctx,
      actor._id,
      "application.activated",
      String(application._id),
      `${application.reference} activated as a customer account`,
    );
    return { customerId, portalAccountId };
  },
});

export const purgeApplication = internalMutation({
  args: {
    actorAccountId: v.id("portalAccounts"),
    applicationId: v.id("rentalApplications"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await requireAdmin(ctx, args.actorAccountId);
    const application = await ctx.db.get(args.applicationId);
    if (!application) return null;
    if (!["draft", "rejected"].includes(application.status)) {
      throw new Error("application_status_locked");
    }
    const [drivers, documents] = await Promise.all([
      ctx.db
        .query("applicationDrivers")
        .withIndex("by_application_id", (query) =>
          query.eq("applicationId", application._id),
        )
        .take(6),
      ctx.db
        .query("applicationMedia")
        .withIndex("by_application_id", (query) =>
          query.eq("applicationId", application._id),
        )
        .take(48),
    ]);
    await Promise.all([
      ...drivers.map((driver) => ctx.db.delete(driver._id)),
      ...documents.map((document) => ctx.db.delete(document._id)),
    ]);
    await ctx.db.delete(application._id);
    await audit(
      ctx,
      actor._id,
      "application.purged",
      String(application._id),
      `${application.reference} purged`,
    );
    return null;
  },
});
