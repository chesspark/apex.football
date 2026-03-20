# Apex Football ⚽

**24/7 Live Football** — [apex-football.com](https://apex-football.com)

A modern, Nike-inspired football platform that delivers real-time football coverage across the globe. Available in **English**, **French**, and **Arabic** with full RTL support.

## Features

- **Trending Players** — Track top performers with live stats (goals, assists, ratings)
- **Live Tournaments** — Every ongoing tournament worldwide (UCL, Premier League, La Liga, Ligue 1, Serie A, Bundesliga, CAF Champions League, Copa Libertadores, Botola Pro, Saudi Pro League, and more)
- **Match Results** — Live scores, half-time updates, and full-time results
- **Breaking News** — Latest football headlines from around the world
- **Multilingual** — Full support for English, French, and Arabic (RTL)
- **Nike-Inspired Design** — Bold typography, dark theme, clean modern UI

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

## License

MIT
