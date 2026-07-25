import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

const vehicleValues = new Set([
  "l1h1",
  "master_l2h2_2023",
  "citroen_l2h2_2019",
  "l3h2",
  "fleet",
]);

const durationValues = new Set([
  "1_month",
  "2_months",
  "3_months",
  "4_6_months",
  "over_6_months",
]);

function allowedOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  const configured = (process.env.CLIENT_ORIGIN ??
    "https://yabi-location.pages.dev")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return configured.includes(origin) ? origin : "";
}

function corsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    Vary: "Origin",
  });
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  return headers;
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin),
  });
}

function cleanString(value: unknown, maximum: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maximum);
}

async function hashRequestFingerprint(request: Request): Promise<string> {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const ip =
    request.headers.get("cf-connecting-ip") ??
    forwarded ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const bytes = new TextEncoder().encode(`${ip}|${userAgent}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyTurnstile(
  token: string,
  request: Request,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const remoteIp =
    request.headers.get("cf-connecting-ip") ?? forwarded ?? undefined;
  const form = new FormData();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  const verification = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form },
  );
  if (!verification.ok) return false;

  const result = (await verification.json()) as { success?: boolean };
  return result.success === true;
}

const submitQuote = httpAction(async (ctx, request) => {
  const origin = allowedOrigin(request);
  if (origin === "") {
    return jsonResponse({ ok: false, error: "origin_not_allowed" }, 403, null);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ ok: false, error: "invalid_content_type" }, 415, origin);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 20_000) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413, origin);
  }

  const rawBody = await request.text();
  if (rawBody.length > 20_000) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413, origin);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400, origin);
  }

  if (cleanString(body.website, 200)) {
    return jsonResponse({ ok: true, reference: "YABI-RECEIVED" }, 200, origin);
  }

  const formStartedAt =
    typeof body.formStartedAt === "number" ? body.formStartedAt : 0;
  if (formStartedAt <= 0 || Date.now() - formStartedAt < 1_500) {
    return jsonResponse({ ok: false, error: "invalid_submission" }, 400, origin);
  }

  const idempotencyKey = cleanString(body.idempotencyKey, 80);
  const fullName = cleanString(body.fullName, 100);
  const company = cleanString(body.company, 120);
  const email = cleanString(body.email, 254).toLowerCase();
  const phone = cleanString(body.phone, 32);
  const vehicle = cleanString(body.vehicle, 40);
  const duration = cleanString(body.duration, 40);
  const startDate = cleanString(body.startDate, 10);
  const message = cleanString(body.message, 2_000);
  const pageUrl = cleanString(body.pageUrl, 500);
  const referrer = cleanString(body.referrer, 500);
  const consent = body.consent === true;
  const turnstileToken = cleanString(body.turnstileToken, 2_048);

  const emailLooksValid =
    email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneLooksValid = /^[+()0-9.\s/-]{7,32}$/.test(phone);
  const dateLooksValid =
    !startDate || /^\d{4}-\d{2}-\d{2}$/.test(startDate);

  if (
    idempotencyKey.length < 16 ||
    fullName.length < 2 ||
    !emailLooksValid ||
    !phoneLooksValid ||
    !vehicleValues.has(vehicle) ||
    !durationValues.has(duration) ||
    !dateLooksValid ||
    !consent
  ) {
    return jsonResponse({ ok: false, error: "validation_failed" }, 400, origin);
  }

  if (!(await verifyTurnstile(turnstileToken, request))) {
    return jsonResponse({ ok: false, error: "bot_verification_failed" }, 400, origin);
  }

  const requestFingerprint = await hashRequestFingerprint(request);
  const result = await ctx.runMutation(
    internal.quoteRequests.createFromWebsite,
    {
      idempotencyKey,
      fullName,
      company: company || undefined,
      email,
      phone,
      vehicle: vehicle as
        | "l1h1"
        | "master_l2h2_2023"
        | "citroen_l2h2_2019"
        | "l3h2"
        | "fleet",
      duration: duration as
        | "1_month"
        | "2_months"
        | "3_months"
        | "4_6_months"
        | "over_6_months",
      startDate: startDate || undefined,
      message: message || undefined,
      consentAt: Date.now(),
      pageUrl: pageUrl || undefined,
      referrer: referrer || undefined,
      requestFingerprint,
    },
  );

  if (!result.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "rate_limited",
        retryAfter: result.retryAfter,
      },
      429,
      origin,
    );
  }

  return jsonResponse(
    { ok: true, reference: result.reference, duplicate: result.duplicate },
    result.duplicate ? 200 : 201,
    origin,
  );
});

http.route({ path: "/api/quotes", method: "POST", handler: submitQuote });

http.route({
  path: "/api/quotes",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    const origin = allowedOrigin(request);
    if (!origin) return new Response(null, { status: origin === "" ? 403 : 204 });
    const headers = corsHeaders(origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
    return new Response(null, { status: 204, headers });
  }),
});

http.route({
  path: "/api/health",
  method: "GET",
  handler: httpAction(async () =>
    jsonResponse({ ok: true, service: "yabi-location-api" }, 200, null),
  ),
});

export default http;
