interface Env {
  MEDIA_BUCKET: R2Bucket;
  MEDIA_SIGNING_SECRET: string;
  MEDIA_CALLBACK_SECRET: string;
  CONVEX_CALLBACK_URL: string;
  ALLOWED_ORIGINS: string;
}

interface MediaToken {
  op: "put" | "get";
  key: string;
  exp: number;
  mediaId?: string;
  contentType?: string;
  size?: number;
}

const allowedContentTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const maximumUploadSize = 20_000_000;

function base64UrlBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function allowedOrigin(request: Request, env: Env): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const allowed = env.ALLOWED_ORIGINS.split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return allowed.includes(origin) ? origin : "";
}

function corsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
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
  const headers = corsHeaders(origin);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { status, headers });
}

async function verifyToken(rawToken: string, env: Env): Promise<MediaToken | null> {
  const [encodedPayload, encodedSignature, extra] = rawToken.split(".");
  if (!encodedPayload || !encodedSignature || extra) return null;
  if (!env.MEDIA_SIGNING_SECRET || env.MEDIA_SIGNING_SECRET.length < 32) {
    return null;
  }
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.MEDIA_SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlBytes(encodedSignature).buffer.slice(0) as ArrayBuffer,
    new TextEncoder().encode(encodedPayload),
  );
  if (!valid) return null;
  try {
    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlBytes(encodedPayload)),
    ) as MediaToken;
    if (
      !payload ||
      !["put", "get"].includes(payload.op) ||
      typeof payload.key !== "string" ||
      !payload.key.startsWith("portal/") ||
      typeof payload.exp !== "number" ||
      payload.exp < Date.now()
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

async function completeUpload(
  env: Env,
  r2Key: string,
  size: number,
  etag: string,
): Promise<boolean> {
  if (!env.CONVEX_CALLBACK_URL || !env.MEDIA_CALLBACK_SECRET) return false;
  const response = await fetch(env.CONVEX_CALLBACK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Yabi-Callback-Secret": env.MEDIA_CALLBACK_SECRET,
    },
    body: JSON.stringify({ r2Key, size, etag }),
  });
  return response.ok;
}

async function handleObject(request: Request, env: Env): Promise<Response> {
  const origin = allowedOrigin(request, env);
  if (origin === "") return json({ ok: false, error: "origin_not_allowed" }, 403, null);

  const url = new URL(request.url);
  const encodedKey = url.pathname.slice("/object/".length);
  let requestedKey = "";
  try {
    requestedKey = decodeURIComponent(encodedKey);
  } catch {
    return json({ ok: false, error: "invalid_key" }, 400, origin);
  }

  const token = await verifyToken(url.searchParams.get("token") ?? "", env);
  if (!token || token.key !== requestedKey) {
    return json({ ok: false, error: "invalid_or_expired_token" }, 401, origin);
  }

  if (request.method === "PUT") {
    if (token.op !== "put" || !token.mediaId) {
      return json({ ok: false, error: "operation_not_allowed" }, 403, origin);
    }
    const contentType = (request.headers.get("content-type") ?? "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (
      !request.body ||
      !token.contentType ||
      !allowedContentTypes.has(contentType) ||
      contentType !== token.contentType ||
      !Number.isInteger(token.size) ||
      token.size! <= 0 ||
      token.size! > maximumUploadSize ||
      contentLength !== token.size
    ) {
      return json({ ok: false, error: "invalid_upload" }, 400, origin);
    }

    const object = await env.MEDIA_BUCKET.put(requestedKey, request.body, {
      httpMetadata: { contentType },
      customMetadata: { mediaId: token.mediaId },
    });
    if (object.size !== token.size) {
      await env.MEDIA_BUCKET.delete(requestedKey);
      return json({ ok: false, error: "size_mismatch" }, 400, origin);
    }
    const callbackOk = await completeUpload(
      env,
      requestedKey,
      object.size,
      object.httpEtag,
    );
    if (!callbackOk) {
      return json({ ok: false, error: "confirmation_failed" }, 502, origin);
    }
    const headers = corsHeaders(origin);
    headers.set("ETag", object.httpEtag);
    headers.set("Access-Control-Expose-Headers", "ETag");
    headers.set("Content-Type", "application/json; charset=utf-8");
    return new Response(JSON.stringify({ ok: true, etag: object.httpEtag }), {
      status: 201,
      headers,
    });
  }

  if (request.method === "GET") {
    if (token.op !== "get") {
      return json({ ok: false, error: "operation_not_allowed" }, 403, origin);
    }
    const object = await env.MEDIA_BUCKET.get(requestedKey);
    if (!object) return json({ ok: false, error: "not_found" }, 404, origin);
    const headers = corsHeaders(origin);
    object.writeHttpMetadata(headers);
    headers.set("ETag", object.httpEtag);
    headers.set("Cache-Control", "private, max-age=300");
    headers.set("Content-Security-Policy", "default-src 'none'");
    return new Response(object.body, { status: 200, headers });
  }

  return json({ ok: false, error: "method_not_allowed" }, 405, origin);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = allowedOrigin(request, env);

    if (request.method === "OPTIONS") {
      if (origin === "") return new Response(null, { status: 403 });
      const headers = corsHeaders(origin);
      headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
      headers.set("Access-Control-Allow-Headers", "Content-Type");
      headers.set("Access-Control-Max-Age", "86400");
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true, service: "yabi-ops-media" }, 200, origin);
    }
    if (url.pathname.startsWith("/object/")) {
      return handleObject(request, env);
    }
    return json({ ok: false, error: "not_found" }, 404, origin);
  },
};
