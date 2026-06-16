"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Snapshots the landing context (UTM / click IDs / referrer / landing path)
 * once on first load, before any client-side navigation can overwrite it.
 * Renders nothing.
 */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
