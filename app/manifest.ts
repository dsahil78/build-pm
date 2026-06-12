import type { MetadataRoute } from "next";

/**
 * Web app manifest for "Add to Home Screen".
 * Next.js links this automatically at /manifest.webmanifest.
 *
 * Per-theme browser chrome color is handled by the `themeColor` media array in
 * the `viewport` export (app/layout.tsx); the manifest carries a single
 * dark-first fallback (the brand is dark-first).
 *
 * TODO(design): replace the 32px programmatic icon below with exported PNGs —
 * at minimum 192x192 and 512x512, plus a 512x512 `purpose: "maskable"` icon
 * (safe-zone padded) and a 180x180 apple-touch-icon — for crisp home-screen
 * and splash rendering.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BuildPM — For product people who ship",
    short_name: "BuildPM",
    description:
      "A community for PMs who build and ship. Free enterprise tools, build squads, career growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A1A1A",
    theme_color: "#1A1A1A",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
    ],
  };
}
