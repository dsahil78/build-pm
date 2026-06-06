"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";

const CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    posthog.opt_in_capturing();
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "denied");
    posthog.opt_out_capturing();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-xl mx-auto rounded-2xl bg-[#242424] border border-[#333] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-grey-300 flex-1">
          We use cookies to understand how you use our site and improve your
          experience.{" "}
          <a
            href="/privacy"
            className="text-brand-coral hover:underline"
          >
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-sm text-grey-400 hover:text-white rounded-lg border border-[#444] hover:border-[#555] transition-colors"
            style={{ transitionDuration: "var(--duration-fast)" }}
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm text-white bg-brand-coral rounded-lg hover:brightness-110 transition-all"
            style={{ transitionDuration: "var(--duration-fast)" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
