# Cursor AI — Master prompt · Apex.Football (paste into Composer / Agent)

**Use this document** as the single source of truth when asking Cursor to extend the product. It reflects the **current repo** (`apexfootball` Next.js app) and the **target vision** (football-first social + global encyclopedia).

---

## Executive summary

**Product:** Apex.Football — *not* “another Twitter clone*, but **the** place where fans **live football 24/7**: fast UI, social layer (profiles, posts, fan spaces, predictions), and an encyclopedia layer (clubs/players/matches) with **premium depth for the top ~100 clubs** (market value, revenue, fan impact) while the DB can scale to **thousands of pro clubs**.

**Domain:** `apex.football` (TLD `.football` — treat like `.com` for OAuth Site URL and redirects).

**Founder narrative (brand):** Aldric Laure — digital entrepreneur, football enthusiast; mission: **clarity, not clutter**. Positioning: *“Football intelligence for the modern fan”* · *“Built by a fan, for fans”*.

---

## Ground truth — what already exists in this repository

Do **not** assume Firebase Auth unless explicitly migrating. This codebase uses:

| Layer | Implementation |
|--------|----------------|
| Web app | **Next.js 16** App Router, TypeScript, Tailwind |
| Auth | **Supabase Auth** — OAuth **Google** + **Apple** (`/login`, `/auth/callback`, `src/lib/auth/oauth-client.ts`) |
| Database | **Supabase Postgres** + migrations under `supabase/migrations/` |
| Profiles / social MVP | Users, public profiles `/u/[username]`, RPC `get_public_profile`, middleware |
| Mastodontes / top clubs | `mastodonte_clubs`, seed JSON, `/mastodontes` |
| Country subdomains | `*.apex.football` — see `docs/COUNTRY_SUBDOMAINS.md` |
| Docs | `docs/AUTH_APPLE_GOOGLE_APEX_FOOTBALL.md`, `docs/COUNTRY_SUBDOMAINS.md`, etc. |

**Important:** The user’s PDF may mention **Firebase**. Treat Firebase as **optional future** or **parallel identity bridge**. The production path today is **Supabase OAuth** with correct **Site URL** and redirect URLs for `https://apex.football`.

---

## North-star requirements (from brief)

1. **Social MVP → full social:** posts, stories, feeds, fan clubs, live match rooms (text → audio), predictions & leaderboards, trending.
2. **Encyclopedia:** canonical club/player pages; **top 100** enriched (Transfermarkt-style value, Deloitte-style revenue, fans, trophies); rest of world ingest later.
3. **Performance:** minimal chrome, fast scores, PWA-friendly.
4. **Auth:** Google + Apple must **work in production** on `apex.football` (follow `docs/AUTH_APPLE_GOOGLE_APEX_FOOTBALL.md`).
5. **Deploy:** Vercel + Cloudflare DNS + Supabase; env vars in Vercel; CI via GitHub → Vercel.
6. **AI (optional phases):** Cursor / LLM APIs for moderation, captions, tactical blurbs — **no fake “Cursor SDK” npm** unless the project adds a real provider; use env e.g. `XAI_API_KEY` for chat already in repo patterns.

---

## Phased roadmap (implementation order)

### Phase 1 — Foundation (mostly done / tighten)

- [x] Clean UI, multilingual, live data surfaces where seeded
- [x] Google + Apple via Supabase (verify prod config)
- [ ] **About / mission pages** (`/about`) — marketing + SEO
- [ ] Legal: Privacy + ToS pages linked from footer (placeholders OK)

### Phase 2 — Social core (build next)

- `posts` table: author, body, media refs, club_slug optional, created_at
- RLS: read public, write own
- Feed API: chronological + optional club filter
- Fan clubs: extend `fan_clubs` / `fan_club_members` from migration 002

### Phase 3 — Intelligence layer

- Player/club stats from **API-Football** or Sportmonks (env `API_FOOTBALL_KEY`)
- Cache hot paths (Upstash Redis or Supabase cache)
- GoldenEye / predictions already partially present — unify leaderboard model

### Phase 4 — Realtime & media

- Supabase Realtime for new posts + match events
- Optional Socket.io **only if** needed beyond Supabase channels
- Storage: Supabase Storage buckets for images/video; CDN via Cloudflare

### Phase 5 — Monetization

- Ad-light / premium tier / affiliates — behind feature flags

---

## Database direction (DDL sketch — align with existing migrations)

Before creating new tables, **read** `supabase/migrations/` and extend; avoid duplicating `profiles` / `auth.users`.

Suggested additions (names illustrative):

- `social_posts (id, author_id uuid references auth.users, body text, media jsonb, club_slug text, created_at)`
- `post_reactions`, `comments` (if not using a single JSONB for MVP)
- `clubs` enrichment: ensure `is_top100`, financial columns match mastodontes or merge concepts

Seed: `scripts/seed.mjs` + JSON for top 100 — align with `mastodontes` or merge into one `clubs` source of truth long-term.

---

## Environment variables (extend, don’t break)

Already used (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL=https://apex.football` (production)
- `NEXT_PUBLIC_APEX_ROOT_DOMAIN=apex.football`

Add when implementing features:

- `API_FOOTBALL_KEY` or `SPORTMONKS_KEY`
- `SENTRY_DSN` (monitoring)
- `NEXT_PUBLIC_INSTAGRAM_POST_URLS` (optional embeds — see Instagram dock)

---

## Deployment checklist (short)

1. **Cloudflare:** `apex.football` → Vercel (CNAME / A per Vercel docs); SSL Full; WAF; cache bypass for `/api/*` if needed.
2. **Vercel:** Project from GitHub; Production env vars; domain `apex.football` verified.
3. **Supabase:** Redirect URLs include `https://apex.football/auth/callback`; Google + Apple providers filled.
4. **Apple:** Services ID return URL = Supabase callback URL from dashboard; domain association if Apple requires for web.
5. **Smoke test:** Login Google + Apple on production URL; `/profile` loads; `/u/:username` public.

Full detail: **`docs/DEPLOY_VERCEL_CLOUDFLARE.md`** (companion file).

---

## Instructions for Cursor when generating code

1. Prefer **incremental PR-sized changes**; run `npm run lint && npm run build`.
2. Reuse **Supabase** clients from `src/lib/supabase/*`.
3. New routes: App Router + server components where possible; `"use client"` only when needed.
4. Document new env vars in `.env.example`.
5. Do **not** rip out working OAuth without a migration plan.

---

## One-line mission (for copy / metadata)

> **Mission:** Deliver fast, intelligent, beautifully simple football coverage that respects the fan’s time and passion.  
> **Vision:** The most trusted independent football platform — clarity, insight, and a modern experience.

---

*End of master prompt — keep this file updated as the repo evolves.*
