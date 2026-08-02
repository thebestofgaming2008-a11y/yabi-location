import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { httpAction, type ActionCtx } from "./_generated/server";

const allowedLocales = new Set(["en", "fr", "nl"]);
const allowedDocumentCategories = new Set([
  "identity_front",
  "identity_back",
  "licence_front",
  "licence_back",
]);
const allowedAdminStatuses = new Set(["contacted", "agreed", "rejected"]);
const allowedBelgianProvinces = new Set([
  "antwerp",
  "brussels_capital",
  "east_flanders",
  "flemish_brabant",
  "hainaut",
  "liege",
  "limburg",
  "luxembourg",
  "namur",
  "walloon_brabant",
  "west_flanders",
]);
const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

type JsonBody = Record<string, unknown>;

function originFor(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const configured = (
    process.env.CLIENT_ORIGIN ?? "https://yabi-location.pages.dev"
  )
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
  return clean(value, maximum) || undefined;
}

function nationalRegisterNumberValid(value: string): boolean {
  return (
    /^[0-9.\s/-]+$/.test(value) &&
    value.replace(/\D/g, "").length === 11
  );
}

function belgianVatNumberValid(value: string): boolean {
  return /^(?:BE)?[01]\d{9}$/.test(value.replace(/[.\s-]/g, "").toUpperCase());
}

function emailAddressValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

function belgianPostalCodeValid(value: string): boolean {
  return /^\d{4}$/.test(value);
}

function composeBelgianAddress(parts: {
  street: string;
  houseNumber: string;
  addressBox?: string;
  postalCode: string;
  city: string;
}): string {
  const number = parts.addressBox
    ? `${parts.houseNumber} box ${parts.addressBox}`
    : parts.houseNumber;
  return `${parts.street} ${number}, ${parts.postalCode} ${parts.city}`;
}

function boundedNumber(
  value: unknown,
  minimum: number,
  maximum: number,
): number | undefined {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= minimum && number <= maximum
    ? number
    : undefined;
}

async function parseBody(request: Request): Promise<JsonBody> {
  const type = request.headers.get("content-type") ?? "";
  if (!type.toLowerCase().startsWith("application/json")) {
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

async function applicationTokenHash(token: string): Promise<string> {
  return hmac(`application:${token}`, "PORTAL_ACCESS_PEPPER");
}

async function sessionTokenHash(token: string): Promise<string> {
  return hmac(`session:${token}`, "PORTAL_ACCESS_PEPPER");
}

async function codeHash(code: string): Promise<string> {
  return hmac(`code:${code}`, "PORTAL_ACCESS_PEPPER");
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

function bearer(request: Request): string {
  const header = request.headers.get("authorization") ?? "";
  return /^Bearer\s+([A-Za-z0-9_-]{32,200})$/.exec(header)?.[1] ?? "";
}

async function requireSession(ctx: ActionCtx, request: Request) {
  const token = bearer(request);
  if (!token) throw new Error("unauthorized");
  const session = await ctx.runQuery(internal.portal.getSessionContext, {
    tokenHash: await sessionTokenHash(token),
    now: Date.now(),
  });
  if (!session) throw new Error("unauthorized");
  return session;
}

async function mediaToken(payload: Record<string, unknown>): Promise<string> {
  const encoded = base64Url(JSON.stringify(payload));
  return `${encoded}.${await hmac(encoded, "MEDIA_SIGNING_SECRET")}`;
}

function generateAccessCode(): { formatted: string; normalized: string } {
  const bytes = randomBytes(12);
  let normalized = "";
  for (const byte of bytes) {
    normalized += codeAlphabet[byte % codeAlphabet.length];
  }
  return {
    normalized,
    formatted: `YABI-${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8)}`,
  };
}

function safeError(error: unknown): string {
  const message = error instanceof Error ? error.message : "request_failed";
  const known = new Set([
    "unauthorized",
    "forbidden",
    "invalid_content_type",
    "payload_too_large",
    "invalid_json",
    "validation_failed",
    "application_unauthorized",
    "application_validation_failed",
    "application_documents_missing",
    "application_upload_rate_limited",
    "application_not_found",
    "application_status_locked",
    "application_must_be_agreed",
    "invalid_capture",
    "invalid_file_type",
    "code_collision",
    "media_service_unavailable",
  ]);
  return known.has(message) ? message : "request_failed";
}

function statusFor(error: string): number {
  if (error === "unauthorized" || error === "application_unauthorized") {
    return 401;
  }
  if (error === "forbidden") return 403;
  if (error === "payload_too_large") return 413;
  if (error === "invalid_content_type") return 415;
  if (error === "application_upload_rate_limited") return 429;
  if (error === "media_service_unavailable") return 503;
  return 400;
}

export const portalApplicationStart = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") {
    return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  }
  try {
    const body = await parseBody(request);
    const locale = clean(body.locale, 2);
    if (!allowedLocales.has(locale)) throw new Error("validation_failed");
    const rawToken = base64Url(randomBytes(32));
    const reference = `YA-${new Date().getUTCFullYear()}-${base64Url(randomBytes(6)).toUpperCase().slice(0, 8)}`;
    const result = await ctx.runMutation(
      internal.applications.startApplication,
      {
        tokenHash: await applicationTokenHash(rawToken),
        reference,
        locale: locale as "en" | "fr" | "nl",
        fingerprint: await fingerprint(request),
      },
    );
    if (!result.ok) {
      return json(
        {
          ok: false,
          error: "rate_limited",
          retryAfter: result.retryAfter,
        },
        429,
        origin,
      );
    }
    return json(
      {
        ok: true,
        applicationId: result.applicationId,
        applicationToken: rawToken,
        reference,
      },
      201,
      origin,
    );
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalApplicationUpload = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") {
    return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  }
  try {
    const workerUrl = process.env.MEDIA_WORKER_URL?.replace(/\/+$/, "");
    if (!workerUrl) throw new Error("media_service_unavailable");
    const body = await parseBody(request);
    const rawToken = clean(body.applicationToken, 200);
    const driverClientKey = clean(body.driverClientKey, 80);
    const category = clean(body.category, 40);
    const contentType = clean(body.contentType, 80).toLowerCase();
    const size = boundedNumber(body.size, 1, 8_000_000);
    const width = boundedNumber(body.width, 640, 10_000);
    const height = boundedNumber(body.height, 480, 10_000);
    const capturedAt = boundedNumber(
      body.capturedAt,
      Date.now() - 30 * 60 * 1000,
      Date.now() + 60 * 1000,
    );
    if (
      !rawToken ||
      !driverClientKey ||
      !allowedDocumentCategories.has(category) ||
      !["image/jpeg", "image/webp"].includes(contentType) ||
      size === undefined ||
      width === undefined ||
      height === undefined ||
      capturedAt === undefined
    ) {
      throw new Error("invalid_capture");
    }
    const tokenHash = await applicationTokenHash(rawToken);
    const application = await ctx.runQuery(
      internal.applications.getApplicationSession,
      { tokenHash, now: Date.now() },
    );
    if (!application) throw new Error("application_unauthorized");
    const extension = contentType === "image/webp" ? "webp" : "jpg";
    const r2Key = `portal/applications/${new Date().toISOString().slice(0, 10)}/${String(application.applicationId)}/${base64Url(randomBytes(18))}.${extension}`;
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const mediaId = await ctx.runMutation(
      internal.applications.createPendingDocument,
      {
        applicationId: application.applicationId,
        tokenHash,
        driverClientKey,
        r2Key,
        category: category as
          | "identity_front"
          | "identity_back"
          | "licence_front"
          | "licence_back",
        contentType,
        size,
        width,
        height,
        capturedAt,
        expiresAt,
      },
    );
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

export const portalApplicationSubmit = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") {
    return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  }
  try {
    const body = await parseBody(request);
    const rawToken = clean(body.applicationToken, 200);
    const tokenHash = await applicationTokenHash(rawToken);
    const application = await ctx.runQuery(
      internal.applications.getApplicationSession,
      { tokenHash, now: Date.now() },
    );
    if (!application) throw new Error("application_unauthorized");
    const applicantType = clean(body.applicantType, 20) as
      | "individual"
      | "company";
    const holderFullName = clean(body.holderFullName, 160);
    const companyName = optionalString(body.companyName, 160);
    const companyVatNumber = optionalString(body.companyVatNumber, 32);
    const holderStreet = clean(body.holderStreet, 160);
    const holderHouseNumber = clean(body.holderHouseNumber, 20);
    const holderAddressBox = optionalString(body.holderAddressBox, 30);
    const holderPostalCode = clean(body.holderPostalCode, 4);
    const holderCity = clean(body.holderCity, 100);
    const holderProvince = clean(body.holderProvince, 40);
    const holderAddress = composeBelgianAddress({
      street: holderStreet,
      houseNumber: holderHouseNumber,
      ...(holderAddressBox ? { addressBox: holderAddressBox } : {}),
      postalCode: holderPostalCode,
      city: holderCity,
    });
    const holderPhone = clean(body.holderPhone, 40);
    const holderIdentityCardNumber = clean(
      body.holderIdentityCardNumber,
      80,
    );
    const holderNationalRegisterNumber = clean(
      body.holderNationalRegisterNumber,
      24,
    );
    const holderEmail = clean(body.holderEmail, 254).toLowerCase();
    const privacyAccepted = body.privacyAccepted === true;
    const rawDrivers = Array.isArray(body.drivers) ? body.drivers.slice(0, 6) : [];
    const drivers = rawDrivers.map((value, index) => {
      const driver =
        value && typeof value === "object" && !Array.isArray(value)
          ? (value as JsonBody)
          : {};
      const companyPosition = optionalString(driver.companyPosition, 120);
      const street = clean(driver.street, 160);
      const houseNumber = clean(driver.houseNumber, 20);
      const addressBox = optionalString(driver.addressBox, 30);
      const postalCode = clean(driver.postalCode, 4);
      const city = clean(driver.city, 100);
      const province = clean(driver.province, 40);
      return {
        clientKey: clean(driver.clientKey, 80),
        kind: clean(driver.kind, 20) as "main" | "additional",
        sortOrder: index,
        fullName: clean(driver.fullName, 120),
        address: composeBelgianAddress({
          street,
          houseNumber,
          ...(addressBox ? { addressBox } : {}),
          postalCode,
          city,
        }),
        street,
        houseNumber,
        ...(addressBox ? { addressBox } : {}),
        postalCode,
        city,
        province: province as
          | "antwerp"
          | "brussels_capital"
          | "east_flanders"
          | "flemish_brabant"
          | "hainaut"
          | "liege"
          | "limburg"
          | "luxembourg"
          | "namur"
          | "walloon_brabant"
          | "west_flanders",
        email: clean(driver.email, 254).toLowerCase(),
        phone: clean(driver.phone, 40),
        identityCardNumber: clean(driver.identityCardNumber, 80),
        nationalRegisterNumber: clean(driver.nationalRegisterNumber, 24),
        dateOfBirth: clean(driver.dateOfBirth, 10),
        ...(companyPosition ? { companyPosition } : {}),
        drivingLicenceNumber: clean(driver.drivingLicenceNumber, 80),
        licenceIssueDate: clean(driver.licenceIssueDate, 10),
        licenceValidSince: clean(driver.licenceValidSince, 10),
        ageConfirmed: driver.ageConfirmed === true,
      };
    });
    const phoneValid = (value: string) => /^[+()0-9.\s/-]{7,40}$/.test(value);
    if (
      !rawToken ||
      !["individual", "company"].includes(applicantType) ||
      !holderFullName ||
      (applicantType === "company" &&
        (!companyName ||
          !companyVatNumber ||
          !belgianVatNumberValid(companyVatNumber))) ||
      !holderStreet ||
      !holderHouseNumber ||
      !belgianPostalCodeValid(holderPostalCode) ||
      !holderCity ||
      !allowedBelgianProvinces.has(holderProvince) ||
      !phoneValid(holderPhone) ||
      !holderIdentityCardNumber ||
      !nationalRegisterNumberValid(holderNationalRegisterNumber) ||
      !emailAddressValid(holderEmail) ||
      !privacyAccepted ||
      drivers.length < 1 ||
      drivers.some(
        (driver) =>
          !driver.clientKey ||
          !["main", "additional"].includes(driver.kind) ||
          !driver.fullName ||
          !driver.street ||
          !driver.houseNumber ||
          !belgianPostalCodeValid(driver.postalCode) ||
          !driver.city ||
          !allowedBelgianProvinces.has(driver.province) ||
          !emailAddressValid(driver.email) ||
          !phoneValid(driver.phone) ||
          !driver.identityCardNumber ||
          !nationalRegisterNumberValid(driver.nationalRegisterNumber) ||
          !dateAtLeastYearsAgo(driver.dateOfBirth, 23) ||
          (applicantType === "company" && !driver.companyPosition) ||
          !driver.drivingLicenceNumber ||
          !dateAtLeastYearsAgo(driver.licenceIssueDate, 0) ||
          !dateAtLeastYearsAgo(driver.licenceValidSince, 5) ||
          !driver.ageConfirmed,
      )
    ) {
      throw new Error("application_validation_failed");
    }
    const result = await ctx.runMutation(
      internal.applications.submitApplication,
      {
        applicationId: application.applicationId,
        tokenHash,
        applicantType,
        holderFullName,
        ...(companyName ? { companyName } : {}),
        ...(companyVatNumber ? { companyVatNumber } : {}),
        holderAddress,
        holderStreet,
        holderHouseNumber,
        ...(holderAddressBox ? { holderAddressBox } : {}),
        holderPostalCode,
        holderCity,
        holderProvince: holderProvince as
          | "antwerp"
          | "brussels_capital"
          | "east_flanders"
          | "flemish_brabant"
          | "hainaut"
          | "liege"
          | "limburg"
          | "luxembourg"
          | "namur"
          | "walloon_brabant"
          | "west_flanders",
        holderPhone,
        holderIdentityCardNumber,
        holderNationalRegisterNumber,
        holderEmail,
        privacyVersion: "2026-08-02",
        drivers,
      },
    );
    for (const delay of [0, 60_000, 5 * 60_000]) {
      await ctx.scheduler.runAfter(
        delay,
        internal.applicationEmails.sendApplicationNotification,
        { applicationId: application.applicationId },
      );
    }
    return json({ ok: true, reference: result.reference }, 201, origin);
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});

export const portalApplicationAdmin = httpAction(async (ctx, request) => {
  const origin = originFor(request);
  if (origin === "") {
    return json({ ok: false, error: "origin_not_allowed" }, 403, null);
  }
  try {
    const session = await requireSession(ctx, request);
    if (request.method === "GET") {
      const applicationId = new URL(request.url).searchParams.get("id");
      if (!applicationId) {
        const items = await ctx.runQuery(
          internal.applications.listApplicationsForAdmin,
          { actorAccountId: session.account.id },
        );
        return json({ ok: true, items }, 200, origin);
      }
      const result = await ctx.runQuery(
        internal.applications.getApplicationForAdmin,
        {
          actorAccountId: session.account.id,
          applicationId: applicationId as Id<"rentalApplications">,
        },
      );
      const workerUrl = process.env.MEDIA_WORKER_URL?.replace(/\/+$/, "");
      if (!workerUrl) throw new Error("media_service_unavailable");
      const expiresAt = Date.now() + 10 * 60 * 1000;
      const documents = await Promise.all(
        result.documents.map(async (document) => ({
          ...document,
          r2Key: undefined,
          url: `${workerUrl}/object/${encodeURIComponent(document.r2Key)}?token=${encodeURIComponent(
            await mediaToken({
              op: "get",
              key: document.r2Key,
              exp: expiresAt,
            }),
          )}`,
        })),
      );
      return json(
        {
          ok: true,
          application: result.application,
          drivers: result.drivers,
          documents,
          expiresAt,
        },
        200,
        origin,
      );
    }
    const body = await parseBody(request);
    const operation = clean(body.operation, 40);
    const applicationId = clean(body.applicationId, 80);
    if (!applicationId) throw new Error("validation_failed");
    if (operation === "update_status") {
      const status = clean(body.status, 20);
      if (!allowedAdminStatuses.has(status)) {
        throw new Error("validation_failed");
      }
      await ctx.runMutation(
        internal.applications.updateApplicationStatus,
        {
          actorAccountId: session.account.id,
          applicationId: applicationId as Id<"rentalApplications">,
          status: status as "contacted" | "agreed" | "rejected",
          adminNotes: optionalString(body.adminNotes, 4000),
        },
      );
      return json({ ok: true }, 200, origin);
    }
    if (operation === "activate") {
      const access = generateAccessCode();
      const activated = await ctx.runMutation(
        internal.applications.activateApplication,
        {
          actorAccountId: session.account.id,
          applicationId: applicationId as Id<"rentalApplications">,
          codeHash: await codeHash(access.normalized),
          codeHint: access.normalized.slice(-4),
        },
      );
      return json(
        { ok: true, ...activated, accessCode: access.formatted },
        201,
        origin,
      );
    }
    throw new Error("validation_failed");
  } catch (error) {
    const code = safeError(error);
    return json({ ok: false, error: code }, statusFor(code), origin);
  }
});
