import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { httpAction, type ActionCtx } from "./_generated/server";

const allowedRoles = new Set([
  "admin",
  "employee",
  "customer",
  "mechanic",
  "contractor",
]);
const allowedFormats = new Set(["l1h1", "l2h2", "l3h2"]);
const allowedVehicleStatuses = new Set([
  "available",
  "reserved",
  "rented",
  "maintenance",
  "cleaning",
  "inactive",
]);
const allowedRentalStatuses = new Set([
  "draft",
  "scheduled",
  "active",
  "returned",
  "closed",
  "cancelled",
]);
const allowedWorkflowTypes = new Set([
  "customer_onboarding",
  "check_in",
  "check_out",
  "wash",
  "maintenance",
  "handover_take",
  "handover_return",
  "report",
]);
const allowedMediaCategories = new Set([
  "vehicle_exterior",
  "vehicle_interior",
  "before",
  "after",
  "license_plate",
  "person",
  "selfie",
  "signature",
  "damage",
  "maintenance",
  "other",
]);
const allowedReportCategories = new Set([
  "damage",
  "mechanical",
  "administrative",
  "request",
  "other",
]);
const allowedPriorities = new Set(["low", "normal", "urgent"]);
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

type JsonBody = Record<string, unknown>;

function originFor(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const configured = (process.env.CLIENT_ORIGIN ?? "https://yabi-location.pages.dev")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.includes(origin) ? origin : "";
}

function responseHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    Vary: "Origin",
  });
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  return headers;
}

function json(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(origin),
  });
}

function clean(value: unknown, maximum = 500): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maximum);
}

function optionalString(value: unknown, maximum = 500): string | undefined {
  const result = clean(value, maximum);
  return result || undefined;
}

function boundedNumber(
  value: unknown,
  minimum: number,
  maximum: number,
): number | undefined {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number) || number < minimum || number > maximum) {
    return undefined;
  }
  return number;
}

function normalizeCode(value: unknown): string {
  const normalized = clean(value, 80)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  return normalized.startsWith("YABI") ? normalized.slice(4) : normalized;
}

function normalizePlate(value: unknown): string {
  return clean(value, 20).toUpperCase().replace(/\s+/g, "");
}

function randomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function base64Url(input: Uint8Array | string): string {
  const bytes =
    typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function generateAccessCode(): { formatted: string; normalized: string } {
  const bytes = randomBytes(12);
  let normalized = "";
  for (const byte of bytes) normalized += codeAlphabet[byte % codeAlphabet.length];
  return {
    normalized,
    formatted: `YABI-${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8)}`,
  };
}

async function hmac(value: string, secretName: string): Promise<string> {
  const secret = process.env[secretName];
  if (!secret || secret.length < 32) throw new Error(`${secretName}_missing`);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return base64Url(new Uint8Array(signature));
}

async function codeHash(code: string): Promise<string> {
  return hmac(`code:${code}`, "PORTAL_ACCESS_PEPPER");
}

async function tokenHash(token: string): Promise<string> {
  return hmac(`session:${token}`, "PORTAL_ACCESS_PEPPER");
}

async function fingerprint(request: Request): Promise<string> {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const ip =
    request.headers.get("cf-connecting-ip") ??
    forwarded ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${ip}|${userAgent}`),
  );
  return base64Url(new Uint8Array(digest));
}

async function parseBody(request: Request): Promise<JsonBody> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new Error("invalid_content_type");
  }
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > 100_000) throw new Error("payload_too_large");
  const text = await request.text();
  if (text.length > 100_000) throw new Error("payload_too_large");
  const value = JSON.parse(text) as unknown;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("invalid_json");
  }
  return value as JsonBody;
}

function bearer(request: Request): string {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+([A-Za-z0-9_-]{32,200})$/.exec(header);
  return match?.[1] ?? "";
}

async function requireSession(
  ctx: ActionCtx,
  request: Request,
) {
  const token = bearer(request);
  if (!token) throw new Error("unauthorized");
  const session = await ctx.runQuery(internal.portal.getSessionContext, {
    tokenHash: await tokenHash(token),
    now: Date.now(),
  });
  if (!session) throw new Error("unauthorized");
  return { ...session, rawToken: token };
}

function safeError(error: unknown): string {
  const message = error instanceof Error ? error.message : "request_failed";
  const known = new Set([
    "unauthorized",
    "forbidden",
    "forbidden_workflow",
    "validation_failed",
    "invalid_content_type",
    "payload_too_large",
    "invalid_json",
    "account_not_found",
    "customer_not_found",
    "customer_already_linked",
    "customer_link_required",
    "customer_not_linked",
    "vehicle_not_found",
    "vehicle_exists",
    "vehicle_unavailable",
    "vehicle_has_open_rental",
    "rental_not_found",
    "rental_mismatch",
    "rental_reference_exists",
    "record_not_found",
    "report_not_found",
    "invalid_file_size",
    "invalid_file_type",
    "invalid_media",
    "too_many_files",
    "vehicle_required",
    "rental_required",
    "mileage_required",
    "description_required",
    "maintenance_details_required",
    "inspection_media_required",
    "before_after_media_required",
    "cannot_deactivate_self",
    "code_collision",
    "media_service_unavailable",
    "portal_not_configured",
  ]);
  return known.has(message) ? message : "request_failed";
}

function statusFor(error: string): number {
  if (error === "unauthorized") return 401;
  if (error === "forbidden" || error === "forbidden_workflow") return 403;
  if (error === "payload_too_large") return 413;
  if (error === "invalid_content_type") return 415;
  if (error.endsWith("_unavailable") || error.endsWith("_not_configured")) {
    return 503;
  }
  return 400;
}

async function mediaToken(payload: Record<string, unknown>): Promise<string> {
  const encoded = base64Url(JSON.stringify(payload));
  const signature = await hmac(encoded, "MEDIA_SIGNING_SECRET");
  return `${encoded}.${signature}`;
}

export const portalOptions = httpAction(async (_, request) => {
  const origin = originFor(request);
  if (origin === "") return new Response(null, { status: 403 });
  const headers = responseHeaders(origin);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, X-Yabi-Callback-Secret",
  );
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(null, { status: 204, headers });
});

export const portalLogin = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const body = await parseBody(request);
    const normalized = normalizeCode(body.code);
    if (normalized.length !== 12) {
      return json({ ok: false, error: "invalid_credentials" }, 401, origin);
    }

    const rawToken = base64Url(randomBytes(32));
    const userAgent = request.headers.get("user-agent") ?? "";
    const userAgentHash = userAgent
      ? await hmac(userAgent.slice(0, 500), "PORTAL_ACCESS_PEPPER")
      : undefined;
    const result = await ctx.runMutation(internal.portal.loginWithCode, {
      codeHash: await codeHash(normalized),
      tokenHash: await tokenHash(rawToken),
      fingerprint: await fingerprint(request),
      userAgentHash,
    });
    if (!result.ok) {
      const status = result.reason === "rate_limited" ? 429 : 401;
      return json(
        {
          ok: false,
          error:
            result.reason === "rate_limited"
              ? "rate_limited"
              : "invalid_credentials",
          retryAfter: result.retryAfter,
        },
        status,
        origin,
      );
    }
    return json(
      { ok: true, token: rawToken, account: result.account },
      200,
      origin,
    );
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalLogout = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const token = bearer(request);
    if (token) {
      await ctx.runMutation(internal.portal.revokeSession, {
        tokenHash: await tokenHash(token),
      });
    }
    return json({ ok: true }, 200, origin);
  } catch {
    return json({ ok: true }, 200, origin);
  }
});

export const portalData = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const data = await ctx.runQuery(internal.portal.getPortalData, {
      actorAccountId: session.account.id,
    });
    return json({ ok: true, data }, 200, origin);
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalBootstrap = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const configuredSecret = process.env.PORTAL_BOOTSTRAP_SECRET;
    const suppliedSecret = request.headers.get("x-yabi-bootstrap-secret") ?? "";
    if (
      !configuredSecret ||
      configuredSecret.length < 32 ||
      (await hmac(suppliedSecret, "PORTAL_ACCESS_PEPPER")) !==
        (await hmac(configuredSecret, "PORTAL_ACCESS_PEPPER"))
    ) {
      return json({ ok: false, error: "unauthorized" }, 401, origin);
    }
    const body = await parseBody(request);
    const access = generateAccessCode();
    const result = await ctx.runMutation(internal.portal.bootstrapAdmin, {
      displayName: clean(body.displayName, 100) || "YABI Administrator",
      codeHash: await codeHash(access.normalized),
      codeHint: access.normalized.slice(-4),
    });
    return json(
      {
        ok: true,
        created: result.created,
        accountId: result.accountId,
        accessCode: result.created ? access.formatted : undefined,
      },
      result.created ? 201 : 200,
      origin,
    );
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalAdmin = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const body = await parseBody(request);
    const operation = clean(body.operation, 50);

    if (operation === "create_account") {
      const role = clean(body.role, 20);
      const displayName = clean(body.displayName, 100);
      if (!displayName || !allowedRoles.has(role)) throw new Error("validation_failed");
      const access = generateAccessCode();
      const accountId = await ctx.runMutation(internal.portal.createAccount, {
        actorAccountId: session.account.id,
        displayName,
        role: role as "admin" | "employee" | "customer" | "mechanic" | "contractor",
        codeHash: await codeHash(access.normalized),
        codeHint: access.normalized.slice(-4),
        linkedCustomerId: optionalString(body.linkedCustomerId, 80) as
          | Id<"customers">
          | undefined,
      });
      return json(
        { ok: true, accountId, accessCode: access.formatted },
        201,
        origin,
      );
    }

    if (operation === "rotate_code") {
      const targetAccountId = clean(body.targetAccountId, 80);
      if (!targetAccountId) throw new Error("validation_failed");
      const access = generateAccessCode();
      await ctx.runMutation(internal.portal.rotateAccountCode, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
        codeHash: await codeHash(access.normalized),
        codeHint: access.normalized.slice(-4),
      });
      return json({ ok: true, accessCode: access.formatted }, 200, origin);
    }

    if (operation === "set_account_active") {
      const targetAccountId = clean(body.targetAccountId, 80);
      if (!targetAccountId || typeof body.active !== "boolean") {
        throw new Error("validation_failed");
      }
      await ctx.runMutation(internal.portal.setAccountActive, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
        active: body.active,
      });
      return json({ ok: true }, 200, origin);
    }

    if (operation === "create_customer") {
      const fullName = clean(body.fullName, 100);
      const email = clean(body.email, 254).toLowerCase();
      const phone = clean(body.phone, 40);
      if (!fullName || !email || !phone) throw new Error("validation_failed");
      const customerId = await ctx.runMutation(internal.portal.createCustomer, {
        actorAccountId: session.account.id,
        fullName,
        company: optionalString(body.company, 120),
        email,
        phone,
        notes: optionalString(body.notes, 2000),
      });
      return json({ ok: true, customerId }, 201, origin);
    }

    if (operation === "create_vehicle") {
      const registrationPlate = normalizePlate(body.registrationPlate);
      const make = clean(body.make, 80);
      const model = clean(body.model, 80);
      const format = clean(body.format, 10);
      const color = clean(body.color, 50);
      const year = boundedNumber(body.year, 1990, 2100);
      const currentMileage = boundedNumber(body.currentMileage, 0, 2_000_000);
      const fuelPercent = boundedNumber(body.fuelPercent, 0, 100);
      if (
        !registrationPlate ||
        !make ||
        !model ||
        !color ||
        !allowedFormats.has(format) ||
        year === undefined ||
        currentMileage === undefined
      ) {
        throw new Error("validation_failed");
      }
      const vehicleId = await ctx.runMutation(internal.portal.createVehicle, {
        actorAccountId: session.account.id,
        registrationPlate,
        make,
        model,
        year,
        format: format as "l1h1" | "l2h2" | "l3h2",
        color,
        vin: optionalString(body.vin, 40),
        currentMileage,
        fuelPercent,
        notes: optionalString(body.notes, 2000),
      });
      return json({ ok: true, vehicleId }, 201, origin);
    }

    if (operation === "create_rental") {
      const customerId = clean(body.customerId, 80);
      const vehicleId = clean(body.vehicleId, 80);
      const startDate = clean(body.startDate, 10);
      const monthlyPriceCents = boundedNumber(
        body.monthlyPriceCents,
        0,
        100_000_000,
      );
      if (!customerId || !vehicleId || !startDate || monthlyPriceCents === undefined) {
        throw new Error("validation_failed");
      }
      const reference = `YR-${new Date().getUTCFullYear()}-${base64Url(randomBytes(5)).toUpperCase().slice(0, 7)}`;
      const rentalId = await ctx.runMutation(internal.portal.createRental, {
        actorAccountId: session.account.id,
        reference,
        customerId: customerId as Id<"customers">,
        vehicleId: vehicleId as Id<"operationalVehicles">,
        startDate,
        expectedEndDate: optionalString(body.expectedEndDate, 10),
        monthlyPriceCents,
        depositCents: boundedNumber(body.depositCents, 0, 100_000_000),
        mileageAllowance: boundedNumber(body.mileageAllowance, 0, 10_000_000),
        notes: optionalString(body.notes, 2000),
      });
      return json({ ok: true, rentalId, reference }, 201, origin);
    }

    if (operation === "update_vehicle_status") {
      const vehicleId = clean(body.vehicleId, 80);
      const status = clean(body.status, 20);
      if (!vehicleId || !allowedVehicleStatuses.has(status)) {
        throw new Error("validation_failed");
      }
      await ctx.runMutation(internal.portal.updateVehicleStatus, {
        actorAccountId: session.account.id,
        vehicleId: vehicleId as Id<"operationalVehicles">,
        status: status as
          | "available"
          | "reserved"
          | "rented"
          | "maintenance"
          | "cleaning"
          | "inactive",
      });
      return json({ ok: true }, 200, origin);
    }

    if (operation === "update_rental_status") {
      const rentalId = clean(body.rentalId, 80);
      const status = clean(body.status, 20);
      if (!rentalId || !allowedRentalStatuses.has(status)) {
        throw new Error("validation_failed");
      }
      await ctx.runMutation(internal.portal.updateRentalStatus, {
        actorAccountId: session.account.id,
        rentalId: rentalId as Id<"rentals">,
        status: status as
          | "draft"
          | "scheduled"
          | "active"
          | "returned"
          | "closed"
          | "cancelled",
      });
      return json({ ok: true }, 200, origin);
    }

    if (operation === "resolve_report") {
      const recordId = clean(body.recordId, 80);
      const resolution = clean(body.resolution, 2000);
      if (!recordId || !resolution) throw new Error("validation_failed");
      await ctx.runMutation(internal.portal.resolveReport, {
        actorAccountId: session.account.id,
        recordId: recordId as Id<"workflowRecords">,
        resolution,
      });
      return json({ ok: true }, 200, origin);
    }

    throw new Error("validation_failed");
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalProfile = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const body = await parseBody(request);
    const fullName = clean(body.fullName, 100);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const address = clean(body.address, 200);
    const postalCode = clean(body.postalCode, 20);
    const city = clean(body.city, 80);
    const drivingLicenseNumber = clean(body.drivingLicenseNumber, 60);
    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !postalCode ||
      !city ||
      !drivingLicenseNumber
    ) {
      throw new Error("validation_failed");
    }
    const customerId = await ctx.runMutation(
      internal.portal.updateOwnCustomerProfile,
      {
        actorAccountId: session.account.id,
        fullName,
        company: optionalString(body.company, 120),
        email,
        phone,
        address,
        postalCode,
        city,
        drivingLicenseNumber,
        emergencyContact: optionalString(body.emergencyContact, 200),
      },
    );
    return json({ ok: true, customerId }, 200, origin);
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalUpload = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const workerUrl = process.env.MEDIA_WORKER_URL?.replace(/\/+$/, "");
    if (!workerUrl) throw new Error("media_service_unavailable");
    const body = await parseBody(request);
    const fileName = clean(body.fileName, 180);
    const contentType = clean(body.contentType, 80).toLowerCase();
    const category = clean(body.category, 40);
    const uploadGroupId = clean(body.uploadGroupId, 80);
    const size = boundedNumber(body.size, 1, 8_000_000);
    if (
      !fileName ||
      !uploadGroupId ||
      !allowedImageTypes.has(contentType) ||
      !allowedMediaCategories.has(category) ||
      size === undefined
    ) {
      throw new Error("validation_failed");
    }
    const extension =
      contentType === "image/png"
        ? "png"
        : contentType === "image/webp"
          ? "webp"
          : "jpg";
    const r2Key = `portal/${new Date().toISOString().slice(0, 10)}/${String(session.account.id)}/${base64Url(randomBytes(18))}.${extension}`;
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const mediaId = await ctx.runMutation(internal.portal.createPendingMedia, {
      actorAccountId: session.account.id,
      r2Key,
      uploadGroupId,
      fileName,
      contentType,
      size,
      category: category as
        | "vehicle_exterior"
        | "vehicle_interior"
        | "before"
        | "after"
        | "license_plate"
        | "person"
        | "selfie"
        | "signature"
        | "damage"
        | "maintenance"
        | "other",
      expiresAt,
    });
    const token = await mediaToken({
      op: "put",
      key: r2Key,
      mediaId: String(mediaId),
      contentType,
      size,
      exp: expiresAt,
    });
    return json(
      {
        ok: true,
        mediaId,
        uploadUrl: `${workerUrl}/object/${encodeURIComponent(r2Key)}?token=${encodeURIComponent(token)}`,
        expiresAt,
      },
      201,
      origin,
    );
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalMediaCallback = httpAction(async (ctx, request) => {
  try {
    const supplied = request.headers.get("x-yabi-callback-secret") ?? "";
    const configured = process.env.MEDIA_CALLBACK_SECRET ?? "";
    if (
      !supplied ||
      !configured ||
      (await hmac(supplied, "PORTAL_ACCESS_PEPPER")) !==
        (await hmac(configured, "PORTAL_ACCESS_PEPPER"))
    ) {
      return json({ ok: false, error: "unauthorized" }, 401, null);
    }
    const body = await parseBody(request);
    const r2Key = clean(body.r2Key, 500);
    const size = boundedNumber(body.size, 1, 8_000_000);
    if (!r2Key || size === undefined) throw new Error("validation_failed");
    let updated = await ctx.runMutation(internal.portal.markMediaUploaded, {
      r2Key,
      size,
      etag: optionalString(body.etag, 200),
    });
    if (!updated) {
      updated = await ctx.runMutation(
        internal.applications.markDocumentUploaded,
        {
          r2Key,
          size,
          etag: optionalString(body.etag, 200),
        },
      );
    }
    return json({ ok: updated }, updated ? 200 : 409, null);
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), null);
  }
});

export const portalWorkflow = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const body = await parseBody(request);
    const type = clean(body.type, 40);
    const uploadGroupId = clean(body.uploadGroupId, 80);
    const mediaIds = Array.isArray(body.mediaIds)
      ? body.mediaIds
          .map((value) => clean(value, 80))
          .filter(Boolean)
          .slice(0, 24)
      : [];
    if (!allowedWorkflowTypes.has(type) || !uploadGroupId) {
      throw new Error("validation_failed");
    }
    const reportCategory = optionalString(body.reportCategory, 30);
    const reportPriority = optionalString(body.reportPriority, 20);
    if (reportCategory && !allowedReportCategories.has(reportCategory)) {
      throw new Error("validation_failed");
    }
    if (reportPriority && !allowedPriorities.has(reportPriority)) {
      throw new Error("validation_failed");
    }
    const reference = `OP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${base64Url(randomBytes(5)).toUpperCase().slice(0, 7)}`;
    const result = await ctx.runMutation(internal.portal.createWorkflowRecord, {
      actorAccountId: session.account.id,
      reference,
      type: type as
        | "customer_onboarding"
        | "check_in"
        | "check_out"
        | "wash"
        | "maintenance"
        | "handover_take"
        | "handover_return"
        | "report",
      uploadGroupId,
      mediaIds: mediaIds as Id<"mediaAssets">[],
      vehicleId: optionalString(body.vehicleId, 80) as
        | Id<"operationalVehicles">
        | undefined,
      customerId: optionalString(body.customerId, 80) as
        | Id<"customers">
        | undefined,
      rentalId: optionalString(body.rentalId, 80) as Id<"rentals"> | undefined,
      occurredAt:
        boundedNumber(body.occurredAt, 1_600_000_000_000, 4_000_000_000_000) ??
        Date.now(),
      mileage: boundedNumber(body.mileage, 0, 2_000_000),
      mileageAfter: boundedNumber(body.mileageAfter, 0, 2_000_000),
      fuelPercent: boundedNumber(body.fuelPercent, 0, 100),
      personName: optionalString(body.personName, 100),
      maintenanceWork: optionalString(body.maintenanceWork, 4000),
      changesMade: optionalString(body.changesMade, 4000),
      reportCategory: reportCategory as
        | "damage"
        | "mechanical"
        | "administrative"
        | "request"
        | "other"
        | undefined,
      reportPriority: reportPriority as
        | "low"
        | "normal"
        | "urgent"
        | undefined,
      description: optionalString(body.description, 4000),
    });
    return json({ ok: true, ...result }, 201, origin);
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalRecordMedia = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const workerUrl = process.env.MEDIA_WORKER_URL?.replace(/\/+$/, "");
    if (!workerUrl) throw new Error("media_service_unavailable");
    const body = await parseBody(request);
    const recordId = clean(body.recordId, 80);
    if (!recordId) throw new Error("validation_failed");
    const media = await ctx.runQuery(internal.portal.getRecordMedia, {
      actorAccountId: session.account.id,
      recordId: recordId as Id<"workflowRecords">,
    });
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const items = await Promise.all(
      media.map(async (item) => ({
        id: item.id,
        fileName: item.fileName,
        contentType: item.contentType,
        category: item.category,
        url: `${workerUrl}/object/${encodeURIComponent(item.r2Key)}?token=${encodeURIComponent(
          await mediaToken({ op: "get", key: item.r2Key, exp: expiresAt }),
        )}`,
      })),
    );
    return json({ ok: true, items, expiresAt }, 200, origin);
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});
