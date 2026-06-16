-- BuildPM — funnel & behavior analytics
-- Run these in Supabase → SQL Editor. They read the public.events table that the
-- cookieless JourneyTracker fills (page_view, scroll, section_view, cta_click,
-- form_start, form_abandon, page_exit) plus conversions (apply/waitlist/partner).
--
-- All windows default to the last 30 days; change the interval as needed.
-- A "session" = one ephemeral, anonymous session_id (no persistent identifier).
-- ===========================================================================

-- ───────────────────────────────────────────────────────────────────────────
-- 1. DROP-OFF FUNNEL  — where people fall out, landing → submit
-- ───────────────────────────────────────────────────────────────────────────
with s as (
  select
    session_id,
    bool_or(event_type = 'page_view')                                          as landed,
    bool_or(event_type = 'scroll' and (meta->>'depth')::int >= 50)             as scrolled_50,
    bool_or(event_type = 'scroll' and (meta->>'depth')::int >= 90)             as scrolled_90,
    bool_or(event_type = 'page_view' and path = '/apply')                      as reached_apply,
    bool_or(event_type = 'form_start')                                         as started_form,
    bool_or(event_type = 'form_abandon')                                       as abandoned_form,
    bool_or(event_type in ('form_submit','apply_submitted'))                   as submitted
  from public.events
  where session_id is not null
    and created_at > now() - interval '30 days'
  group by session_id
)
select
  count(*) filter (where landed)         as "1_landed",
  count(*) filter (where scrolled_50)    as "2_scrolled_50pct",
  count(*) filter (where scrolled_90)    as "3_scrolled_90pct",
  count(*) filter (where reached_apply)  as "4_reached_apply_page",
  count(*) filter (where started_form)   as "5_started_form",
  count(*) filter (where submitted)      as "6_submitted",
  count(*) filter (where started_form and not submitted) as "form_abandoners"
from s;

-- ───────────────────────────────────────────────────────────────────────────
-- 2a. TIME ON SITE  — how long visitors stay
-- ───────────────────────────────────────────────────────────────────────────
select
  count(*)                                                                          as sessions,
  round(avg(extract(epoch from (last_seen - first_seen))))::int                     as avg_seconds,
  percentile_cont(0.5) within group (order by extract(epoch from (last_seen - first_seen)))::int as median_seconds
from (
  select session_id, min(created_at) as first_seen, max(created_at) as last_seen
  from public.events
  where session_id is not null and created_at > now() - interval '30 days'
  group by session_id
) s
where last_seen > first_seen;

-- 2b. TIME TO CONVERT  — seconds from first touch to a submitted application
select
  count(*)                                                          as conversions,
  round(avg(secs))::int                                             as avg_seconds_to_apply,
  percentile_cont(0.5) within group (order by secs)::int            as median_seconds_to_apply
from (
  select
    session_id,
    extract(epoch from (
      min(created_at) filter (where event_type in ('form_submit','apply_submitted'))
      - min(created_at)
    )) as secs
  from public.events
  where session_id is not null and created_at > now() - interval '30 days'
  group by session_id
  having bool_or(event_type in ('form_submit','apply_submitted'))
) t
where secs >= 0;

-- ───────────────────────────────────────────────────────────────────────────
-- 3. WHICH SOURCES CONVERT  — sessions vs conversions by channel
-- ───────────────────────────────────────────────────────────────────────────
with s as (
  select
    session_id,
    max(utm_source) as utm_source,
    max(referer)    as referer,
    bool_or(event_type in
      ('form_submit','apply_submitted','waitlist_submitted','partner_submitted')) as converted
  from public.events
  where session_id is not null and created_at > now() - interval '30 days'
  group by session_id
)
select
  coalesce(nullif(utm_source, ''), nullif(referer, ''), 'direct / organic') as source,
  count(*)                                                                  as sessions,
  count(*) filter (where converted)                                        as conversions,
  round(100.0 * count(*) filter (where converted) / nullif(count(*), 0), 1) as conversion_pct
from s
group by 1
order by sessions desc;

-- ───────────────────────────────────────────────────────────────────────────
-- 4a. SECTION ENGAGEMENT  — which sections people actually see
-- ───────────────────────────────────────────────────────────────────────────
select
  meta->>'section'           as section,
  count(distinct session_id) as sessions_viewed
from public.events
where event_type = 'section_view'
  and created_at > now() - interval '30 days'
group by 1
order by sessions_viewed desc;

-- 4b. SCROLL DEPTH DISTRIBUTION  — how far down they get
select
  (meta->>'depth')           as depth_pct,
  count(distinct session_id) as sessions
from public.events
where event_type = 'scroll'
  and created_at > now() - interval '30 days'
group by 1
order by 1::int;

-- ───────────────────────────────────────────────────────────────────────────
-- BONUS: replay one anonymous journey step-by-step (paste a session_id)
-- Find a session_id from any conversion row, then:
-- ───────────────────────────────────────────────────────────────────────────
-- select created_at, event_type, path,
--        meta->>'section' as section, meta->>'depth' as depth,
--        meta->>'cta' as cta, duration_ms
-- from public.events
-- where session_id = 'PASTE_SESSION_ID'
-- order by created_at;

-- BONUS: top things people click
-- select meta->>'cta' as cta, count(*) as clicks
-- from public.events where event_type = 'cta_click'
--   and created_at > now() - interval '30 days'
-- group by 1 order by clicks desc limit 25;
