"use client";

import { useState, useSyncExternalStore } from "react";
import posthog from "posthog-js";

const CONSENT_KEY = "cookie_consent";

// No external changes to subscribe to — we only read the persisted value once.
const noopSubscribe = () => () => {};

export function CookieConsent() {
  // Read persisted consent via useSyncExternalStore: the server renders "pending"
  // (banner hidden), and the client reads localStorage after hydration — no
  // setState-in-effect and no hydration mismatch.
  const storedConsent = useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem(CONSENT_KEY),
    () => "pending",
  );
  const [dismissed, setDismissed] = useState(false);

  const visible = storedConsent === null && !dismissed;

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    posthog.opt_in_capturing();
    // Let consent-gated tools (e.g. Clarity) start immediately, no reload.
    window.dispatchEvent(new Event("bpm:consent-granted"));
    setDismissed(true);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "denied");
    posthog.opt_out_capturing();
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-xl mx-auto rounded-2xl bg-card border border-border-base px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-muted-foreground flex-1">
          We use cookies to understand how you use our site and improve your
          experience.{" "}
          <a
            href="/privacy"
            className="text-accent-text hover:underline"
          >
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg border border-input-border hover:border-border-strong transition-colors"
            style={{ transitionDuration: "var(--duration-fast)" }}
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm text-accent-foreground bg-accent rounded-lg hover:bg-accent-hover active:translate-y-px transition-all"
            style={{ transitionDuration: "var(--duration-fast)" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
