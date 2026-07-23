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
    rate: 5,
    period: HOUR,
    capacity: 5,
  },
  quoteSubmissionsByEmail: {
    kind: "fixed window",
    rate: 3,
    period: HOUR,
    capacity: 3,
  },
});
