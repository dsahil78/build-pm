/**
 * Cookieless, anonymous, first-party journey tracking (client side).
 *
 * Buffers events and flushes them in batches to /api/track via sendBeacon
 * (reliable on page unload) or a keepalive fetch. No persistent identifier and
 * no PII: events are grouped by an ephemeral sessionStorage id (see
 * getSessionId in lib/attribution). Legitimate-interest, consent-free coverage
 * of every visitor's funnel.
 */
import { getAttribution, getSessionId } from "./attribution";

const ENDPOINT = "/api/track";
const FLUSH_INTERVAL_MS = 10_000;
const MAX_BUFFER = 20;

interface JourneyEvent {
  type: string;
  path: string;
  t: number;
  props?: Record<string, unknown>;
}

let buffer: JourneyEvent[] = [];

function currentPath(): string {
  try {
    return window.location.pathname;
  } catch {
    return "";
  }
}

/** Queue a journey event. Flushes early if the buffer fills up. */
export function track(type: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  buffer.push({ type, path: currentPath(), t: Date.now(), props });
  if (buffer.length >= MAX_BUFFER) flush();
}

/** Send everything currently buffered. Uses sendBeacon on unload paths. */
export function flush(useBeacon = false): void {
  if (typeof window === "undefined" || buffer.length === 0) return;

  const payload = {
    session_id: getSessionId(),
    attribution: getAttribution(),
    events: buffer,
  };
  buffer = [];

  try {
    const body = JSON.stringify(payload);
    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        /* analytics must never surface an error */
      });
    }
  } catch {
    /* ignore */
  }
}

// ── Returning-abandoner detection (anonymous, no email, no identifier) ───────
// When a visitor starts a form and leaves without submitting, we leave a single
// anonymous flag on the device. On a later visit we recognize it and log that
// they came back, then clear it once they finally submit. No PII is stored.
const ABANDON_KEY = "bpm_abandoned";
const RETURN_FIRED_KEY = "bpm_return_fired";
const ABANDON_TTL_MS = 30 * 24 * 60 * 60 * 1000; // ignore flags older than 30 days

export function markAbandoned(form: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      ABANDON_KEY,
      JSON.stringify({ at: Date.now(), form, sid: getSessionId() }),
    );
  } catch {
    /* storage blocked - ignore */
  }
}

export function clearAbandoned(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ABANDON_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * On load: if this device abandoned a form in a PRIOR session (and not too long
 * ago), log a single `returned_after_abandon` event. Fires at most once per
 * session. Pairs with a later `form_submit` to measure recovery.
 */
export function checkReturningAbandoner(): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(ABANDON_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as { at?: number; form?: string; sid?: string };
    if (!data?.at) return;

    if (Date.now() - data.at > ABANDON_TTL_MS) {
      clearAbandoned();
      return;
    }
    if (data.sid === getSessionId()) return; // same visit, not a return
    if (sessionStorage.getItem(RETURN_FIRED_KEY)) return; // already counted this session

    sessionStorage.setItem(RETURN_FIRED_KEY, "1");
    track("returned_after_abandon", {
      form: data.form ?? null,
      hours_since: Math.round((Date.now() - data.at) / 3_600_000),
    });
  } catch {
    /* ignore */
  }
}

let intervalId: ReturnType<typeof setInterval> | null = null;

/** Start the periodic flush loop (idempotent). */
export function startFlushLoop(): void {
  if (intervalId !== null || typeof window === "undefined") return;
  intervalId = setInterval(() => flush(false), FLUSH_INTERVAL_MS);
}

export function stopFlushLoop(): void {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
