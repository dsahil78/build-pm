"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

/* Sun / moon drawn to match the site's icon set: 24-grid, stroke-1.5,
   currentColor, round caps. (No external icon library.) */
function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const noopSubscribe = () => () => {};
/** True only after client hydration — avoids a theme hydration mismatch
 * without a setState-in-effect. */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Accessible light/dark toggle. Renders a real <button> with an aria-label
 * that reflects the action, a 44x44 hit area, and the global focus-visible
 * ring. Theme is only known on the client, so we render an inert placeholder
 * until mounted.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  // Before mount, reserve the same space but render nothing interactive.
  if (!mounted) {
    return <span className={`inline-block h-11 w-11 ${className}`} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border-base text-foreground transition-colors hover:bg-muted ${className}`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
