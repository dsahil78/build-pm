"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track, flush, startFlushLoop } from "@/lib/journey";

const SCROLL_MARKS = [25, 50, 75, 90, 100];

/**
 * Cookieless funnel instrumentation: page views, scroll depth, section views
 * (elements with [data-section]), clicks on links/buttons, and time-on-page.
 * Renders nothing. Every handler is wrapped so it can never break the page.
 */
export function JourneyTracker() {
  const pathname = usePathname();
  const enteredAt = useRef<number>(Date.now());
  const scrollMarks = useRef<Set<number>>(new Set());
  const seenSections = useRef<Set<string>>(new Set());

  // page_view per route, page_exit (with time-on-page) when leaving it.
  useEffect(() => {
    enteredAt.current = Date.now();
    scrollMarks.current = new Set();
    track("page_view", { referrer: typeof document !== "undefined" ? document.referrer || null : null });
    return () => {
      track("page_exit", { duration_ms: Date.now() - enteredAt.current });
    };
  }, [pathname]);

  // Scroll depth milestones (once each per route).
  useEffect(() => {
    function onScroll() {
      try {
        const doc = document.documentElement;
        const total = doc.scrollHeight - doc.clientHeight;
        if (total <= 0) return;
        const pct = Math.min(100, Math.round((window.scrollY / total) * 100));
        for (const mark of SCROLL_MARKS) {
          if (pct >= mark && !scrollMarks.current.has(mark)) {
            scrollMarks.current.add(mark);
            track("scroll", { depth: mark });
          }
        }
      } catch {
        /* ignore */
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Section views via IntersectionObserver on [data-section] (once per session).
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const name = (entry.target as HTMLElement).dataset.section;
            if (name && !seenSections.current.has(name)) {
              seenSections.current.add(name);
              track("section_view", { section: name });
            }
          }
        },
        { threshold: 0.4 },
      );
      document
        .querySelectorAll<HTMLElement>("[data-section]")
        .forEach((el) => observer?.observe(el));
    } catch {
      /* ignore */
    }
    return () => observer?.disconnect();
  }, [pathname]);

  // Clicks on links and buttons (anonymous: label text + href only).
  useEffect(() => {
    function onClick(ev: MouseEvent) {
      try {
        const el = (ev.target as HTMLElement | null)?.closest("a, button") as
          | HTMLElement
          | null;
        if (!el) return;
        const href = el.getAttribute("href");
        track("cta_click", {
          cta: el.dataset.cta ?? href ?? el.getAttribute("aria-label") ?? null,
          label: (el.textContent ?? "").trim().slice(0, 80) || null,
        });
      } catch {
        /* ignore */
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Flush on tab hide / unload, plus a periodic loop.
  useEffect(() => {
    startFlushLoop();
    function onHide() {
      track("page_exit", { duration_ms: Date.now() - enteredAt.current });
      flush(true);
    }
    function onVisibility() {
      if (document.visibilityState === "hidden") onHide();
    }
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
