# Launch checklist — buildpm.co

Status legend: **PASS** (verified in code) · **FIXED** (changed this pass) ·
**NEEDS-MANUAL** (you must confirm tonight — I cannot verify it from inside the
codebase).

> ⚠️ **Read first — the single biggest risk.** I cannot see your Supabase, Vercel
> env, Resend, or Analytics dashboards, so I **cannot confirm that submissions
> actually land**. The code is now correct and *fails loudly* instead of faking
> success — but you MUST do one real test submission on the deployment (item 1c).
> A green build is **not** proof the row was stored.

---

## TIER 1 — Conversion path

### 1. Apply form (/apply) end-to-end

- **Destination (PASS — documented):** `/apply` → `POST /api/apply`
  ([app/api/apply/route.ts](app/api/apply/route.ts)) → **Supabase** table
  `applications` via the service-role client
  ([lib/supabase-admin.ts](lib/supabase-admin.ts)). Partner form posts to the same
  route with `type:"partner"`. Waitlist → `POST /api/waitlist` → `waitlist` table.
- **Silent data-loss (FIXED):** previously, if Supabase env vars were missing the
  route logged and **still returned `{success:true}`** — the user saw "received"
  but nothing was stored. Now in production it returns **503 + a retry error** when
  no store is configured. (This is exactly the `NEXT_PUBLIC_PRELAUNCH`-style env
  gap that already bit us once.)
- **Validation (FIXED/PASS):** server requires full_name, valid email, valid
  LinkedIn URL (if present), **archetype + referral source** (newly required), and
  validates enum values + field lengths + JSON content-type. Client marks all
  required; inline field errors via the `Input` component (`aria-invalid` +
  `aria-describedby`).
- **Submission states (PASS):** loading (button disabled + "Submitting…"), success
  (confirmation view), error (human-readable message from the API + retry — no raw
  stack trace, no silent fail).
- **Double-submit (PASS):** submit button is `disabled` while `status==="submitting"`.
- **Spam (FIXED):** off-screen **honeypot** (`company_url`) on all three forms;
  server drops any submission where it's filled (verified locally: a filled
  honeypot returns `{success:true}` and never touches the store). Plus a per-IP
  rate limit (see item 4 for its real-world limits).
- **1c. CRITICAL — real test submission → NEEDS-MANUAL.** I can't reach the store.
  **Tonight:** on the deployed/preview URL, submit a real test application, then
  open **Supabase → Table editor → `applications`** and confirm the row is there
  (and a `waitlist` row from the homepage form, and a partner row). If it 503s or
  the row is missing → the Supabase env vars/tables aren't set up (item 1d).
- **1d. Supabase config → NEEDS-MANUAL.** Confirm on Vercel (Production):
  `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Confirm the tables exist with these columns and
  a **UNIQUE constraint on `email`** (the code relies on Postgres error `23505`
  for "already applied / already on waitlist"):
  - `applications`: full_name, email (unique), linkedin_url, archetype,
    shipped_recently, why_build_pm, referral_source, company, role, tier, message,
    type, status
  - `waitlist`: email (unique), source

### 2. The other two capture points

- **"Notify me" (homepage):** PASS — posts to `/api/waitlist`, honeypot + consent
  microcopy added, real loading/success/error states (no more fake success).
  Storage confirmation = **NEEDS-MANUAL** (item 1c).
- **"Partner with us" (/partners):** PASS — posts to `/api/apply` (`type:"partner"`),
  honeypot added, loading/success/error states. Storage = **NEEDS-MANUAL** (1c).

### 3. Applicant auto-confirmation email — FIXED (wiring) / NEEDS-MANUAL (setup)

- Wired in [lib/email.ts](lib/email.ts) (Resend REST API, no SDK dep,
  fire-and-forget so it never blocks/fails the submission). Sends an instant
  "we got it, we read every one, ≤7 days" reply on successful **builder** apply.
- **It is DORMANT until you set both** env vars on Vercel: `RESEND_API_KEY` and
  `EMAIL_FROM` (e.g. `BuildPM <hello@buildpm.co>`), **and verify the `buildpm.co`
  domain in Resend**. Until then no email is sent (by design — no broken sends).
  **Tonight:** add the keys, verify the domain, then apply with your own address
  and confirm the email arrives.

### 4. Endpoint resilience — PASS (with flags)

- Static marketing pages are SSG (scale freely on Vercel's CDN). The API routes are
  the only dynamic surface.
- **Backend down/slow (PASS):** Supabase errors → friendly 500/503 + retry, never
  a white screen. Email timeout is capped (4s) and swallowed.
- **Rate limit (FLAG):** it's **in-memory, per-serverless-instance**
  ([lib/rate-limit.ts](lib/rate-limit.ts)). Good news for launch: it **won't drop
  legitimate users** under a burst (each instance has its own counter). Bad news:
  it's weak against distributed spam — the **honeypot is the real defence**. For
  durable rate limiting, add Upstash/Vercel KV (post-launch is fine).
- **Quota risk (NEEDS-MANUAL):** a launch burst is low write-volume (hundreds–low
  thousands of rows) — well within Supabase free tier *storage*. Confirm your
  Supabase plan's **API request / connection limits** and Vercel's **function
  invocation** limits for your plan; both are fine for a normal burst but worth a
  glance if you expect tens of thousands of submits.

---

## TIER 2 — Trust & measurement

### 5. Analytics + conversion tracking — FIXED / NEEDS-MANUAL (confirm in prod)

- Pageviews: PostHog (consent-gated) + Vercel Analytics (`<Analytics/>`) +
  `<SpeedInsights/>` (added).
- **Conversions:** consent-free **Vercel custom events** now fire on success —
  `apply_submitted`, `notify_submitted`, `partner_submitted` — so apply-rate is
  measurable even for visitors who decline cookies (PostHog events stay gated
  behind consent and would under-count).
- **NEEDS-MANUAL:** after deploy, do a test submit and confirm the events show in
  **Vercel → Analytics → Events** (custom events need Web Analytics enabled on the
  project). Confirm Speed Insights is enabled for the project.

### 6. Founder note — NEEDS-MANUAL

- Removed the public-facing placeholder ("a proper founder note is coming here").
  The FAQ now has launch-safe but **anonymous** holding copy.
- **Tonight:** paste your real, **named** 2–3 sentence note into
  [components/landing/FAQ.tsx](components/landing/FAQ.tsx) ("Who's behind BuildPM?").
  A named note is far more credible than "builders, not bystanders." I did not
  invent a founder.

### 7. Partner claims — NEEDS-MANUAL (do not ship unverified)

I did **not** verify or invent any partnership. Here is **every committed-partner
claim presently shown** (all visible in pre-launch):

| Where | Exact copy |
|---|---|
| Hero terminal ([TerminalHero.tsx](components/landing/TerminalHero.tsx)) | "✓ $200K+ in enterprise tools **committed from launch partners**" |
| Builder stack ([BuilderValue.tsx](components/landing/BuilderValue.tsx)) | "$200K+ in tools **committed from 40+ launch partners**. **Cursor, Claude, AWS, Datadog.** Free for members." |
| FAQ "Is it free?" ([FAQ.tsx](components/landing/FAQ.tsx)) | "the $200K+ in enterprise tools **committed by our launch partners**" |
| (post-launch only, hidden) ToolShelf / SocialProof logos | 20 named brands incl. Anthropic, Cursor, AWS, Vercel, Stripe, GitHub… |

**If these are signed and approved for naming → leave as-is.** Otherwise swap in
this defensible copy (drops the "committed partnership" assertion):

- Hero → `✓ Free enterprise tools for every builder`
- BuilderValue → `$200K+ in the tools builders actually use — Cursor, Claude, AWS, Datadog and more. Free for members.` *(or, to name no one: `The enterprise tools builders actually use — free for members.`)*
- FAQ → `…that includes $200K+ in enterprise tools we make free for members.`

Tell me which way and I'll apply it in one pass.

---

## TIER 3 — Integrity sweep

### 8. Links & routes — PASS (pre-launch) / FLAG (post-launch)

- Every internal link visible in pre-launch resolves to a real route: `/`,
  `/apply`, `/partners`, `/privacy`, `/terms`, `mailto:hello@buildpm.co`. No 404s.
- **FLAG:** the **post-launch** `FOOTER_COLUMNS` ([lib/constants.ts](lib/constants.ts))
  list routes that **don't exist yet** (`/dashboard`, `/sprints`, `/tools`, `/jobs`,
  `/learn`, `/feed`, `/chapters`, `/governance`, `/about`, `/blog`, `/careers`,
  `/contact`, …). They're **hidden in pre-launch**, so they're not a launch-night
  problem — but they'll 404 the moment you flip `NEXT_PUBLIC_PRELAUNCH=false`.
- Builder-profile routes (`buildpm.co/you`) appear only as **display text** in the
  mockups — there's no real `[handle]` route and nothing links to one, so no 404.
- /privacy and /terms have **real, thorough content** (GDPR/CCPA) — not placeholders. PASS.

### 9. Social share preview — FIXED

- The referenced `/og/default.png` **did not exist** (empty `public/og/`). Replaced
  with a generated **1200×630** branded card (verified **200, image/png, ~49 KB**,
  sharp, < 100 KB). OG + Twitter `summary_large_image` tags resolve on every route
  (per-route titles/descriptions from the SEO pass).
- Also fixed: the pre-launch gate was **307-redirecting** `/opengraph-image` —
  social scrapers would have gotten no image. Now allow-listed.
- **NEEDS-MANUAL (nice-to-have):** validate the unfurl in
  [opengraph.xyz](https://www.opengraph.xyz/) or by pasting a link in
  iMessage/Slack after deploy.

### 10. Mobile final pass — PASS (code-level)

- Form states/messages/new content hold at 320/375/430 (single column, `flex-wrap`,
  `max-w` + responsive padding). Inputs are **16px** (no iOS zoom), tap targets
  ≥44px, honeypot is off-screen/AT-hidden. `npm run lint` (jsx-a11y) clean — no new
  a11y violations. **NEEDS-MANUAL:** the device-screenshot/axe pass still needs a
  real browser (commands in [MOBILE.md](MOBILE.md)/[PERF.md](PERF.md)).

### 11. Compliance basics — FIXED / PASS

- **EU consent:** cookie banner is opt-out-by-default (no analytics until accepted).
  Added a short consent line + Privacy link **next to the email capture and the
  apply form**.
- **Privacy policy** already covers exactly what's collected (waitlist email +
  source; application name/email/LinkedIn/archetype/answers; partner company/role).
  PASS.
- **Over-capacity (PASS):** there's **no hard 100-spot cap** in the form, so even
  after 100 fill, applicants still get the graceful "Application received — we
  reply within 7 days" state. Nothing breaks. (If you *want* a "spots full → you're
  on the waitlist" message, that's a small add — tell me.)

---

## Do-tonight summary (the manual items)

1. **Set Vercel env (Production) + redeploy:** `NEXT_PUBLIC_PRELAUNCH=true`,
   `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `PRELAUNCH_BYPASS_TOKEN`,
   `NEXT_PUBLIC_POSTHOG_KEY` (+ `RESEND_API_KEY`, `EMAIL_FROM` for auto-reply).
2. **Confirm Supabase tables** exist with the columns above + UNIQUE(email).
3. **Real test submission** on the deploy → confirm rows in Supabase (apply,
   waitlist, partner). This is the one that matters most.
4. **Verify the auto-reply email** arrives (after Resend domain verified).
5. **Confirm conversion events** in Vercel Analytics.
6. **Paste the real founder note.**
7. **Decide on the partner claims** (leave as-is if signed, else say "soften").
8. (Optional) validate the OG unfurl in a real client.
