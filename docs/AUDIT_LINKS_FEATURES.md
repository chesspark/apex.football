# Codebase audit — routes, links & build

**Last run:** automated `npm run lint` + `npm run build` — **PASS**.

## App routes (all resolve)

`/`, `/about`, `/apply`, `/countries`, `/login`, `/auth/callback`, `/profile`, `/u/[username]`, `/mastodontes`, `/morocco`, `/match/[id]`, `/legal/cgv`, `/backoffice` (+ `/matches`, `/users`, `/settings`)

**API:** `/api/chat`, `/api/auth/me`

## Internal links (spot-check)

- Navbar: `/`, `/about`, `/countries`, `/#players`, `/#tournaments`, `/#teams`, `/#shop`, `/morocco`, `/#live`, `/#golden-eye`, `/apply`, `/mastodontes`, `/profile` + search → `/#players`
- Footer: same anchors + `/#results`, `/legal/cgv`, `/#partners`
- Apply: `/#become-ambassador` (section on home)

## External

- Instagram: `apexfootball.world64` profile URL
- Apply mailto: `ambassadors@apex.football`
- Metadata OG URL: `https://apex.football`

## Notes

- Middleware warns about future “proxy” rename (Next 16) — non-blocking.
- Live browsing of production is not run from CI; smoke-test `apex.football` after deploy.
