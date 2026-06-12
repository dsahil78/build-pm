"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ComponentProps } from "react";

/**
 * Wraps next-themes. Adds `.dark` / `.light` to <html> before paint via its
 * blocking script (prevents FOUC), persists the manual choice to localStorage,
 * and falls back to the OS `prefers-color-scheme` for the "system" option.
 *
 * MotionConfig reducedMotion="user" makes every framer-motion animation honor
 * the OS `prefers-reduced-motion` setting (the CSS @media rule only covers
 * CSS animations/transitions, not framer-motion's JS-driven ones).
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
