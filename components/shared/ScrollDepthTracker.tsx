"use client";

import { useScrollDepth } from "@/hooks/useScrollDepth";

/** Client component that activates scroll depth tracking. Renders nothing. */
export function ScrollDepthTracker() {
  useScrollDepth();
  return null;
}
