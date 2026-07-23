import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { durationValidator, vehicleValidator } from "./schema";
import { quoteRateLimiter } from "./rateLimits";

const resultValidator = v.object({
  ok: v.boolean(),
  duplicate: v.optional(v.boolean()),
  reference: v.optional(v.string()),
  retryAfter: v.optional(v.number()),
  limitedBy: v.optional(
    v.union(v.literal("global"), v.literal("fingerprint"), v.literal("email")),
  ),
});

export const createFromWebsite = internalMutation({
  args: {
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
    pageUrl: v.optional(v.string()),
    referrer: v.optional(v.string()),
    requestFingerprint: v.string(),
  },
  returns: resultValidator,
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("quoteRequests")
      .withIndex("by_idempotency_key", (q) =>
        q.eq("idempotencyKey", args.idempotencyKey),
      )
      .unique();

    if (existing) {
      return { ok: true, duplicate: true, reference: existing.reference };
    }

    const globalLimit = await quoteRateLimiter.limit(
      ctx,
      "globalQuoteSubmissions",
    );
    if (!globalLimit.ok) {
      return {
        ok: false,
        limitedBy: "global" as const,
        retryAfter: globalLimit.retryAfter,
      };
    }

    const fingerprintLimit = await quoteRateLimiter.limit(
      ctx,
      "quoteSubmissionsByFingerprint",
      { key: args.requestFingerprint },
    );
    if (!fingerprintLimit.ok) {
      return {
        ok: false,
        limitedBy: "fingerprint" as const,
        retryAfter: fingerprintLimit.retryAfter,
      };
    }

    const emailLimit = await quoteRateLimiter.limit(
      ctx,
      "quoteSubmissionsByEmail",
      { key: args.email },
    );
    if (!emailLimit.ok) {
      return {
        ok: false,
        limitedBy: "email" as const,
        retryAfter: emailLimit.retryAfter,
      };
    }

    const now = Date.now();
    const compactId = args.idempotencyKey
      .replace(/[^a-z0-9]/gi, "")
      .slice(0, 8)
      .toUpperCase();
    const reference = `YABI-${compactId}`;

    await ctx.db.insert("quoteRequests", {
      reference,
      idempotencyKey: args.idempotencyKey,
      fullName: args.fullName,
      company: args.company,
      email: args.email,
      phone: args.phone,
      vehicle: args.vehicle,
      duration: args.duration,
      startDate: args.startDate,
      message: args.message,
      consentAt: args.consentAt,
      status: "new",
      source: "website",
      locale: "fr-BE",
      pageUrl: args.pageUrl,
      referrer: args.referrer,
      requestFingerprint: args.requestFingerprint,
      createdAt: now,
      updatedAt: now,
      emailStatus: "not_configured",
    });

    return { ok: true, duplicate: false, reference };
  },
});
