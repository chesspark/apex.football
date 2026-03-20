# Deploy — Vercel + Cloudflare + Supabase (`apex.football`)

Companion to `docs/CURSOR_MASTER_PROMPT_APEX_FOOTBALL.md` and `docs/AUTH_APPLE_GOOGLE_APEX_FOOTBALL.md`.

## 1. Supabase

1. Create project (region close to users).
2. Run migrations: `supabase/migrations/*.sql` in order (see `docs/SUPABASE_APPLIQUER_MIGRATIONS.md`).
3. **Authentication → URL configuration**
   - Site URL: `https://apex.football`
   - Redirect URLs: `https://apex.football/auth/callback`, `http://localhost:3000/auth/callback`, preview URLs if needed.
4. Enable **Google** and **Apple** providers with credentials from Google Cloud / Apple Developer.
5. Copy `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` to Vercel.

## 2. Vercel

1. Import Git repository.
2. Framework: Next.js; build: `npm run build`; output: default.
3. Environment variables (Production + Preview as needed):
   - `NEXT_PUBLIC_SITE_URL=https://apex.football`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose to client)
   - Optional: `NEXT_PUBLIC_APEX_ROOT_DOMAIN`, `NEXT_PUBLIC_INSTAGRAM_POST_URLS`, `SENTRY_DSN`, etc.
4. Deploy; fix build errors until green.

## 3. Cloudflare

1. Add site `apex.football` (or manage DNS only).
2. Point root + `www` to Vercel per [Vercel custom domains](https://vercel.com/docs/concepts/projects/domains) (CNAME or recommended records).
3. SSL: **Full (strict)** when origin is Vercel HTTPS.
4. Optional: Page Rules / Cache Rules — bypass cache for `/api/*` if you see stale API responses.
5. WAF: enable baseline rules; rate-limit sensitive auth paths if needed.

## 4. Google Workspace (OAuth)

- Use your Workspace Google Cloud project for **OAuth consent screen** and **OAuth 2.0 Client ID (Web)**.
- Authorized JavaScript origins: `https://apex.football`, `https://www.apex.football` (if used).
- Authorized redirect URIs: include Supabase callback  
  `https://<PROJECT_REF>.supabase.co/auth/v1/callback` (exact value from Supabase dashboard).

## 5. Launch smoke tests

- [ ] `https://apex.football` loads
- [ ] `/login` → Google works end-to-end
- [ ] `/login` → Apple works end-to-end
- [ ] `/profile` after login
- [ ] `/mastodontes`, `/about` (if enabled)
- [ ] No console errors on critical paths

## 6. Rollback

- Vercel → Deployments → **Promote** previous working deployment.
- If DB migration bad: restore Supabase backup / run down migration (if maintained).
- Rotate leaked keys in Supabase / Google / Apple immediately.
