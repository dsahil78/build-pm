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
