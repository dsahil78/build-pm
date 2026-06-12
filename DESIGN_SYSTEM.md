# BuildPM — Design System

The single source of truth lives in [`app/globals.css`](app/globals.css) as CSS
variables exposed to Tailwind v4 via `@theme` / `@theme inline`. **Components must
consume tokens — never hardcode a font size, color, radius, shadow, or spacing
value.** Theme-aware values switch between `:root` (light) and `.dark`.

---

## Typography

**Typeface:** Geist Sans (display + UI/body) and Geist Mono (terminal / code),
loaded self-hosted via `next/font` (`geist` package) in
[`app/layout.tsx`](app/layout.tsx) — variable fonts, zero layout shift,
`font-display: swap`. At most two families.

**Type scale** — modular ~1.25, fluid `clamp()` on the largest three. Each step
carries its own line-height, tracking, and weight, exposed as `text-*` utilities.

| Token | Size | Line-height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `text-display` | `clamp(2.5→3.75rem)` | 1.04 | -0.03em | 700 | hero / page hero statements |
| `text-h1` | `clamp(2.125→3rem)` | 1.08 | -0.025em | 700 | page H1 |
| `text-h2` | `clamp(1.75→2.25rem)` | 1.12 | -0.02em | 600 | section headings |
| `text-h3` | 1.5rem (24) | 1.2 | -0.015em | 600 | sub-headings |
| `text-h4` | 1.25rem (20) | 1.3 | -0.01em | 600 | card titles |
| `text-body-lg` | 1.125rem (18) | 1.6 | — | 400 | lead paragraphs |
| `text-body` | 1rem (16) | 1.65 | — | 400 | body (min size) |
| `text-body-sm` | 0.875rem (14) | 1.55 | — | 400 | secondary / UI |
| `text-caption` | 0.75rem (12) | 1.45 | — | 500 | overlines, labels, meta |

**Rules**
- Every text element maps to exactly one step — no orphan font sizes.
- Weights used: 400 (body), 500 (labels/medium), 600 (headings h2–h4), 700
  (display/h1). Same hierarchy level → same weight, always.
- Prose containers cap at `.measure` (68ch) for a 60–75 character line.
- Headings use `text-wrap: balance`; body uses `text-wrap: pretty` (base styles).
- Stats/metrics and mono use tabular figures (`.tabular-nums` / `.font-mono`).
- Overline pattern: `text-caption font-semibold tracking-wider uppercase text-accent-text`.

## Color

Semantic tokens, defined for **both themes**. Light = warm off-white; dark is not
an inverted light theme (lower-saturation surfaces, **elevation by lighter tints,
not shadow**). No pure `#000`/`#fff` as large surfaces (page bg is `#F7F6F3` /
`#1A1A1A`).

| Token | Light | Dark | Role | Contrast (on bg) |
|---|---|---|---|---|
| `background` | `#F7F6F3` | `#1A1A1A` | page | — |
| `card` | `#FFFFFF` | `#242424` | surface | — |
| `elevated` | `#FFFFFF` | `#2A2A2A` | surface-elevated | — |
| `muted` | `#EEEDEB` | `#242424` | subtle surface | — |
| `foreground` | `#1A1A1A` | `#FFFFFF` | text-primary | 16.1 / 17.4 |
| `muted-foreground` | `#52514E` | `#A3A29E` | text-secondary | 7.4 / 6.8 |
| `subtle-foreground` | `#6B6A67` | `#8C8B88` | text-tertiary | 5.0 / 5.1 |
| `border-subtle` / `border-base` / `border-strong` | `#E7E6E2` / `#D5D4D0` / `#A3A29E` | `#2A2A2A` / `#333` / `#72716E` | dividers / edges | ≥3:1 (strong) |
| `accent` | `#FF5733` | `#FF5733` | primary action fill | — |
| `accent-hover` | `#F0461F` | `#FF6F4F` | accent hover | — |
| `accent-foreground` | `#1A1A1A` | `#1A1A1A` | text on accent fill | 5.5 / 5.5 |
| `accent-text` | `#FF5733` | `#FF5733` | coral as text/links | 2.85 ⚠ / 5.5 |
| `success`/`warning`/`error`/`info` | `#15803D`/`#B45309`/`#B91C1C`/`#1D4ED8` | `#4ADE80`/`#FBBF24`/`#F87171`/`#60A5FA` | status | ≥4.5 |

**Accent discipline:** coral is for primary actions, links, focus, and key
moments only — never as a default surface or for body copy.

**Known exception:** `accent-text` is kept at brand `#FF5733` in both themes by
product decision → coral *text* on the light background is 2.85:1 (below AA). One
deliberate exception; coral *buttons* (dark text on coral) are 5.5:1. See
[ACCESSIBILITY.md](ACCESSIBILITY.md). Everything else meets WCAG AA in both themes.

## Spacing & layout

- **Scale:** Tailwind's 4px base (`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`). All
  margins/padding/gaps snap to it.
- **Page grid:** content `max-w-6xl/7xl` centered; horizontal padding
  `px-4 sm:px-6 lg:px-8`.
- **Vertical rhythm:** sections `py-24 md:py-32` (96 / 128px) — generous whitespace.

## Radius

Refined, smooth progression; three effective tiers.

| Token | Value | Use |
|---|---|---|
| `rounded-sm` / `rounded-md` | 6 / 8px | tags, chips, small controls |
| `rounded-lg` | 10px | inputs, standard buttons |
| `rounded-xl` | 14px | large buttons, small cards |
| `rounded-2xl` | 18px | cards |
| `rounded-3xl` | 22px | feature blocks, hero terminal |

Nested radii: inner = outer − padding.

## Shadows

Soft, layered, low-opacity, warm-tinted (`rgba(26,22,18,…)`). Overrides Tailwind's
`shadow-sm…2xl`. **In dark mode, prefer surface-tint elevation over shadow.**

| Token | Elevation |
|---|---|
| `shadow-sm` | resting cards |
| `shadow-md` | hover lift |
| `shadow-lg` / `shadow-xl` | floating panels |
| `shadow-2xl` | banners / modals |

## Motion

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` (default) |
| `--duration-fast` | 150ms — hover/press feedback |
| `--duration-normal` | 220ms — content reveal |
| `--duration-slow` | 360ms — larger transitions |

Reveal-on-scroll is fast and **once-only**. No UI feedback animation > 400ms,
nothing bouncy. `prefers-reduced-motion` is respected via the CSS `@media` rule
**and** framer-motion `MotionConfig reducedMotion="user"`.

## Component rules

- **Buttons** ([`components/ui/Button.tsx`](components/ui/Button.tsx)): fixed
  heights **40 / 44 / 48px** (sm/md/lg); variants primary (accent + `accent-hover`),
  secondary (accent outline), ghost. Every interactive element has hover, active
  (`translate-y-px`), focus-visible (global ring), and disabled
  (`opacity-50 pointer-events-none`) states; transitions use the motion tokens.
- **Forms** ([`components/ui/Input.tsx`](components/ui/Input.tsx)): share the input
  surface/border/radius; visible accent focus border; label + `aria-describedby`
  (hint/error) + `aria-invalid`; placeholder uses `subtle-foreground`.
- **Cards**: `bg-card` + `border-border-base` + `rounded-2xl`; hover lifts via
  `-translate-y` + shadow/`elevated`, never a hard border flash.
- **Section headings** follow one pattern: overline (`text-caption` accent) →
  heading (`text-h2`) → optional subtext (`text-body-lg muted-foreground`).
- **Icons:** a single hand-rolled SVG set — 24-grid, **stroke-1.5**,
  `currentColor`, sized 16/20/24, round caps, `aria-hidden` when decorative. No
  external icon library (the theme toggle's sun/moon are drawn to match;
  `lucide-react` was removed). Illustrations (404 robot) and the product
  "screenshots" are a separate, intentional category.
- **Always-dark zones** (hero terminal, ProductPreview mockup) are intentional
  "product screenshots" and stay dark in both themes.

## Before / after — most significant changes

1. **Fonts actually load.** Before: `globals.css` *named* Inter but nothing loaded
   it (system fallback). After: Geist Sans/Mono via `next/font`, zero layout shift.
2. **One coherent type scale.** Before: ad-hoc `text-3xl sm:text-4xl …` per heading,
   mixed weights/tracking. After: fluid `text-display/h1/h2/h3/h4` tokens with
   baked line-height + tracking + weight; ~50 headings remapped; consistent
   semibold headings (Linear/Stripe-class), bold only for display/h1.
3. **Tokenized geometry & motion.** Before: hardcoded gradients, `brightness-110`
   hovers, `scale-[1.02]` toy bounces, harsh `box-shadow`. After: radius + soft
   layered shadow scales, `accent-hover` token, restrained transitions on the
   motion tokens.
4. **Refined palette + elevation.** `accent-hover`, `border-subtle` added;
   warm-tinted shadows; dark mode elevates by surface tint, not shadow.

## Open items (need a browser or are larger efforts)

- **Per-breakpoint visual QA** (375 / 768 / 1280 / 1536, both themes) and **axe**
  can't run headless here — commands in [ACCESSIBILITY.md](ACCESSIBILITY.md).
  Build + `eslint-plugin-jsx-a11y` are clean.
- **Small body sizes** (`text-[13px]`, `text-[11px]`) in a few dense mockups could
  snap to `text-caption`; left where the dark "screenshot" density is intentional.
