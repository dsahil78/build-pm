# Mobile — audit & fixes

Mobile is ~50% of traffic, so it's treated as half the product. This pass audited
every page from the code at 320 / 375 / 390–430 / 768 in both themes and fixed the
issues below. It builds on (and does not regress) the design-token system, WCAG 2.1
AA work, and the documented design system.

> **Verification note:** this environment has no headless browser, so the
> screenshot + Lighthouse-mobile artifacts could not be produced here. Fixes were
> made and reasoned from the code and verified with `next build` + `eslint`
> (incl. `jsx-a11y`). Run the commands in §5 locally to capture the numbers.

## 1. What was broken → what changed

| Area | Was | Fix |
|---|---|---|
| **iOS focus zoom** | Inputs at 14px → Safari zooms the page on focus | All fields → **16px** (`text-base`) in `Input` + the newsletter input |
| **Viewport / safe area** | No `viewport` export; notches unhandled | `viewport` export: `device-width`, `viewport-fit=cover`, per-theme `theme-color`; **zoom left enabled**. Safe-area helpers on fixed nav + corner toggles |
| **Mobile keyboards / autofill** | Generic keyboard, no autofill | Type-aware `inputMode`/`autocapitalize`/`autocorrect` + `autocomplete` on name/email/url/org fields |
| **Cavernous spacing** | `py-24`/`py-32` (96–128px) on phones | Compressed: `py-16 sm:py-24 md:py-32` etc. |
| **Pre-launch mobile nav** | Hamburger opened a one-item menu (just "Apply") | Surface **Apply** directly on mobile; hamburger only renders when real nav links exist |
| **Menu a11y** | No Escape / no scroll-lock | Mobile menu closes on **Escape**, **locks background scroll**, `aria-controls` |
| **Anchor jumps** | Fixed navbar covered anchor targets | `scroll-padding-top: 5rem` on `html` |
| **Long words/URLs** | Could blow out layout | `overflow-wrap: break-word` on `body` |
| **Touch targets** | Footer/nav links ~20px tall | Footer links `py-1.5`, mobile nav links `py-2.5`, toggle/hamburger 44px |
| **Tap feedback** | Hover-only (no response on touch) | `active:translate-y-px` on CTAs; deliberate `-webkit-tap-highlight-color` |
| **A2HS** | No manifest | `app/manifest.ts` (name, display, theme/background color, icon) |

## 2. Responsive rules added to the system

- **Type** already scales fluidly via `clamp()` in the type scale (display/h1/h2) —
  no per-breakpoint heading sizes needed; headings keep `text-wrap: balance`.
- **Inputs are 16px minimum** (design-system rule) to prevent iOS zoom.
- **Section rhythm:** mobile `py-16` → `sm:py-20/24` → `md:py-32`. Don't ship
  desktop-scale vertical padding to phones.
- **Touch targets ≥44px** by size or spacing for every interactive element.
- **Safe areas:** `.pt-safe`, `.inset-safe-top`, `.inset-safe-right` helpers
  (`env(safe-area-inset-*)`) for fixed/absolute chrome.
- **Hover effects** are automatically gated to pointer devices (Tailwind v4
  `hover:` = `@media (hover: hover)`), so hover styles never "stick" after a tap.

## 3. Layout integrity (audited, code-level)

- **No horizontal overflow** found: all multi-column sections are
  `grid-cols-1 …` / `flex-col md:flex-row` and collapse to one column; the only
  fixed widths are `max-w-*` or decorative absolute glows inside
  `overflow-hidden` parents. `overflow-wrap: break-word` is a safety net.
- **Mobile DOM order** is correct (single column, most important content first).
- **Images:** there are **no `<img>` tags** — all iconography/illustration is
  inline SVG and the OG image is metadata-only, so there is nothing for mobile to
  over-download and no image CLS. (If raster images are added later, use
  `next/image` with a `sizes` attribute.)

## 4. Performance notes

- **Fonts:** Geist via `next/font` (self-hosted, `font-display: swap`, preloaded)
  → zero font layout shift.
- **LCP** is the hero text headline (no image) — inherently fast; nothing to
  preload/lazy-load image-wise.
- **JS:** framer-motion drives reveal animations site-wide; reveals are
  `once: true` and use transform/opacity only (compositor-friendly), and respect
  `prefers-reduced-motion` (CSS rule + `MotionConfig reducedMotion="user"`).
  If a route's Lighthouse TBT/INP needs work, the lever is trimming framer-motion
  on below-the-fold sections — measure first.

## 5. Verify locally (commands)

```bash
npm run build && npm start        # serve the production build

# Lighthouse mobile per route (throttled):
for p in / /apply /partners /privacy /terms; do
  npx lighthouse "http://localhost:3000$p" \
    --preset=perf --form-factor=mobile --screenEmulation.mobile \
    --only-categories=performance,accessibility \
    --output=json --output-path="lh$(echo $p | tr / _).json" --quiet
done

# Screenshots at each width, both themes (Playwright):
npx playwright screenshot --viewport-size=320,720 http://localhost:3000 home-320.png
#   …repeat for 375 / 430 / 768, /apply /partners /privacy /terms, light+dark

# Accessibility (no regressions):
npm run lint                      # eslint + jsx-a11y (currently clean)
npx @axe-core/cli http://localhost:3000   # per route, both themes
```

**Targets:** LCP < 2.5s, CLS < 0.1, INP < 200ms, performance ≥ 90, zero
horizontal scroll, zero axe/jsx-a11y violations.

## 6. Checklist for keeping new components mobile-perfect

- [ ] No fixed `w-[…px]` that can exceed the viewport — use `max-w-*` + `w-full`.
- [ ] Inputs are **16px+**; correct `type`/`inputMode`/`autocomplete`.
- [ ] Every interactive element is **≥44px** (size or spacing) and has hover +
      **active** + focus-visible states.
- [ ] Multi-column layouts declare an intentional single-column mobile order.
- [ ] Section padding compresses on mobile (don't hardcode desktop `py-32`).
- [ ] Long/user-supplied strings can wrap (`break-words` if needed).
- [ ] Headings use the fluid type scale (`text-display/h1/h2`) — no manual
      per-breakpoint sizes.
- [ ] Fixed/absolute chrome respects safe-area insets.
- [ ] Test at 320px and one landscape orientation, in both themes, before merge.

## Known follow-ups

- **Icons for A2HS:** export a real **192 + 512 maskable PNG** and a 180
  apple-touch-icon; the manifest currently references the 32px programmatic icon
  (flagged in `app/manifest.ts`).
- **Real device QA + Lighthouse numbers:** run §5 on a throttled device profile;
  capture before/after for the record.
