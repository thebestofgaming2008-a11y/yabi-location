import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

export const quoteRateLimiter = new RateLimiter(components.rateLimiter, {
  globalQuoteSubmissions: {
    kind: "token bucket",
    rate: 300,
    period: MINUTE,
    capacity: 600,
    shards: 20,
  },
  quoteSubmissionsByFingerprint: {
    kind: "fixed window",
    rate: 20,
    period: HOUR,
    capacity: 20,
  },
  quoteSubmissionsByEmail: {
    kind: "fixed window",
    rate: 10,
    period: HOUR,
    capacity: 10,
  },
});

export const portalRateLimiter = new RateLimiter(components.rateLimiter, {
  portalLoginGlobal: {
    kind: "token bucket",
    rate: 200,
    period: MINUTE,
    capacity: 300,
    shards: 10,
  },
  portalLoginByFingerprint: {
    kind: "fixed window",
    rate: 8,
    period: 15 * MINUTE,
    capacity: 8,
  },
  applicationStartByFingerprint: {
    kind: "fixed window",
    rate: 20,
    period: HOUR,
    capacity: 20,
  },
  applicationUploadsByApplication: {
    kind: "fixed window",
    rate: 120,
    period: HOUR,
    capacity: 120,
  },
});
