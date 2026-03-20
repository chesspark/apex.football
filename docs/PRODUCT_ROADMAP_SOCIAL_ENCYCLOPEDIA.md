# Product roadmap — Social + Encyclopedia (Apex.Football)

## Product pillars

1. **Social layer** — identity, posts, fan clubs, predictions, realtime match energy.
2. **Encyclopedia layer** — clubs & players worldwide; **premium UX** for **top ~100** (financial + narrative + stats).
3. **Trust** — minimal ads, fast loads, clear voice (*“Football intelligence for the modern fan”*).

## Competitor angle (positioning)

| Rival       | They win on     | Apex wins on                          |
|------------|-----------------|----------------------------------------|
| OneFootball| Reach, licenses | Clean UI, less clutter                 |
| FotMob     | Live stats      | Editorial voice + community            |
| Flashscore | Raw speed       | Speed **+** story & fan layer            |

## Content pillars (editorial)

- Breaking news · Matchday · Tactical analysis · Player scouting · Transfers · Opinion
- Weekly rhythm: Mon tactical recap → Fri previews → weekend live → Sun takeaways  
  (Calendar can live in Notion / `docs/` — optional `content/calendar/` later.)

## SEO clusters (implement as routes + internal linking)

Primary: `football news`, `live football scores`, `transfer news`, `Premier League fixtures`, `Champions League results`  
Secondary: tactical analysis, scouting, predictions, stats  
Evergreen guides: UCL seeding, formations, xG primer — `/guides/*` when ready.

## Tech phases (sync with code)

| Phase | Scope |
|-------|--------|
| 1 | Next.js app, auth, profiles, mastodontes seed, country subdomains |
| 2 | Social posts + feeds + fan clubs + RLS |
| 3 | External football API, dashboards, enriched top-100 pages |
| 4 | Realtime rooms, notifications, media pipeline |
| 5 | Premium / sponsors / affiliates |

## Data: “all clubs” vs top 100

- **MVP:** Seed JSON + DB rows for top list; `is_top100 = true`.
- **Later:** ETL job + cron to refresh values; full global ingest with search (Postgres FTS or Meilisearch/Elastic).

## Founder visibility (ops, not code)

- LinkedIn, X, podcasts, guest posts — themes: *football + technology*, *independent media*, *product craft*.
