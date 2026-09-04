function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function asArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

async function vaultKey(): Promise<CryptoKey> {
  const pepper = process.env.PORTAL_ACCESS_PEPPER;
  if (!pepper) throw new Error("portal_not_configured");
  const material = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`yabi-access-code-vault:${pepper}`),
  );
  return crypto.subtle.importKey("raw", material, "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function encryptAccessCode(accessCode: string): Promise<{
  ciphertext: string;
  iv: string;
}> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    await vaultKey(),
    new TextEncoder().encode(accessCode),
  );
  return {
    ciphertext: bytesToBase64Url(new Uint8Array(encrypted)),
    iv: bytesToBase64Url(iv),
  };
}

export async function decryptAccessCode(ciphertext: string, iv: string): Promise<string> {
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: asArrayBuffer(base64UrlToBytes(iv)) },
    await vaultKey(),
    asArrayBuffer(base64UrlToBytes(ciphertext)),
  );
  const accessCode = new TextDecoder().decode(decrypted);
  if (!/^YABI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(accessCode)) {
    throw new Error("code_vault_invalid");
  }
  return accessCode;
}
