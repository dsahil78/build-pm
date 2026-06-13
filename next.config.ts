import type { NextConfig } from "next";

/**
 * Content-Security-Policy — shipped REPORT-ONLY first (per perf/security brief)
 * so it can't break PostHog (proxied same-origin via /ingest), Vercel Analytics,
 * the next-themes inline script, or framer-motion inline styles. Promote to the
 * enforcing `Content-Security-Policy` header after watching violation reports on
 * the live deploy. 'unsafe-inline' is required because the static marketing pages
 * are SSG (no per-request nonce without opting into dynamic rendering).
 */
const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https://*.posthog.com https://*.i.posthog.com https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // drop the X-Powered-By header (security/best-practices)
  rewrites: async () => [
    {
      source: "/ingest/static/:path*",
      destination: "https://us-assets.i.posthog.com/static/:path*",
    },
    {
      source: "/ingest/:path*",
      destination: "https://us.i.posthog.com/:path*",
    },
    {
      source: "/ingest/decide",
      destination: "https://us.i.posthog.com/decide",
    },
  ],
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "geolocation=(), microphone=(), camera=(), payment=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      ],
    },
  ],
};

export default nextConfig;
