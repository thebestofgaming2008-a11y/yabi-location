import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { httpAction, type ActionCtx } from "./_generated/server";
import {
  maintenanceInterventionTypes,
  maintenanceItemCodes,
} from "./maintenanceCatalog";

const allowedRoles = new Set([
  "admin",
  "employee",
  "customer",
  "driver",
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
const allowedCustomerStatuses = new Set(["lead", "active", "inactive"]);
const allowedBelgianProvinces = new Set([
  "antwerp", "east_flanders", "flemish_brabant", "hainaut", "liege",
  "limburg", "luxembourg", "namur", "walloon_brabant", "west_flanders", "brussels_capital",
]);
const allowedWorkflowTypes = new Set([
  "customer_onboarding",
  "check_in",
  "check_out",
  "wash",
  "maintenance",
  "handover_take",
  "handover_return",
  "breakdown_replacement",
  "vehicle_transfer",
  "report",
  "problem_report",
  "accident_report",
  "payment_proof",
  "monthly_inspection",
]);
const allowedDispositions = new Set(["self", "towing", "mechanic", "other"]);
const allowedAccidentLiabilities = new Set(["at_fault", "not_at_fault"]);
const allowedMaintenanceInterventionTypes = new Set<string>(maintenanceInterventionTypes);
const allowedMaintenanceItemCodes = new Set<string>(maintenanceItemCodes);
const allowedCaptureSources = new Set(["camera", "gallery", "signature"]);
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
  "accident",
  "payment",
  "inspection",
  "driver_document",
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
const allowedRecordStatuses = new Set(["submitted", "resolved"]);
const allowedUploadTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
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

function base64UrlBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function accessCodeVaultKey(): Promise<CryptoKey> {
  const pepper = process.env.PORTAL_ACCESS_PEPPER;
  if (!pepper || pepper.length < 32) throw new Error("portal_not_configured");
  const material = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`portal-access-vault:${pepper}`),
  );
  return crypto.subtle.importKey("raw", material, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

async function encryptAccessCode(code: string): Promise<{ ciphertext: string; iv: string }> {
  const iv = randomBytes(12);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv.buffer.slice(0) as ArrayBuffer },
    await accessCodeVaultKey(),
    new TextEncoder().encode(code),
  );
  return {
    ciphertext: base64Url(new Uint8Array(ciphertext)),
    iv: base64Url(iv),
  };
}

async function decryptAccessCode(ciphertext: string, iv: string): Promise<string> {
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64UrlBytes(iv).buffer.slice(0) as ArrayBuffer },
    await accessCodeVaultKey(),
    base64UrlBytes(ciphertext).buffer.slice(0) as ArrayBuffer,
  );
  const value = new TextDecoder().decode(plaintext);
  if (!/^YABI-(?:[A-Z0-9]{4}-){2}[A-Z0-9]{4}$/.test(value)) {
    throw new Error("code_recovery_unavailable");
  }
  return value;
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
    "driver_not_found",
    "driver_not_linked",
    "driver_link_required",
    "driver_already_linked",
    "driver_customer_mismatch",
    "driver_documents_required",
    "driver_eligibility_failed",
    "vehicle_not_found",
    "vehicle_exists",
    "vehicle_unavailable",
    "vehicle_has_open_rental",
    "vehicle_has_rental_history",
    "rental_not_found",
    "rental_mismatch",
    "rental_reference_exists",
    "active_rental_cannot_be_removed",
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
    "invalid_maintenance_items",
    "accident_details_required",
    "payment_details_required",
    "inspection_details_required",
    "inspection_already_submitted",
    "inspection_media_required",
    "before_after_media_required",
    "operation_details_required",
    "required_evidence_missing",
    "cannot_deactivate_self",
    "cannot_change_self_role",
    "cannot_remove_self",
    "last_admin_required",
    "resolution_required",
    "code_collision",
    "code_recovery_unavailable",
    "media_service_unavailable",
    "portal_not_configured",
  ]);
  if (known.has(message)) return message;
  const wrapped = /(?:^|\n)Uncaught Error: ([a-z_]+)(?:\n|$)/.exec(message)?.[1];
  return wrapped && known.has(wrapped) ? wrapped : "request_failed";
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
    const vault = await encryptAccessCode(access.formatted);
    const result = await ctx.runMutation(internal.portal.bootstrapAdmin, {
      displayName: clean(body.displayName, 100) || "YABI Administrator",
      codeHash: await codeHash(access.normalized),
      codeHint: access.normalized.slice(-4),
      accessCodeCiphertext: vault.ciphertext,
      accessCodeIv: vault.iv,
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
      const vault = await encryptAccessCode(access.formatted);
      const workflowAccess = Array.isArray(body.allowedWorkflowTypes)
        ? [...new Set(body.allowedWorkflowTypes.map((item) => clean(item, 40)).filter((item) => allowedWorkflowTypes.has(item)))].slice(0, 12)
        : undefined;
      const accountId = await ctx.runMutation(internal.portal.createAccount, {
        actorAccountId: session.account.id,
        displayName,
        role: role as "admin" | "employee" | "customer" | "driver" | "mechanic" | "contractor",
        codeHash: await codeHash(access.normalized),
        codeHint: access.normalized.slice(-4),
        accessCodeCiphertext: vault.ciphertext,
        accessCodeIv: vault.iv,
        linkedCustomerId: optionalString(body.linkedCustomerId, 80) as
          | Id<"customers">
          | undefined,
        linkedDriverId: optionalString(body.linkedDriverId, 80) as
          | Id<"customerDrivers">
          | undefined,
        allowedWorkflowTypes: workflowAccess as
          | Array<"customer_onboarding" | "check_in" | "check_out" | "wash" | "maintenance" | "handover_take" | "handover_return" | "breakdown_replacement" | "vehicle_transfer" | "report" | "problem_report" | "accident_report" | "payment_proof" | "monthly_inspection">
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
      const vault = await encryptAccessCode(access.formatted);
      await ctx.runMutation(internal.portal.rotateAccountCode, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
        codeHash: await codeHash(access.normalized),
        codeHint: access.normalized.slice(-4),
        accessCodeCiphertext: vault.ciphertext,
        accessCodeIv: vault.iv,
      });
      return json({ ok: true, accessCode: access.formatted }, 200, origin);
    }

    if (operation === "save_current_code") {
      const targetAccountId = clean(body.targetAccountId, 80);
      const normalized = normalizeCode(body.accessCode);
      if (!targetAccountId || normalized.length !== 12) {
        throw new Error("validation_failed");
      }
      const target = await ctx.runQuery(internal.portal.getAccountCodeHashForAdmin, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
      });
      if (!target || target.codeHash !== await codeHash(normalized)) {
        throw new Error("invalid_credentials");
      }
      const formatted = `YABI-${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8)}`;
      const encrypted = await encryptAccessCode(formatted);
      await ctx.runMutation(internal.portal.saveAccountAccessCode, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
        accessCodeCiphertext: encrypted.ciphertext,
        accessCodeIv: encrypted.iv,
      });
      return json({ ok: true, accessCode: formatted }, 200, origin);
    }

    if (operation === "reveal_code") {
      const targetAccountId = clean(body.targetAccountId, 80);
      if (!targetAccountId) throw new Error("validation_failed");
      const vault = await ctx.runQuery(internal.portal.getAccountAccessCodeVault, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
      });
      if (!vault) throw new Error("code_recovery_unavailable");
      return json(
        { ok: true, accessCode: await decryptAccessCode(vault.accessCodeCiphertext, vault.accessCodeIv) },
        200,
        origin,
      );
    }

    if (operation === "update_account") {
      const targetAccountId = clean(body.targetAccountId, 80);
      const displayName = clean(body.displayName, 100);
      const role = clean(body.role, 20);
      if (
        !targetAccountId || !displayName || !allowedRoles.has(role) ||
        typeof body.active !== "boolean"
      ) {
        throw new Error("validation_failed");
      }
      const workflowAccess = Array.isArray(body.allowedWorkflowTypes)
        ? [...new Set(body.allowedWorkflowTypes.map((item) => clean(item, 40)).filter((item) => allowedWorkflowTypes.has(item)))].slice(0, 16)
        : undefined;
      await ctx.runMutation(internal.portal.updateAccount, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
        displayName,
        role: role as "admin" | "employee" | "customer" | "driver" | "mechanic" | "contractor",
        active: body.active,
        linkedCustomerId: optionalString(body.linkedCustomerId, 80) as
          | Id<"customers">
          | undefined,
        allowedWorkflowTypes: workflowAccess as
          | Array<"customer_onboarding" | "check_in" | "check_out" | "wash" | "maintenance" | "handover_take" | "handover_return" | "breakdown_replacement" | "vehicle_transfer" | "report" | "problem_report" | "accident_report" | "payment_proof" | "monthly_inspection">
          | undefined,
      });
      return json({ ok: true }, 200, origin);
    }

    if (operation === "remove_account") {
      const targetAccountId = clean(body.targetAccountId, 80);
      if (!targetAccountId) throw new Error("validation_failed");
      await ctx.runMutation(internal.portal.removeAccount, {
        actorAccountId: session.account.id,
        targetAccountId: targetAccountId as Id<"portalAccounts">,
      });
      return json({ ok: true }, 200, origin);
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

    if (operation === "update_customer") {
      const customerId = clean(body.customerId, 80);
      const fullName = clean(body.fullName, 100);
      const email = clean(body.email, 254).toLowerCase();
      const phone = clean(body.phone, 40);
      const status = clean(body.status, 20);
      const province = clean(body.province, 30);
      if (
        !customerId ||
        !fullName ||
        !email ||
        !phone ||
        !allowedCustomerStatuses.has(status)
      ) {
        throw new Error("validation_failed");
      }
      await ctx.runMutation(internal.portal.updateCustomer, {
        actorAccountId: session.account.id,
        customerId: customerId as Id<"customers">,
        fullName,
        company: optionalString(body.company, 120),
        companyVatNumber: optionalString(body.companyVatNumber, 40),
        email,
        phone,
        address: optionalString(body.address, 300),
        street: optionalString(body.street, 160),
        houseNumber: optionalString(body.houseNumber, 20),
        addressBox: optionalString(body.addressBox, 20),
        postalCode: optionalString(body.postalCode, 20),
        city: optionalString(body.city, 80),
        province: allowedBelgianProvinces.has(province)
          ? province as "antwerp" | "east_flanders" | "flemish_brabant" | "hainaut" | "liege" | "limburg" | "luxembourg" | "namur" | "walloon_brabant" | "west_flanders" | "brussels_capital"
          : undefined,
        identityCardNumber: optionalString(body.identityCardNumber, 80),
        nationalRegisterNumber: optionalString(body.nationalRegisterNumber, 40),
        drivingLicenseNumber: optionalString(body.drivingLicenseNumber, 80),
        emergencyContact: optionalString(body.emergencyContact, 200),
        notes: optionalString(body.notes, 2000),
        status: status as "lead" | "active" | "inactive",
      });
      return json({ ok: true }, 200, origin);
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

    if (operation === "update_vehicle" || operation === "remove_vehicle") {
      const vehicleId = clean(body.vehicleId, 80);
      if (!vehicleId) throw new Error("validation_failed");
      if (operation === "remove_vehicle") {
        await ctx.runMutation(internal.portal.removeVehicle, { actorAccountId: session.account.id, vehicleId: vehicleId as Id<"operationalVehicles"> });
      } else {
        const registrationPlate = normalizePlate(body.registrationPlate); const make = clean(body.make, 80); const model = clean(body.model, 80); const format = clean(body.format, 10); const color = clean(body.color, 50); const status = clean(body.status, 20); const year = boundedNumber(body.year, 1990, 2100); const currentMileage = boundedNumber(body.currentMileage, 0, 2_000_000);
        if (!registrationPlate || !make || !model || !color || !allowedFormats.has(format) || !allowedVehicleStatuses.has(status) || year === undefined || currentMileage === undefined) throw new Error("validation_failed");
        await ctx.runMutation(internal.portal.updateVehicle, { actorAccountId: session.account.id, vehicleId: vehicleId as Id<"operationalVehicles">, registrationPlate, make, model, year, format: format as "l1h1"|"l2h2"|"l3h2", color, vin: optionalString(body.vin, 40), status: status as "available"|"reserved"|"rented"|"maintenance"|"cleaning"|"inactive", currentMileage, fuelPercent: boundedNumber(body.fuelPercent, 0, 100), notes: optionalString(body.notes, 2000) });
      }
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

    if (operation === "update_rental" || operation === "remove_rental") {
      const rentalId = clean(body.rentalId, 80); if (!rentalId) throw new Error("validation_failed");
      if (operation === "remove_rental") {
        await ctx.runMutation(internal.portal.removeRental, { actorAccountId: session.account.id, rentalId: rentalId as Id<"rentals"> });
      } else {
        const customerId = clean(body.customerId, 80); const vehicleId = clean(body.vehicleId, 80); const status = clean(body.status, 20); const startDate = clean(body.startDate, 10); const monthlyPriceCents = boundedNumber(body.monthlyPriceCents, 0, 100_000_000);
        if (!customerId || !vehicleId || !startDate || !allowedRentalStatuses.has(status) || monthlyPriceCents === undefined) throw new Error("validation_failed");
        await ctx.runMutation(internal.portal.updateRental, { actorAccountId: session.account.id, rentalId: rentalId as Id<"rentals">, customerId: customerId as Id<"customers">, vehicleId: vehicleId as Id<"operationalVehicles">, status: status as "draft"|"scheduled"|"active"|"returned"|"closed"|"cancelled", startDate, expectedEndDate: optionalString(body.expectedEndDate, 10), actualEndDate: optionalString(body.actualEndDate, 10), monthlyPriceCents, depositCents: boundedNumber(body.depositCents, 0, 100_000_000), mileageAllowance: boundedNumber(body.mileageAllowance, 0, 10_000_000), notes: optionalString(body.notes, 2000) });
      }
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

    if (operation === "update_workflow_record") {
      const recordId = clean(body.recordId, 80);
      const status = clean(body.status, 20);
      const maintenanceInterventionType = clean(body.maintenanceInterventionType, 40);
      const disposition = clean(body.disposition, 20);
      const accidentLiability = clean(body.accidentLiability, 20);
      const reportCategory = clean(body.reportCategory, 30);
      const reportPriority = clean(body.reportPriority, 20);
      const maintenanceItems = Array.isArray(body.maintenanceItems)
        ? [...new Set(body.maintenanceItems
          .map((item) => clean(item, 80))
          .filter((item) => allowedMaintenanceItemCodes.has(item)))]
        : undefined;
      const eventOccurredAt = body.eventOccurredAt
        ? Date.parse(clean(body.eventOccurredAt, 40))
        : undefined;
      if (!recordId || !allowedRecordStatuses.has(status)) {
        throw new Error("validation_failed");
      }
      await ctx.runMutation(internal.portal.updateWorkflowRecord, {
        actorAccountId: session.account.id,
        recordId: recordId as Id<"workflowRecords">,
        vehicleId: optionalString(body.vehicleId, 80) as Id<"operationalVehicles"> | undefined,
        customerId: optionalString(body.customerId, 80) as Id<"customers"> | undefined,
        rentalId: optionalString(body.rentalId, 80) as Id<"rentals"> | undefined,
        mileage: boundedNumber(body.mileage, 0, 2_000_000),
        mileageAfter: boundedNumber(body.mileageAfter, 0, 2_000_000),
        fuelPercent: boundedNumber(body.fuelPercent, 0, 100),
        autonomyKm: boundedNumber(body.autonomyKm, 0, 5_000),
        personName: optionalString(body.personName, 100),
        customerName: optionalString(body.customerName, 100),
        employeeName: optionalString(body.employeeName, 100),
        secondaryLicensePlate: normalizePlate(body.secondaryLicensePlate) || undefined,
        secondaryMileage: boundedNumber(body.secondaryMileage, 0, 2_000_000),
        secondaryAutonomyKm: boundedNumber(body.secondaryAutonomyKm, 0, 5_000),
        originAddress: optionalString(body.originAddress, 500),
        destinationAddress: optionalString(body.destinationAddress, 500),
        disposition: allowedDispositions.has(disposition)
          ? disposition as "self" | "towing" | "mechanic" | "other"
          : undefined,
        mechanicName: optionalString(body.mechanicName, 100),
        maintenanceInterventionType: allowedMaintenanceInterventionTypes.has(maintenanceInterventionType)
          ? maintenanceInterventionType as "regular_service" | "breakdown_repair" | "technical_inspection"
          : undefined,
        maintenanceItems,
        maintenanceOtherDetails: optionalString(body.maintenanceOtherDetails, 4000),
        roadTestPerformed: typeof body.roadTestPerformed === "boolean" ? body.roadTestPerformed : undefined,
        readyForService: typeof body.readyForService === "boolean" ? body.readyForService : undefined,
        eventOccurredAt: eventOccurredAt !== undefined && Number.isFinite(eventOccurredAt) ? eventOccurredAt : undefined,
        accidentLiability: allowedAccidentLiabilities.has(accidentLiability)
          ? accidentLiability as "at_fault" | "not_at_fault"
          : undefined,
        amicableSettlement: typeof body.amicableSettlement === "boolean" ? body.amicableSettlement : undefined,
        invoiceReference: optionalString(body.invoiceReference, 120),
        inspectionMonth: optionalString(body.inspectionMonth, 7),
        performedByName: optionalString(body.performedByName, 100),
        maintenanceWork: optionalString(body.maintenanceWork, 4000),
        changesMade: optionalString(body.changesMade, 4000),
        reportCategory: allowedReportCategories.has(reportCategory)
          ? reportCategory as "damage" | "mechanical" | "administrative" | "request" | "other"
          : undefined,
        reportPriority: allowedPriorities.has(reportPriority)
          ? reportPriority as "low" | "normal" | "urgent"
          : undefined,
        description: optionalString(body.description, 4000),
        status: status as "submitted" | "resolved",
        resolution: optionalString(body.resolution, 4000),
      });
      return json({ ok: true }, 200, origin);
    }

    if (operation === "remove_workflow_record") {
      const recordId = clean(body.recordId, 80);
      if (!recordId) throw new Error("validation_failed");
      await ctx.runMutation(internal.portal.removeWorkflowRecord, {
        actorAccountId: session.account.id,
        recordId: recordId as Id<"workflowRecords">,
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

export const portalDrivers = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const body = await parseBody(request);
    const operation = clean(body.operation, 40);

    if (operation === "create") {
      const firstName = clean(body.firstName, 80);
      const lastName = clean(body.lastName, 80);
      const email = clean(body.email, 254).toLowerCase();
      const phone = clean(body.phone, 40);
      const identityCardNumber = clean(body.identityCardNumber, 80);
      const dateOfBirth = clean(body.dateOfBirth, 10);
      const drivingLicenceNumber = clean(body.drivingLicenceNumber, 80);
      const licenceIssueDate = clean(body.licenceIssueDate, 10);
      const licenceValidSince = clean(body.licenceValidSince, 10);
      const uploadGroupId = clean(body.uploadGroupId, 80);
      const mediaIds = Array.isArray(body.mediaIds)
        ? body.mediaIds.map((item) => clean(item, 80)).filter(Boolean).slice(0, 4)
        : [];
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !identityCardNumber ||
        !dateOfBirth ||
        !drivingLicenceNumber ||
        !licenceIssueDate ||
        !licenceValidSince ||
        !uploadGroupId ||
        mediaIds.length !== 4
      ) {
        throw new Error("validation_failed");
      }
      const access = generateAccessCode();
      const vault = await encryptAccessCode(access.formatted);
      const result = await ctx.runMutation(internal.portal.createDriverWithAccount, {
        actorAccountId: session.account.id,
        customerId: optionalString(body.customerId, 80) as
          | Id<"customers">
          | undefined,
        firstName,
        lastName,
        email,
        phone,
        identityCardNumber,
        dateOfBirth,
        drivingLicenceNumber,
        licenceIssueDate,
        licenceValidSince,
        uploadGroupId,
        mediaIds: mediaIds as Id<"mediaAssets">[],
        codeHash: await codeHash(access.normalized),
        codeHint: access.normalized.slice(-4),
        accessCodeCiphertext: vault.ciphertext,
        accessCodeIv: vault.iv,
      });
      return json(
        { ok: true, ...result, accessCode: access.formatted },
        201,
        origin,
      );
    }

    if (operation === "create_access") {
      const driverId = clean(body.driverId, 80);
      if (!driverId) throw new Error("validation_failed");
      const access = generateAccessCode();
      const vault = await encryptAccessCode(access.formatted);
      const accountId = await ctx.runMutation(internal.portal.createDriverAccess, {
        actorAccountId: session.account.id,
        driverId: driverId as Id<"customerDrivers">,
        codeHash: await codeHash(access.normalized),
        codeHint: access.normalized.slice(-4),
        accessCodeCiphertext: vault.ciphertext,
        accessCodeIv: vault.iv,
      });
      return json(
        { ok: true, accountId, accessCode: access.formatted },
        201,
        origin,
      );
    }

    if (operation === "set_active") {
      const driverId = clean(body.driverId, 80);
      if (!driverId || typeof body.active !== "boolean") {
        throw new Error("validation_failed");
      }
      await ctx.runMutation(internal.portal.setDriverActive, {
        actorAccountId: session.account.id,
        driverId: driverId as Id<"customerDrivers">,
        active: body.active,
      });
      return json({ ok: true }, 200, origin);
    }

    throw new Error("validation_failed");
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
    const slot = clean(body.slot, 80).toLowerCase();
    const captureSource = clean(body.captureSource, 20).toLowerCase();
    const uploadGroupId = clean(body.uploadGroupId, 80);
    const size = boundedNumber(body.size, 1, 8_000_000);
    const sortOrder = boundedNumber(body.sortOrder, 0, 100);
    if (
      !fileName ||
      !uploadGroupId ||
      !allowedUploadTypes.has(contentType) ||
      !allowedMediaCategories.has(category) ||
      (slot && !/^[a-z0-9_]{1,80}$/.test(slot)) ||
      (captureSource && !allowedCaptureSources.has(captureSource)) ||
      size === undefined
    ) {
      throw new Error("validation_failed");
    }
    const extension =
      contentType === "application/pdf"
        ? "pdf"
        : contentType === "image/png"
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
        | "accident"
        | "payment"
        | "inspection"
        | "driver_document"
        | "other",
      expiresAt,
      slot: slot || undefined,
      captureSource: captureSource as "camera" | "gallery" | "signature" | undefined,
      sortOrder,
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
    const maintenanceInterventionType = clean(body.maintenanceInterventionType, 40);
    const maintenanceItems = Array.isArray(body.maintenanceItems)
      ? body.maintenanceItems.map((item) => clean(item, 80))
      : undefined;
    const accidentLiability = clean(body.accidentLiability, 30);
    const eventOccurredAt = boundedNumber(
      body.eventOccurredAt,
      946684800000,
      Date.now() + 5 * 60 * 1000,
    );
    if (reportCategory && !allowedReportCategories.has(reportCategory)) {
      throw new Error("validation_failed");
    }
    if (reportPriority && !allowedPriorities.has(reportPriority)) {
      throw new Error("validation_failed");
    }
    if (
      (maintenanceInterventionType &&
        !allowedMaintenanceInterventionTypes.has(maintenanceInterventionType)) ||
      maintenanceItems?.some((item) => !allowedMaintenanceItemCodes.has(item))
    ) {
      throw new Error("invalid_maintenance_items");
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
        | "breakdown_replacement"
        | "vehicle_transfer"
        | "report"
        | "problem_report"
        | "accident_report"
        | "payment_proof"
        | "monthly_inspection",
      uploadGroupId,
      mediaIds: mediaIds as Id<"mediaAssets">[],
      vehicleId: optionalString(body.vehicleId, 80) as
        | Id<"operationalVehicles">
        | undefined,
      customerId: optionalString(body.customerId, 80) as
        | Id<"customers">
        | undefined,
      rentalId: optionalString(body.rentalId, 80) as Id<"rentals"> | undefined,
      occurredAt: Date.now(),
      mileage: boundedNumber(body.mileage, 0, 2_000_000),
      mileageAfter: boundedNumber(body.mileageAfter, 0, 2_000_000),
      fuelPercent: boundedNumber(body.fuelPercent, 0, 100),
      autonomyKm: boundedNumber(body.autonomyKm, 0, 5_000),
      personName: optionalString(body.personName, 100),
      customerName: optionalString(body.customerName, 100),
      employeeName: optionalString(body.employeeName, 100),
      secondaryLicensePlate: normalizePlate(body.secondaryLicensePlate) || undefined,
      secondaryMileage: boundedNumber(body.secondaryMileage, 0, 2_000_000),
      secondaryAutonomyKm: boundedNumber(body.secondaryAutonomyKm, 0, 5_000),
      originAddress: optionalString(body.originAddress, 500),
      destinationAddress: optionalString(body.destinationAddress, 500),
      disposition: allowedDispositions.has(clean(body.disposition, 20))
        ? clean(body.disposition, 20) as "self" | "towing" | "mechanic" | "other"
        : undefined,
      maintenanceInterventionType: allowedMaintenanceInterventionTypes.has(maintenanceInterventionType)
        ? maintenanceInterventionType as "regular_service" | "breakdown_repair" | "technical_inspection"
        : undefined,
      maintenanceItems,
      maintenanceOtherDetails: optionalString(body.maintenanceOtherDetails, 4000),
      roadTestPerformed:
        typeof body.roadTestPerformed === "boolean" ? body.roadTestPerformed : undefined,
      readyForService:
        typeof body.readyForService === "boolean" ? body.readyForService : undefined,
      eventOccurredAt,
      accidentLiability: allowedAccidentLiabilities.has(accidentLiability)
        ? accidentLiability as "at_fault" | "not_at_fault"
        : undefined,
      amicableSettlement:
        typeof body.amicableSettlement === "boolean"
          ? body.amicableSettlement
          : undefined,
      invoiceReference: optionalString(body.invoiceReference, 120),
      inspectionMonth:
        type === "monthly_inspection"
          ? new Date().toISOString().slice(0, 7)
          : undefined,
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
    if (
      [
        "problem_report",
        "accident_report",
        "payment_proof",
        "monthly_inspection",
      ].includes(type)
    ) {
      await ctx.scheduler.runAfter(
        0,
        internal.portalNotifications.sendWorkflowNotification,
        { recordId: result.recordId, attempt: 0 },
      );
    }
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
        slot: item.slot,
        captureSource: item.captureSource,
        sortOrder: item.sortOrder,
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

export const portalDriverMedia = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  try {
    const session = await requireSession(ctx, request);
    const workerUrl = process.env.MEDIA_WORKER_URL?.replace(/\/+$/, "");
    if (!workerUrl) throw new Error("media_service_unavailable");
    const body = await parseBody(request);
    const driverId = clean(body.driverId, 80);
    if (!driverId) throw new Error("validation_failed");
    const media = await ctx.runQuery(internal.portal.getDriverMedia, {
      actorAccountId: session.account.id,
      driverId: driverId as Id<"customerDrivers">,
    });
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const items = await Promise.all(
      media.map(async (item) => ({
        id: item.id,
        fileName: item.fileName,
        contentType: item.contentType,
        category: item.category,
        slot: item.slot,
        captureSource: item.captureSource,
        sortOrder: item.sortOrder,
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
