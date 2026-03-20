# Apex.Football — Press Kit

*Ready for journalists, partners, and sponsors.*

---

## Product One‑Pager

| | |
|---|---|
| **Name** | Apex.Football |
| **Tagline** | Where fans live football 24/7. |
| **What we are** | A fast, minimalist social network and global football encyclopedia that combines real-time match coverage, fan communities, and deep club/player pages — with premium pages for the world’s top 100 clubs. |
| **Launch** | MVP live on `apex.football` (seeded with Top 100 clubs; social features: posts, stories, live rooms, predictions, fan clubs). |
| **Tech highlights** | Next.js + Expo; Supabase Postgres; Firebase Auth (Google + Apple); Cursor AI SDK for content & clip generation; Cloudflare + Vercel for delivery. |

> **Production note:** Live authentication on `apex.football` uses **Supabase Auth** with **Google** and **Apple** OAuth (see `docs/AUTH_APPLE_GOOGLE_APEX_FOOTBALL.md`). If your article cites “Firebase Auth,” align with the team — some roadmaps reference Firebase-style identity; **shipping stack** is Supabase + Next.js unless otherwise announced.

---

## Founder — Press‑ready Bio

**Aldric Laure — Founder, Apex.Football**

Aldric Laure is a digital product builder and lifelong football fan who founded Apex.Football to create a cleaner, faster, and more intelligent football experience. With a background in web development and product design, Aldric built Apex.Football to combine the immediacy of social platforms with a rigorous, global football database — prioritizing clarity, speed, and fan engagement. Aldric leads product strategy, partnerships, and the editorial vision.

---

## Mission & Vision

**Mission:** Deliver fast, intelligent, and beautifully simple football coverage that respects the fan’s time and passion.

**Vision:** Become the most trusted independent football platform worldwide — the place fans go for clarity, insight, and community.

**Positioning (internal):** “Football intelligence for the modern fan” · “Built by a fan, for fans” · “A platform that respects your time and your passion.”

---

## Key Facts (for media)

- **Product:** Social + Encyclopedia (all pro clubs ingested; Top 100 enriched).
- **Core features:** Live match rooms, posts/stories, predictions, fan clubs, auto-clips.
- **Integrations:** API-Football / Sportmonks for live stats; DeepL for translations; AI (e.g. Grok / OpenAI APIs) for Pro Chat and future content generation.
- **Launch assets:** Seeded Top 100 clubs; sample users and posts; live domain `apex.football`.
- **Tech stack:** Next.js (web), Expo/React Native (mobile, roadmap), Node/Express (API, optional), Supabase Postgres (DB), **Supabase Auth** (Google + Apple) on production, Supabase Storage (media), Cloudflare CDN, Vercel hosting.

---

## Media Assets (recommended to upload to `media` bucket)

- **Logo** — SVG + PNG (dark and light variants).
- **Founder headshot** — high resolution (3000px).
- **Screenshots** — web feed, club page, live room, mobile story.
- **One-page fact sheet** — product features + launch metrics.
- **Demo video** — 60–90s product walkthrough (host on CDN).
- **Brand color palette** — primary (pitch green), secondary (dark slate), accent (white).

**Placeholder paths (replace with your CDN):**

- `media/press/logo-apex-dark.svg` · `media/press/logo-apex-light.svg`
- `media/press/founder-aldric-laure.jpg`
- `media/press/screenshot-feed.png`

---

## Suggested Press Q&A

**Q: Why build another football site?**

A: Most football sites are either bloated with ads or lack community. Apex.Football is built for fans who want speed, clarity, and a place to live the game with other fans.

**Q: How do you source club data?**

A: MVP seeds the Top 100 using Transfermarkt market values and Deloitte revenue signals; the platform ingests global club data and will refresh via scheduled jobs.

**Q: How do you handle rights for clips?**

A: The auto-clip pipeline is designed to work with licensed feeds; for launch we’ll rely on user uploads, short-form commentary, and licensed partners.

**Q: Who is the founder?**

A: **Aldric Laure** — see the press-ready bio above.

---

## Contact

- **Founder:** Aldric Laure — [founder@apex.football](mailto:founder@apex.football)
- **Press:** [press@apex.football](mailto:press@apex.football)
- **Partnerships:** [partners@apex.football](mailto:partners@apex.football)

*Configure `@apex.football` addresses in Google Workspace (or your mail provider).*

---

## Quick Launch Notes for Press

- **Founder quote (short, for launch):**

  *“Apex.Football was built to give fans a place to live the game — fast, clear, and without the noise.”* — **Aldric Laure**

- **Embargo:** Suggested policy — allow press preview **48 hours** before public launch (adjust per campaign).

---

## Appendix A — 30-day content calendar (launch & growth)

**Principles:** Mix news, tactical analysis, club spotlights, community activations, and matchday coverage. Prioritize Top 100 clubs.

### Weekly cadence

| Day | Content type |
|-----|----------------|
| Mon | Tactical deep dive |
| Tue | Player spotlight / scouting |
| Wed | Transfer radar |
| Thu | Opinion or listicle |
| Fri | Weekend preview + predictions |
| Sat | Live matchday |
| Sun | Winners & Losers + clips |

### Days 1–30 (headlines)

| Day | Theme |
|-----|--------|
| 1 | Launch post — why Apex.Football; founder note; beta invite |
| 2 | Top 100 spotlight — e.g. Real Madrid market value |
| 3 | Tactical — “How Manchester City press” |
| 4 | Player — Mbappé season snapshot |
| 5 | Poll — Player of the Month |
| 6 | Transfer radar — 5 strikers |
| 7 | Live room — marquee match |
| 8 | Winners & Losers — weekend |
| 9 | Club deep dive — e.g. Flamengo |
| 10 | Tactical thread — Arsenal build-up |
| 11 | Creator spotlight |
| 12 | Data — “What is xG?” |
| 13 | Prediction league signups |
| 14 | Founder AMA |
| 15 | U21 scouting list |
| 16 | Top 5 derbies (Top 100) |
| 17 | Tactical video — goal breakdown |
| 18 | Fan club activation |
| 19 | Transfer methodology |
| 20 | Opinion — independent media |
| 21 | Matchday + clip test |
| 22 | Winners & Losers + community |
| 23 | How-to predictions |
| 24 | Rising star (South America) |
| 25 | Set-pieces |
| 26 | UGC chant contest |
| 27 | Data — top 10 by value + revenue |
| 28 | Creator toolkit |
| 29 | Roundtable — 3 moderators |
| 30 | Launch review + subscribe CTA |

---

## Appendix B — Quick implementation notes (internal)

1. **Top 100 JSON** — Run `npm run seed:top100:json` → generates **`seeds/top100.json`** with **100** clubs, each with **`is_top100`: true** (see `docs/SEEDS_TOP100.md`).
2. **Pre-produce assets** — Use the **30-day calendar** (Appendix A) to prepare **weeks 1–2** early: short clips, stills, tactical diagrams, carousels for X/Instagram.
3. **Press kit media** — Upload to your Supabase **Storage** bucket (e.g. `media` or `press`) and link in this file:
   - `media/press/logo-apex-dark.svg` · `media/press/logo-apex-light.svg`
   - `media/press/founder-aldric-laure.jpg`
   - `media/press/screenshot-feed.png` · `screenshot-club.png` · `screenshot-live-room.png` · `screenshot-story.png`
4. **Legal** — UGC contests need **Terms** + **Privacy** on the site.

---

*© Apex.Football — adapt metrics and dates before external distribution.*
