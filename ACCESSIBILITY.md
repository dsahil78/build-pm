# Accessibility (WCAG 2.1 AA)

This document describes BuildPM's theming + accessibility system, the color
tokens and their contrast ratios in **both themes**, what's compliant, what's
still open, and how to keep new work compliant.

---

## 1. Theme system

- **Library:** `next-themes` (`attribute="class"`, `defaultTheme="system"`,
  `enableSystem`, `disableTransitionOnChange`), wired in
  [`components/providers/ThemeProvider.tsx`](components/providers/ThemeProvider.tsx)
  and mounted in [`app/layout.tsx`](app/layout.tsx).
- **Three states:** Light, Dark, System (system = follow OS
  `prefers-color-scheme`). Manual choice persists in `localStorage`.
- **No FOUC:** next-themes injects a blocking `<head>` script that sets the
  `.dark`/`.light` class **and** `color-scheme` before first paint.
- **`color-scheme`** is set per theme (in CSS `:root` / `.dark`) so native UI
  (scrollbars, form controls, autofill) matches the theme.
- **Toggle:** [`components/shared/ThemeToggle.tsx`](components/shared/ThemeToggle.tsx)
  — a real `<button>` with a state-reflecting `aria-label`
  ("Switch to light/dark mode"), sun/moon icons, a 44×44 hit area, the global
  focus-visible ring, and a `useSyncExternalStore` mount guard (no hydration
  mismatch). Currently a light⇄dark toggle; System is the first-load default.

## 2. Color token system

All colors are **semantic CSS variables** defined in
[`app/globals.css`](app/globals.css) and exposed to Tailwind via `@theme inline`,
so utilities like `bg-background` / `text-foreground` resolve at runtime per
theme. **Components reference tokens, never hardcoded hex** (the only intentional
exceptions are the always-dark "product screenshots": the hero terminal and the
ProductPreview app mockup, which stay dark in both themes by design).

| Token (utility) | Light value | Dark value | Role |
|---|---|---|---|
| `background` | `#F7F6F3` | `#1A1A1A` | page background |
| `foreground` | `#1A1A1A` | `#FFFFFF` | primary text |
| `card` | `#FFFFFF` | `#242424` | elevated surface |
| `muted` | `#EEEDEB` | `#242424` | subtle surface |
| `muted-foreground` | `#52514E` | `#A3A29E` | secondary text |
| `subtle-foreground` | `#6B6A67` | `#8C8B88` | tertiary text |
| `border-base` / `border-strong` | `#D5D4D0` / `#A3A29E` | `#333333` / `#72716E` | dividers / UI edges |
| `accent` | `#FF5733` | `#FF5733` | coral **fills** (buttons, tints) |
| `accent-foreground` | `#1A1A1A` | `#1A1A1A` | text **on** coral fills |
| `accent-text` | `#BE3A1D` | `#FF5733` | coral used as **text** |
| `input` / `input-border` | `#FFFFFF` / `#D5D4D0` | `#242424` / `#3A3A3A` | form fields |
| `ring` | `#FF5733` | `#FF5733` | focus ring |
| `success` / `warning` / `error` / `info` | `#15803D` / `#B45309` / `#B91C1C` / `#1D4ED8` | `#4ADE80` / `#FBBF24` / `#F87171` / `#60A5FA` | status |

### Why two coral tokens?
The brand coral `#FF5733` is only **3.15:1** against white and **2.85:1** as text
on the light background — both fail AA. So:
- **`accent`** (`#FF5733`) is used only as a **fill** with **`accent-foreground`**
  (near-black) text → **5.5:1** (passes).
- **`accent-text`** is the coral used for **text/links/eyebrows**: the brand coral
  on dark (5.5:1) but a deepened coral `#BE3A1D` on light (5.1:1).

## 3. Contrast ratios — key pairs (both themes)

All meet WCAG AA (normal text ≥ 4.5:1; large text / UI ≥ 3:1).

| Pair | Light | Dark |
|---|---|---|
| foreground on background | 16.1:1 | 17.4:1 |
| muted-foreground on background | 7.4:1 | 6.8:1 |
| subtle-foreground on background | 5.0:1 | 5.1:1 |
| accent-text on background | 5.1:1 | 5.5:1 |
| accent-foreground on accent (button) | 5.5:1 | 5.5:1 |
| error text on background | 6.0:1 | 6.3:1 |

## 4. What was done (by WCAG principle)

**Perceivable**
- Decorative SVGs are `aria-hidden`; meaningful logos use `role="img"` +
  `aria-label` + `<title>`. No `<img>` tags without alt.
- Contrast fixed at the **palette** level for both themes (table above). Secondary
  text was moved off the failing `grey-500/600` to passing tokens.
- Color is never the sole signal: form errors use `role="alert"` + text + a red
  border + `aria-invalid`; links are underlined on hover and use the accent-text
  token.
- Font sizes use `rem`-based Tailwind scale; layout reflows to 320px.

**Operable**
- Skip-to-content link is the first focusable element ([`app/layout.tsx`](app/layout.tsx));
  every page exposes `id="main-content"` on its `<main>`.
- Visible focus ring via global `:focus-visible` (never bare `outline:none`).
- Theme toggle and mobile menu button are 44×44; both keyboard operable.
- `prefers-reduced-motion`: CSS `@media` rule neutralizes CSS animations/transitions
  **and** `MotionConfig reducedMotion="user"` makes every framer-motion animation
  honor it.

**Understandable**
- `<html lang="en">`; per-route `<title>` via Next metadata.
- Inputs ([`components/ui/Input.tsx`](components/ui/Input.tsx)) have associated
  `<label>` (or `aria-label` for the inline newsletter), `aria-describedby` for
  hints/errors, `aria-invalid`, and error text that says how to fix the problem.
- Navigation is consistent (shared `Navbar` / `Footer`).

**Robust**
- Landmarks: `header`/`nav` (Navbar), one `<main id="main-content">` per page,
  `footer`. One `<h1>` per page (the 404 headline is now an `<h1>`).
- Native elements over `div+onClick`; `aria-expanded` on the mobile menu;
  `aria-live` regions announce form success/error.

## 5. Known issues / open items

- **OG/social image & favicon** (`/og/default.png`) are raster assets that still
  show old branding and are single-theme — regenerate in a design tool.
- **404 robot illustration** ([`app/not-found.tsx`](app/not-found.tsx)) is a
  decorative multi-color SVG tuned for dark; one white highlight is faint on the
  light background. Decorative + low-traffic; tokenize if it becomes prominent.
- **Hero typing animation** reveals text via JS timers; under reduced-motion it
  still types (it does not flash and can be skipped with any key/scroll).
  Consider auto-completing it when `prefers-reduced-motion` is set.
- **Hidden post-launch sections** (ToolShelf, HowItWorks, Testimonials, etc.) were
  migrated to tokens but are not rendered in pre-launch — give them a visual QA
  pass in both themes when you enable them.
- **Explicit "System" control:** the nav toggle is light⇄dark; System is the
  default but isn't a discrete button. Add a 3-option menu if desired.

## 6. Verification

- **Automated lint:** `eslint-plugin-jsx-a11y` (recommended) is wired into
  [`eslint.config.mjs`](eslint.config.mjs). `npm run lint` is clean.
- **Recommended before release** (needs a browser; run locally):
  ```bash
  npm run build && npm start            # serve prod build
  npx @axe-core/cli http://localhost:3000 http://localhost:3000/apply \
      http://localhost:3000/partners http://localhost:3000/privacy \
      http://localhost:3000/terms
  # repeat with the site toggled to light AND dark
  # or: Lighthouse (Chrome DevTools) → Accessibility, per route, per theme
  ```
- **Manual passes to keep doing:** full keyboard nav per page; toggle persistence
  across refresh; 200% zoom; 320px width.

## 7. Keeping it compliant when adding components

1. **Never hardcode hex.** Use tokens: `bg-background`, `bg-card`, `text-foreground`,
   `text-muted-foreground`, `border-border-base`, etc.
2. **Coral:** `bg-accent` + `text-accent-foreground` for buttons; `text-accent-text`
   for coral text/links. Never `text-white` on coral.
3. **Text contrast:** body text → `foreground`/`muted-foreground`; only use
   `subtle-foreground` for genuinely tertiary text (it's the AA floor).
4. **Interactive = native element** (`<button>`, `<a>`), with a visible focus state,
   a 44px target, and an `aria-label` if the label isn't text.
5. **Forms:** use the `Input`/`Textarea`/`Select` components (they wire up labels +
   describedby + invalid). Announce async results in an `aria-live` region.
6. **Decorative SVG → `aria-hidden="true"`.** Meaningful SVG → `role="img"` + label.
7. **Run `npm run lint`** (jsx-a11y) and an axe/Lighthouse pass **in both themes**
   before merging.
