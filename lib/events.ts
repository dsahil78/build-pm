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
      session_id: str(a.session_id, 64),

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

const MAX_BATCH = 50;

/**
 * Bulk-insert a batch of cookieless journey events (page_view, scroll,
 * section_view, cta_click, form_start, form_abandon, page_exit). The client
 * sends an envelope: { session_id, attribution, events: [{ type, path, t, props }] }.
 * Best-effort, never throws.
 */
export async function logEventsBatch(body: unknown, headers: Headers): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return;
    if (!body || typeof body !== "object") return;

    const b = body as { session_id?: unknown; attribution?: unknown; events?: unknown };
    const sessionId = typeof b.session_id === "string" ? b.session_id.slice(0, 64) : null;
    const a = (b.attribution ?? {}) as Partial<AttributionPayload>;
    const events = Array.isArray(b.events) ? b.events.slice(0, MAX_BATCH) : [];
    if (events.length === 0) return;

    const consent = a.consent === true;
    const ua = headers.get("user-agent") ?? "";
    const { device_type, browser, os } = parseUserAgent(ua);
    const ipHash = hashIp(getClientIp(headers));
    const ipCountry = str(headers.get("x-vercel-ip-country"), 8);
    const ipRegion = decode(str(headers.get("x-vercel-ip-country-region"), 16));
    const ipCity = decode(str(headers.get("x-vercel-ip-city"), 80));

    const sharedAttribution = {
      utm_source: str(a.utm_source),
      utm_medium: str(a.utm_medium),
      utm_campaign: str(a.utm_campaign),
      utm_term: str(a.utm_term),
      utm_content: str(a.utm_content),
      referer: str(a.referrer),
      landing_path: str(a.landing_path),
    };

    const rows = events.map((e) => {
      const ev = (e ?? {}) as { type?: unknown; path?: unknown; props?: unknown };
      const props = (ev.props ?? {}) as Record<string, unknown>;
      const duration = typeof props.duration_ms === "number" ? props.duration_ms : null;
      return {
        event_type: str(ev.type, 40) ?? "journey",
        session_id: sessionId,
        path: str(ev.path, 200),
        duration_ms:
          duration !== null ? Math.max(0, Math.min(Math.round(duration), 86_400_000)) : null,
        ...sharedAttribution,
        user_agent: str(ua),
        device_type,
        ip_country: ipCountry,
        ip_region: ipRegion,
        ip_city: ipCity,
        ip_hash: ipHash,
        consent,
        meta: {
          browser,
          os,
          section: str(props.section, 80),
          depth: typeof props.depth === "number" ? props.depth : null,
          cta: str(props.cta, 120),
          label: str(props.label, 120),
          form: str(props.form, 40),
          hours_since: typeof props.hours_since === "number" ? props.hours_since : null,
        },
      };
    });

    const { error } = await supabase.from("events").insert(rows);
    if (error) {
      console.error("[events] batch insert failed:", error.code, error.message);
    }
  } catch (err) {
    console.error("[events] logEventsBatch threw:", err);
  }
}
