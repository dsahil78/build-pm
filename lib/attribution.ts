/**
 * First-party, consent-aware attribution capture (client-side).
 *
 * Captures the entry context once per session (UTM, ad click IDs, original
 * referrer, landing page) and, at submit time, attaches lightweight device
 * context. Fingerprinting-grade signals (screen, cores, etc.) are ONLY included
 * when the visitor has granted analytics consent. No raw IP is touched here -
 * the server derives geo + a hashed IP separately (see lib/events.ts).
 *
 * This module has no top-level browser access, so it is safe to `import type`
 * from server code.
 */

export interface AttributionPayload {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  click_ids: Record<string, string> | null;
  referrer: string | null;
  landing_path: string | null;
  language: string | null;
  timezone: string | null;
  consent: boolean;
  // Rich device signals: only populated when consent === true.
  screen: string | null;
  viewport: string | null;
  dpr: number | null;
  cores: number | null;
  device_memory: number | null;
  connection: string | null;
}

const STORAGE_KEY = "bpm_attribution";
const CONSENT_KEY = "cookie_consent";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

// Ad-platform click identifiers worth keeping for paid-channel attribution.
export const CLICK_ID_KEYS = [
  "gclid", // Google Ads
  "gbraid",
  "wbraid",
  "dclid", // Google Display
  "fbclid", // Meta
  "ttclid", // TikTok
  "twclid", // X / Twitter
  "li_fat_id", // LinkedIn
  "msclkid", // Microsoft / Bing
  "igshid", // Instagram
  "epik", // Pinterest
  "rdt_cid", // Reddit
] as const;

interface StoredAttribution {
  utm: Record<string, string>;
  click_ids: Record<string, string>;
  referrer: string | null;
  landing_path: string | null;
}

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

function emptyPayload(consent = false): AttributionPayload {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    click_ids: null,
    referrer: null,
    landing_path: null,
    language: null,
    timezone: null,
    consent,
    screen: null,
    viewport: null,
    dpr: null,
    cores: null,
    device_memory: null,
    connection: null,
  };
}

/**
 * Snapshot the entry context. Runs once per session (sessionStorage guard) so
 * the LANDING url/referrer wins over later in-app navigation.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);

    const utm: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 200);
    }

    const click_ids: Record<string, string> = {};
    for (const k of CLICK_ID_KEYS) {
      const v = params.get(k);
      if (v) click_ids[k] = v.slice(0, 200);
    }

    // Only keep an EXTERNAL referrer (ignore same-origin internal navigations).
    let referrer: string | null = null;
    try {
      const r = document.referrer;
      if (r && new URL(r).host !== window.location.host) referrer = r.slice(0, 500);
    } catch {
      /* malformed referrer - ignore */
    }

    const stored: StoredAttribution = {
      utm,
      click_ids,
      referrer,
      landing_path: (window.location.pathname + window.location.search).slice(0, 500),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* storage blocked (private mode / disabled) - degrade silently */
  }
}

function readStored(): StoredAttribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAttribution) : null;
  } catch {
    return null;
  }
}

/** Build the payload to attach to a form submission. */
export function getAttribution(): AttributionPayload {
  if (typeof window === "undefined") return emptyPayload();

  const consent = hasConsent();
  let stored = readStored();
  if (!stored) {
    // Capture lazily if the tracker never ran (e.g. JS race).
    captureAttribution();
    stored = readStored();
  }

  const payload = emptyPayload(consent);

  if (stored) {
    payload.utm_source = stored.utm.utm_source ?? null;
    payload.utm_medium = stored.utm.utm_medium ?? null;
    payload.utm_campaign = stored.utm.utm_campaign ?? null;
    payload.utm_term = stored.utm.utm_term ?? null;
    payload.utm_content = stored.utm.utm_content ?? null;
    payload.click_ids = Object.keys(stored.click_ids).length ? stored.click_ids : null;
    payload.referrer = stored.referrer;
    payload.landing_path = stored.landing_path;
  }

  // Always-legal lightweight context.
  try {
    payload.language = navigator.language ? navigator.language.slice(0, 35) : null;
  } catch {
    /* ignore */
  }
  try {
    payload.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    /* ignore */
  }

  // Richer device signals only with explicit consent (fingerprinting-grade).
  if (consent) {
    try {
      payload.screen = `${window.screen.width}x${window.screen.height}`;
    } catch {
      /* ignore */
    }
    try {
      payload.viewport = `${window.innerWidth}x${window.innerHeight}`;
    } catch {
      /* ignore */
    }
    try {
      payload.dpr = window.devicePixelRatio ?? null;
    } catch {
      /* ignore */
    }
    try {
      payload.cores = navigator.hardwareConcurrency ?? null;
    } catch {
      /* ignore */
    }
    try {
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      payload.device_memory = typeof mem === "number" ? mem : null;
    } catch {
      /* ignore */
    }
    try {
      const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
      payload.connection = conn?.effectiveType ?? null;
    } catch {
      /* ignore */
    }
  }

  return payload;
}
