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
});
