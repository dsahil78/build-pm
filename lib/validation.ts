/**
 * Shared validation utilities for API routes.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validates email format — requires 2+ char TLD. */
export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

/** Validates that a string is a plausible URL (http/https only). */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/** Strips HTML tags to prevent stored XSS. */
export function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/** Enforces max length, trims, and strips HTML. */
export function cleanField(
  value: string | undefined | null,
  maxLength: number,
): string | null {
  if (!value) return null;
  return sanitize(value).slice(0, maxLength) || null;
}

/** Validates that a value is one of the allowed options. */
export function isAllowedValue(
  value: string | undefined | null,
  allowed: readonly string[],
): boolean {
  if (!value) return true; // null/undefined is okay (optional field)
  return allowed.includes(value);
}

/** Validates Content-Type header is JSON. */
export function isJsonContentType(headers: Headers): boolean {
  const ct = headers.get("content-type");
  return ct !== null && ct.includes("application/json");
}
