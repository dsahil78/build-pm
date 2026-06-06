import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    capture_pageview: false, // manual SPA tracking via PostHogPageView
    capture_pageleave: true,
    autocapture: true,
    persistence: "localStorage+cookie",
    opt_out_capturing_by_default: true, // GDPR: no tracking until cookie consent
    respect_dnt: true,
    session_recording: {
      maskAllInputs: true,
    },
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") ph.debug();
    },
  });
}
