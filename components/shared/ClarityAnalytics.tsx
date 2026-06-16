"use client";

import { useEffect } from "react";

// Public Clarity project id (safe to ship client-side). Override via env if you
// ever swap projects.
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "x849tjnykx";
const CONSENT_KEY = "cookie_consent";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

let loaded = false;

/** Inject the Microsoft Clarity tag (heatmaps + session replay). Runs once. */
function loadClarity() {
  if (loaded || typeof window === "undefined" || !CLARITY_PROJECT_ID) return;
  loaded = true;

  if (!window.clarity) {
    const fn: ClarityFn = function (...args: unknown[]) {
      (fn.q = fn.q || []).push(args);
    };
    window.clarity = fn;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  const first = document.getElementsByTagName("script")[0];
  if (first?.parentNode) first.parentNode.insertBefore(script, first);
  else document.head.appendChild(script);
}

/**
 * Loads Clarity ONLY after the visitor accepts cookies (same gate as PostHog).
 * Picks up returning visitors who already consented, and starts immediately
 * when they click Accept (CookieConsent dispatches `bpm:consent-granted`).
 */
export function ClarityAnalytics() {
  useEffect(() => {
    function maybeLoad() {
      try {
        if (localStorage.getItem(CONSENT_KEY) === "granted") loadClarity();
      } catch {
        /* storage blocked - ignore */
      }
    }
    maybeLoad();
    window.addEventListener("bpm:consent-granted", maybeLoad);
    return () => window.removeEventListener("bpm:consent-granted", maybeLoad);
  }, []);

  return null;
}
