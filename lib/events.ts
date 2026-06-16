/**
 * Server-side event logging for attribution + conversion telemetry.
 *
 * Merges the client attribution payload with server-derived signals (Vercel
 * edge geo headers, parsed user-agent, a SALTED HASH of the IP - never the raw
 * IP) and writes one row to `public.events`. Best-effort and fire-and-forget:
 * it must never throw or block the submission it follows.
 */
import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "./supabase-admin";
import { getClientIp } from "./rate-limit";
import type { AttributionPayload } from "./attribution";

const MAX = 500;

function str(v: unknown, max = MAX): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

/** Vercel sometimes URL-encodes geo header values (e.g. "San%20Francisco"). */
function decode(v: string | null): string | null {
  if (!v) return null;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

function parseUserAgent(ua: string): {
  device_type: string;
  browser: string | null;
  os: string | null;
} {
  const u = ua.toLowerCase();
  const device_type = /mobile|iphone|ipod|windows phone|blackberry/.test(u)
    ? "mobile"
    : /ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(u)
      ? "tablet"
      : "desktop";
  const browser = /edg\//.test(u)
    ? "Edge"
    : /opr\/|opera/.test(u)
      ? "Opera"
      : /chrome|crios|chromium/.test(u)
        ? "Chrome"
        : /firefox|fxios/.test(u)
          ? "Firefox"
          : /safari/.test(u)
            ? "Safari"
            : null;
  const os = /windows/.test(u)
    ? "Windows"
    : /iphone|ipad|ipod|ios/.test(u)
      ? "iOS"
      : /mac os x|macintosh/.test(u)
        ? "macOS"
        : /android/.test(u)
          ? "Android"
          : /linux/.test(u)
            ? "Linux"
            : null;
  return { device_type, browser, os };
}

/** One-way salted hash of the IP for dedupe/fraud. Returns null if no IP. */
function hashIp(ip: string | null): string | null {
  if (!ip || ip === "unknown") return null;
  const salt = process.env.EVENTS_IP_SALT;
  if (!salt) {
    // Still avoid storing raw IP, but a missing secret salt makes the hash
    // brute-forceable across the IPv4 space. Configure EVENTS_IP_SALT in prod.
    console.warn("[events] EVENTS_IP_SALT not set - IP hash is weak.");
  }
  return createHash("sha256")
    .update(`${salt ?? ""}:${ip}`)
    .digest("hex")
    .slice(0, 32);
}

/** Whitelist + truncate client-supplied click IDs (untrusted input). */
function sanitizeClickIds(v: unknown): Record<string, string> | null {
  if (!v || typeof v !== "object") return null;
  const out: Record<string, string> = {};
  let n = 0;
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (n >= 12) break;
    if (typeof k === "string" && typeof val === "string" && val.trim()) {
      out[k.slice(0, 40)] = val.slice(0, 200);
      n++;
    }
  }
  return Object.keys(out).length ? out : null;
}

export interface LogEventInput {
  eventType: string;
  email?: string | null;
  attribution?: Partial<AttributionPayload> | null;
  headers: Headers;
}

export async function logEvent(input: LogEventInput): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return;

    const h = input.headers;
    const a = (input.attribution ?? {}) as Partial<AttributionPayload>;
    const consent = a.consent === true;

    const ua = h.get("user-agent") ?? "";
    const { device_type, browser, os } = parseUserAgent(ua);

    const row = {
      event_type: str(input.eventType, 60) ?? "unknown",
      email: input.email ? input.email.toLowerCase().slice(0, 320) : null,

      utm_source: str(a.utm_source),
      utm_medium: str(a.utm_medium),
      utm_campaign: str(a.utm_campaign),
      utm_term: str(a.utm_term),
      utm_content: str(a.utm_content),
      referer: str(a.referrer),
      landing_path: str(a.landing_path),

      user_agent: str(ua),
      device_type,

      ip_country: str(h.get("x-vercel-ip-country"), 8),
      ip_region: decode(str(h.get("x-vercel-ip-country-region"), 16)),
      ip_city: decode(str(h.get("x-vercel-ip-city"), 80)),
      ip_hash: hashIp(getClientIp(h)),

      consent,
      meta: {
        browser,
        os,
        language: str(a.language, 40),
        timezone: str(a.timezone, 60),
        click_ids: sanitizeClickIds(a.click_ids),
        // Rich signals are gated on consent at the client; double-gate here.
        screen: consent ? str(a.screen, 20) : null,
        viewport: consent ? str(a.viewport, 20) : null,
        dpr: consent && typeof a.dpr === "number" ? a.dpr : null,
        cores: consent && typeof a.cores === "number" ? a.cores : null,
        device_memory: consent && typeof a.device_memory === "number" ? a.device_memory : null,
        connection: consent ? str(a.connection, 20) : null,
      },
    };

    const { error } = await supabase.from("events").insert(row);
    if (error) {
      console.error("[events] insert failed:", error.code, error.message);
    }
  } catch (err) {
    // Never affect the request that triggered it.
    console.error("[events] logEvent threw:", err);
  }
}
