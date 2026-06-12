"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Wraps next-themes. Adds `.dark` / `.light` to <html> before paint via its
 * blocking script (prevents FOUC), persists the manual choice to localStorage,
 * and falls back to the OS `prefers-color-scheme` for the "system" option.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
