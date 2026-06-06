/**
 * Simple in-memory rate limiter with automatic cleanup.
 * Per-process only — use Redis/Upstash in multi-instance production.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

/**
 * Check if a request from `key` is within rate limits.
 * Returns true if allowed, false if rate-limited.
 */
export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number,
): boolean {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

/**
 * Extract a usable IP from the request.
 * Takes the first IP from x-forwarded-for to mitigate trivial spoofing,
 * but falls back to a constant when the header is absent.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // Take the leftmost IP (client IP set by the first proxy)
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return "unknown";
}
