# Performance & Lighthouse

Target: **100/100/100/100** (Performance, Accessibility, Best Practices, SEO) on
mobile **and** desktop, every route. This file records the code-level work done,
what still needs **real measurement**, and how to verify.

> **Honest status:** the verification deliverable (Lighthouse runs, 3× per route,
> mobile + desktop) **was not run here** — this environment has no browser, and
> localhost wouldn't reflect Vercel's Brotli / immutable cache headers / CDN edge
> anyway. The fixes below were made and verified with `next build` + `eslint`
> (incl. `jsx-a11y`). **Run §4 against the Vercel deployment** for the real scores.
> No scores in this doc are fabricated.

## 1. What is already optimal (don't regress)

- **Static rendering (SSG).** `/ , /apply, /partners, /privacy, /terms` build as
  `○ (Static)` — prerendered, not SSR-on-request. (Confirm in `next build` output.)
- **Fonts.** Geist Sans/Mono via `next/font` (`geist` package) — self-hosted,
  preloaded, `font-display: swap`, fallback metrics → **zero font CLS / no swap
  shift**. LCP is the hero **text** headline painted in the preloaded font.
- **No raster images.** All iconography/illustration is inline SVG; there are
  **no `<img>` tags**, so nothing to over-download and no image CLS. (OG image is
  metadata-only — see §3.)
- **Analytics is same-origin.** PostHog is reverse-proxied through `/ingest`
  (rewrite in `next.config.ts`) so the browser makes **no third-party connection**
  → no preconnect needed; opt-out-by-default until cookie consent.
- **Headers.** HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`, CSP (report-only), and
  `poweredByHeader: false`.
- **No render-blocking JS before paint.** Only the tiny inline next-themes
  anti-FOUC script and inline JSON-LD (non-blocking).

## 2. Items that need a real Lighthouse run to close (measure, then fix)

These are the realistic gaps to a *guaranteed* 100 — left un-touched on purpose
because they're risky to change without before/after numbers:

1. **CLS from the hero typing animation.** `TerminalHero` reveals terminal lines
   over time, growing the box and pushing the CTA below it → layout shift. If
   mobile CLS > 0, the fix is to **reserve the terminal's final height** (render
   all line slots up front with `visibility: hidden` / opacity, or set a
   measured `min-height` on the terminal content) so nothing reflows. Measure
   first — over-reserving leaves dead space, under-reserving leaves shift.
2. **framer-motion bundle / TBT.** Reveal animations are site-wide. They use
   transform/opacity (compositor-friendly) and `once: true`, and respect
   reduced-motion — but the library ships to every route. If mobile TBT/INP needs
   headroom, lazy-load below-the-fold motion sections with `next/dynamic`
   (**keep `ssr: true`** so content stays in the HTML for SEO/LCP — never
   `ssr: false` on content), or replace simple reveals with CSS
   `@keyframes` + IntersectionObserver. Measure the bundle with
   `ANALYZE=true` + `@next/bundle-analyzer` first.
3. **OG image weight.** `/og/default.png` (1200×630) should be compressed
   (target < 100 KB, or ship WebP) — affects social unfurl + the BP "properly
   sized image" check if it's ever rendered.

## 3. SEO (done)

- Unique `<title>` + meta description + **canonical** per route (home, /apply,
  /partners via server layouts, /privacy, /terms). Fixed double-suffixed legal
  titles.
- `app/robots.ts` (allow all; disallow `/api`, `/preview`; sitemap + host).
- `app/sitemap.ts` includes all reachable routes.
- **JSON-LD:** `Organization` (root layout) + `FAQPage` (the "Before you apply"
  block) — rich-result eligible.
- OG/Twitter tags present (`metadataBase = https://buildpm.co`); per-theme
  `theme-color`; `robots: index, follow`.
- **Pre-launch caveat:** metadata routes (`/sitemap.xml`, `/robots.txt`, `/icon`,
  `/manifest.webmanifest`) are allow-listed in `middleware.ts` so the gate doesn't
  redirect them.

## 4. Verify (run against the Vercel deploy, not localhost)

```bash
# Per route, both form factors, 3x for Performance stability:
for p in / /apply /partners /privacy /terms; do
  for i in 1 2 3; do
    npx lighthouse "https://buildpm.co$p" --form-factor=mobile \
      --screenEmulation.mobile --throttling-method=simulate \
      --only-categories=performance,accessibility,best-practices,seo \
      --output=json --output-path="lh_m${p//\//_}_$i.json" --quiet
  done
  npx lighthouse "https://buildpm.co$p" --preset=desktop \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=json --output-path="lh_d${p//\//_}.json" --quiet
done
npx @axe-core/cli https://buildpm.co            # a11y, both themes
```

**Score table (fill from the runs — do not guess):**

| Route | Perf (m/d) | A11y (m/d) | Best Prac (m/d) | SEO (m/d) |
|---|---|---|---|---|
| / | / | / | / | / |
| /apply | / | / | / | / |
| /partners | / | / | / | / |
| /privacy | / | / | / | / |
| /terms | / | / | / | / |

> Targets: LCP < 2.0s, CLS = 0, TBT < 150ms. If Perf flickers 99↔100, the
> headroom is almost always (1) hero CLS or (2) a JS chunk — fix per §2 so
> there's margin, not a knife's edge.

## 5. How not to regress 100 (checklist for new components)

- [ ] **Images:** `next/image` only, with explicit `width`/`height` (or
      `aspect-ratio`), a correct `sizes`, AVIF/WebP, and `priority` only on the LCP
      image. Never a raw `<img>` or a CSS background for meaningful content.
- [ ] **Fonts:** use the existing Geist `next/font` setup — never add a
      `<link>`/`@import` web font (render-blocking + CLS).
- [ ] **No CLS:** reserve space for anything that appears after load (animations,
      async content, embeds). Animate transform/opacity only.
- [ ] **Dynamic import** below-the-fold *non-content* widgets with
      `next/dynamic` and **`ssr: true`**; never `ssr: false` on content (SEO/LCP).
- [ ] **Static by default:** keep marketing pages server components / SSG; push
      `"use client"` to the smallest leaf.
- [ ] **Third-party scripts:** same-origin proxy where possible (like PostHog), or
      `next/script strategy="lazyOnload"`; add `preconnect` for any real external
      origin.
- [ ] **Every route:** unique title + description + canonical; keep it crawlable
      (`<a href>`, not `onClick` divs).
- [ ] Run Lighthouse mobile **before merging** anything that adds JS or media.
