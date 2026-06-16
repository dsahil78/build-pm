# UTM conventions — BuildPM

UTMs are query params you append to links **you share**. The site already reads
and stores all five (`utm_source/medium/campaign/term/content`) into the
Supabase `events` table and stamps them on conversions — so there is **no code
to write**. The only job is to tag links *consistently*, so the
"which sources convert" report groups cleanly.

## The 6 rules

1. **lowercase only** — `twitter`, never `Twitter`/`X`/`twitter.com`.
2. **no spaces** — use hyphens: `founding-cohort`, not `founding cohort`.
3. **one canonical value per thing** — pick it once, reuse forever (see tables).
4. **always set at least `source` + `medium` + `campaign`**.
5. **never tag internal links** (links pointing at your own site) — it resets
   attribution mid-visit.
6. **log every link you create** in the table at the bottom, so the team reuses
   values instead of inventing new ones.

## Controlled vocabulary

### `utm_source` — *where the click came from* (the specific place)
| Value | Use for |
|---|---|
| `twitter` | X / Twitter |
| `linkedin` | LinkedIn |
| `producthunt` | Product Hunt |
| `reddit` | Reddit |
| `hackernews` | Hacker News |
| `instagram` | Instagram |
| `youtube` | YouTube |
| `tiktok` | TikTok |
| `newsletter` | your own email list |
| `discord` / `slack` | community servers |
| `github` | repo / profile links |
| `partner-<name>` | a specific partner's channel, e.g. `partner-cursor` |

### `utm_medium` — *the category of traffic*
| Value | Use for |
|---|---|
| `social` | organic posts on a social platform |
| `bio` | link-in-bio / profile link |
| `email` | newsletters, email blasts |
| `referral` | links from another site/community |
| `paid-social` | paid social ads |
| `paid-search` | Google/Bing ads |
| `influencer` | a creator posting your link |
| `qr` | offline QR codes |

### `utm_campaign` — *the initiative*
Keep a short, stable set. Add a date suffix for one-off events.
| Value | Use for |
|---|---|
| `launch` | the public launch push |
| `waitlist` | general waitlist drive |
| `founding-cohort` | first-100 recruitment |
| `ph-launch-2026-06` | a dated event (Product Hunt day) |

### `utm_content` — *which link / creative / A-B variant*
Free-form but lowercase-hyphenated. Examples:
`bio-link`, `pinned-post`, `thread-1`, `post-1`, `header-cta`, `footer-cta`,
`button-a`, `button-b` (for A/B tests), `comment-link`.

### `utm_term`
Only for **paid search keywords**. Skip for organic.

## URL template

```
https://buildpm.co/?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN&utm_content=CONTENT
```

## Ready-to-copy examples

| Channel | URL |
|---|---|
| X/Twitter bio | `https://buildpm.co/?utm_source=twitter&utm_medium=bio&utm_campaign=launch&utm_content=bio-link` |
| X/Twitter launch thread | `https://buildpm.co/?utm_source=twitter&utm_medium=social&utm_campaign=launch&utm_content=thread-1` |
| LinkedIn post | `https://buildpm.co/?utm_source=linkedin&utm_medium=social&utm_campaign=launch&utm_content=post-1` |
| LinkedIn bio | `https://buildpm.co/?utm_source=linkedin&utm_medium=bio&utm_campaign=launch&utm_content=bio-link` |
| Product Hunt | `https://buildpm.co/?utm_source=producthunt&utm_medium=referral&utm_campaign=ph-launch-2026-06` |
| Newsletter header | `https://buildpm.co/?utm_source=newsletter&utm_medium=email&utm_campaign=launch&utm_content=header-cta` |
| Reddit r/ProductManagement | `https://buildpm.co/?utm_source=reddit&utm_medium=social&utm_campaign=launch&utm_content=r-productmanagement` |

> Tip: for visible bio links, run the tagged URL through a shortener (Dub.co,
> Bitly) so the params don't show.

## Verify it's working (the test loop)

1. Build a tagged URL.
2. Open it in a **fresh incognito window** on the live site (incognito = a new
   session, so it simulates a new visitor).
3. Click around / submit a test application.
4. In Supabase → SQL Editor:

```sql
select utm_source, utm_medium, utm_campaign, utm_content, count(*) as events
from public.events
where utm_source is not null
  and created_at > now() - interval '1 day'
group by 1,2,3,4
order by events desc;
```

You should see your tagged values. Then the "which sources convert" report in
[supabase/analytics.sql](supabase/analytics.sql) will start splitting traffic by
channel.

## Link log (fill this in as you create links)

| Date | Channel | Campaign | Final URL | Notes |
|---|---|---|---|---|
| | | | | |
