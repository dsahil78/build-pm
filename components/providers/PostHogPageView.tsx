"use client";

import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/** Tracks SPA page views on route change. PostHog init is handled by instrumentation-client.ts. */
export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!posthog.__loaded) return;
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}
