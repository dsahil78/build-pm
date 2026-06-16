-- BuildPM — database schema
-- Run this in Supabase → SQL Editor → New query → Run.
-- Idempotent-ish: safe to re-run; uses "if not exists" where possible.
--
-- Columns mirror exactly what the API routes insert:
--   app/api/apply/route.ts     -> public.applications  (builder + partner)
--   app/api/waitlist/route.ts  -> public.waitlist
--   (optional) telemetry       -> public.events        (needs code wiring)
-- ---------------------------------------------------------------------------

-- ===========================================================================
-- 1. APPLICATIONS  (builder applications AND partner enquiries share this table)
-- ===========================================================================
create table if not exists public.applications (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- 'builder' (default; builder POST omits type) or 'partner'
  type             text not null default 'builder'
                     check (type in ('builder', 'partner')),
  -- your own review workflow; the app only ever inserts 'pending'
  status           text not null default 'pending'
                     check (status in ('pending','reviewing','accepted','waitlisted','rejected')),

  full_name        text not null,
  email            text not null,

  -- builder fields (CHECK passes on NULL, so partner rows are fine)
  linkedin_url     text,
  archetype        text check (archetype in ('aspiring','builder','founder','leader')),
  shipped_recently text,
  why_build_pm     text,
  referral_source  text check (referral_source in ('linkedin','twitter','friend','other')),

  -- partner fields (tier validated in the API allowlist, so left as free text here)
  company          text,
  role             text,
  tier             text,
  message          text
);

-- One application per email. Case-insensitive so Foo@x.com == foo@x.com.
-- The API relies on the resulting Postgres error 23505 to show
-- "you've already applied" gracefully.
create unique index if not exists applications_email_unique
  on public.applications (lower(email));

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);
create index if not exists applications_status_idx
  on public.applications (status);

-- ===========================================================================
-- 2. WAITLIST  (homepage "notify me")
-- ===========================================================================
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text not null,
  source     text not null default 'landing_page'
);

create unique index if not exists waitlist_email_unique
  on public.waitlist (lower(email));
create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

-- ===========================================================================
-- 3. EVENTS  (OPTIONAL telemetry / attribution — requires code wiring to fill)
--    Privacy-preserving by design: stores derived geo + a salted IP HASH,
--    NOT raw IP, to stay consistent with the privacy policy.
-- ===========================================================================
create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  event_type   text not null,                  -- 'page_view','scroll','section_view','cta_click','form_start','form_abandon','page_exit','apply_submitted','waitlist_submitted','partner_submitted'
  email        text,                           -- links the event to a person when known (conversions only)

  -- journey stitching (cookieless, anonymous, ephemeral - sessionStorage id)
  session_id   text,                           -- groups one visitor's events; not a persistent identifier
  path         text,                           -- page path for this event
  duration_ms  integer,                        -- time-on-page (page_exit events)

  -- attribution (highest-ROI signal for a launch)
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  utm_content  text,
  referer      text,                           -- original traffic source (captured client-side)
  landing_path text,                           -- first page they hit

  -- context
  user_agent   text,
  device_type  text,                           -- 'mobile' | 'desktop' | 'tablet'

  -- geo (derived from Vercel's edge headers — no IP-lookup service needed)
  ip_country   text,
  ip_region    text,
  ip_city      text,
  ip_hash      text,                           -- salted one-way hash for dedupe/fraud; NOT reversible

  consent      boolean,                        -- analytics-consent state at capture time
  meta         jsonb not null default '{}'::jsonb
);

-- If you ran an earlier version of this file, these add the new columns safely:
alter table public.events add column if not exists session_id  text;
alter table public.events add column if not exists path        text;
alter table public.events add column if not exists duration_ms integer;

create index if not exists events_created_at_idx on public.events (created_at desc);
create index if not exists events_type_idx       on public.events (event_type);
create index if not exists events_email_idx      on public.events (email);
create index if not exists events_session_idx    on public.events (session_id);

-- ===========================================================================
-- 4. updated_at auto-touch (handy when you change application status by hand)
-- ===========================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 5. ROW LEVEL SECURITY  *** DO NOT SKIP — THIS IS THE SECURITY STEP ***
--    The anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY) ships to every browser. With
--    RLS OFF, anyone could read every applicant's email/answers via the public
--    REST API. We enable RLS and add NO policies, so the public roles get ZERO
--    access. The server-side SUPABASE_SERVICE_ROLE_KEY (used in the API routes)
--    bypasses RLS, so your forms keep working.
-- ===========================================================================
alter table public.applications enable row level security;
alter table public.waitlist     enable row level security;
alter table public.events       enable row level security;

-- (Intentionally NO create policy statements. Server-only access.)

-- ===========================================================================
-- VERIFY (run after a test submission on the site)
-- ===========================================================================
-- select count(*) from public.applications;
-- select created_at, type, full_name, email, archetype, referral_source
--   from public.applications order by created_at desc limit 10;
-- select count(*) from public.waitlist;
-- select created_at, email, source from public.waitlist order by created_at desc limit 10;

-- USEFUL ADMIN / GROWTH QUERIES ---------------------------------------------
-- Signups per day:
--   select date_trunc('day', created_at)::date d, count(*) from public.waitlist group by 1 order by 1 desc;
-- Where applicants come from:
--   select referral_source, count(*) from public.applications where type='builder' group by 1 order by 2 desc;
-- Archetype mix:
--   select archetype, count(*) from public.applications where type='builder' group by 1 order by 2 desc;
-- Partner interest by tier:
--   select tier, count(*) from public.applications where type='partner' group by 1 order by 2 desc;
