# Apex Football ⚽

**24/7 Live Football** — [apex.football](https://apex.football)

A modern, Nike-inspired football platform that delivers real-time football coverage across the globe. Available in **English**, **French**, and **Arabic** with full RTL support.

## Features

- **Trending Players** — Track top performers with live stats (goals, assists, ratings)
- **Live Tournaments** — Every ongoing tournament worldwide (UCL, Premier League, La Liga, Ligue 1, Serie A, Bundesliga, CAF Champions League, Copa Libertadores, Botola Pro, Saudi Pro League, and more)
- **Match Results** — Live scores, half-time updates, and full-time results
- **Breaking News** — Latest football headlines from around the world
- **Multilingual** — Full support for English, French, and Arabic (RTL)
- **Nike-Inspired Design** — Bold typography, dark theme, clean modern UI

## Docs (strategy & deploy)

- **[Master prompt for Cursor AI](docs/CURSOR_MASTER_PROMPT_APEX_FOOTBALL.md)** — vision, phases, env, instructions aligned with this repo  
- [Deploy: Vercel + Cloudflare](docs/DEPLOY_VERCEL_CLOUDFLARE.md) · [Product roadmap](docs/PRODUCT_ROADMAP_SOCIAL_ENCYCLOPEDIA.md) · [Auth Google/Apple](docs/AUTH_APPLE_GOOGLE_APEX_FOOTBALL.md)  
- **[Press / Founder kit](docs/press_kit.md)** — one-pager, bio, Q&A, 30-day content calendar, media checklist  
- **[Top 100 seed JSON](docs/SEEDS_TOP100.md)** — `seeds/top100.json` (`npm run seed:top100:json`)  
- **[Audit — links & features](docs/AUDIT_LINKS_FEATURES.md)** — routes, anchors, external URLs, gaps

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Tests (lint + build)

```bash
npm run test
```

Voir aussi `docs/SOCIAL_SHARE_QA.md` pour le QA profil / partage (WhatsApp, Telegram, Instagram).

## Auth — Google, Apple ID & profil social (**apex.football**)

Le site peut être servi sur un domaine **.football** (TLD comme `.com`). Voir **`docs/AUTH_APPLE_GOOGLE_APEX_FOOTBALL.md`** pour les URLs de callback et Vercel.

1. **Supabase** — Authentication → Providers : **Google** et **Apple** (identifiants Apple Developer + Google Cloud OAuth).
2. **SQL** — Dans l’ordre : `001_profiles.sql` → `003_profiles_social.sql` (colonnes sociales + RPC `get_public_profile`). Les migrations `002_*` restent optionnelles selon les features.
3. **Variables** (`.env.example`) : `NEXT_PUBLIC_SITE_URL` (ex. `https://apex.football` en prod), clés Supabase, `ADMIN_EMAILS`, `SUPABASE_SERVICE_ROLE_KEY` si besoin.
4. **Routes** : `/login` (Google + Apple), `/auth/callback`, `/profile` (édition profil fan), `/u/[username]` (fiche publique), `/backoffice`.

## Pro Chat providers (OpenClaw + Grok)

- `/api/chat` utilise un fallback provider côté serveur :
  - `OPENCLAW_API_KEY` (prioritaire, endpoint OpenAI-compatible)
  - sinon `XAI_API_KEY` ou `GROK_API_KEY`
- Variables utiles dans `.env.example` :
  - `OPENCLAW_API_KEY`, `OPENCLAW_MODEL`, `OPENCLAW_API_URL`
  - `XAI_API_KEY`, `GROK_MODEL`

## License

MIT
