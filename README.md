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

## Auth Google & backoffice

1. **Supabase** — Authentication → Providers → activer **Google** (Client ID / Secret depuis Google Cloud Console).  
   URL de redirection autorisée : `https://<PROJECT_REF>.supabase.co/auth/v1/callback`
2. **SQL** — Exécuter `supabase/migrations/001_profiles.sql` dans l’éditeur SQL Supabase (table `profiles` + trigger à l’inscription).
3. **Variables** (voir `.env.example`) :
   - `ADMIN_EMAILS` — emails autorisés en admin (séparés par des virgules), accès immédiat au `/backoffice`
   - `SUPABASE_SERVICE_ROLE_KEY` — recommandé pour écriture matchs (contourne RLS) et liste des utilisateurs
4. **Routes** : `/login` (connexion Google), `/auth/callback`, `/backoffice` (dashboard, matchs, utilisateurs, réglages).

## License

MIT
