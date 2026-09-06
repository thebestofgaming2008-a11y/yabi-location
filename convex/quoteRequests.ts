import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { durationValidator, vehicleValidator } from "./schema";
import { quoteRateLimiter } from "./rateLimits";

const resultValidator = v.object({
  ok: v.boolean(),
  duplicate: v.optional(v.boolean()),
  quoteRequestId: v.optional(v.id("quoteRequests")),
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
      return {
        ok: true,
        duplicate: true,
        quoteRequestId: existing._id,
        reference: existing.reference,
      };
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

    const quoteRequestId = await ctx.db.insert("quoteRequests", {
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
      emailStatus: "pending",
    });

    return {
      ok: true,
      duplicate: false,
      quoteRequestId,
      reference,
    };
  },
});

export const getForEmail = internalQuery({
  args: { quoteRequestId: v.id("quoteRequests") },
  returns: v.union(
    v.null(),
    v.object({
      reference: v.string(),
      fullName: v.string(),
      company: v.optional(v.string()),
      email: v.string(),
      phone: v.string(),
      vehicle: vehicleValidator,
      duration: durationValidator,
      startDate: v.optional(v.string()),
      message: v.optional(v.string()),
      createdAt: v.number(),
      emailStatus: v.union(
        v.literal("not_configured"),
        v.literal("pending"),
        v.literal("sent"),
        v.literal("failed"),
      ),
    }),
  ),
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) return null;
    return {
      reference: request.reference,
      fullName: request.fullName,
      company: request.company,
      email: request.email,
      phone: request.phone,
      vehicle: request.vehicle,
      duration: request.duration,
      startDate: request.startDate,
      message: request.message,
      createdAt: request.createdAt,
      emailStatus: request.emailStatus,
    };
  },
});

export const setEmailStatus = internalMutation({
  args: {
    quoteRequestId: v.id("quoteRequests"),
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
    await ctx.db.patch(args.quoteRequestId, {
      emailStatus: args.emailStatus,
      emailProviderId: args.emailProviderId,
      emailLastError: args.emailLastError,
      emailAttemptedAt: args.emailAttemptedAt,
      updatedAt: Date.now(),
    });
    return null;
  },
});
