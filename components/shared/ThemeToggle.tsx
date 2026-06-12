"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

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
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5 transition-transform" aria-hidden="true" />
      )}
    </button>
  );
}
