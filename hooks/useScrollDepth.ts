"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100];

/** Fires analytics events when the user scrolls past 25/50/75/100% milestones. */
export function useScrollDepth() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) {
          ticking = false;
          return;
        }

        const pct = Math.round((window.scrollY / scrollHeight) * 100);

        for (const milestone of MILESTONES) {
          if (pct >= milestone && !firedRef.current.has(milestone)) {
            firedRef.current.add(milestone);
            analytics.trackScrollDepth(milestone);
          }
        }

        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
