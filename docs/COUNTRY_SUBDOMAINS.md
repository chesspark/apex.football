# Country subdomains (`*.{root}`)

Visitors can open the same app on a **per-country host**, e.g.:

- `https://cuba.apex.football` or `https://cuba.apex.world`
- `https://fr.apex.football` (ISO 3166-1 alpha-2)
- `https://united-kingdom.apex.football` (English name slug)
- `https://bosna.apex.world` → **Bosnia and Herzegovina** (alias; requires DNS + env)

The first label before your root domain (`apex.football`, `apex.world`, etc.) is the **country segment**. Resolution (server-side, not in Edge middleware):

- **2 letters** → ISO 3166-1 alpha-2 (`cu`, `fr`, `ba`).
- **Longer** → slug of the **official English** country name from `i18n-iso-countries`, plus **EXTRA_SLUGS** aliases (`uk` → GB, `usa` → US, `bosna` → BA, …).

**Every country** has a guaranteed working pattern: **`https://{iso2 lowercase}.{root}`** (e.g. `https://ba.apex.world` for Bosnia). See the in-app directory: **`/countries`**.

Invalid segments resolve to “no country” (global site); middleware still forwards the raw segment in `x-apex-subdomain` for debugging.

## Environment

| Variable | Role |
|----------|------|
| `NEXT_PUBLIC_APEX_ROOT_DOMAIN` | Root host used to detect subdomains. Examples: `apex.football`, `apex.world`. Must match DNS and the host users type. |

## DNS (apex.world example)

Point a **wildcard** at your app:

```text
*.apex.world   →  CNAME (or A/AAAA) to Vercel / your host
apex.world     →  same app (apex / naked domain)
```

Same pattern for `*.apex.football` if that is your production root.

## Vercel

Add `apex.world` (and optional `www`) and wildcard `*.apex.world`. Set:

```env
NEXT_PUBLIC_APEX_ROOT_DOMAIN=apex.world
```

Rebuild so middleware and layout read the correct suffix.

## Local testing

```text
127.0.0.1  ba.apex.world
127.0.0.1  bosna.apex.world
```

Visit `http://ba.apex.world:3000` (bind dev server to `0.0.0.0` or use hosts + port).

## Code map

- `src/lib/apex-subdomain-host.ts` — `extractCountrySubdomainFromHost`, `APEX_ROOT_DOMAIN`
- `src/lib/apex-subdomain.ts` — `resolveCountrySubdomain`, `EXTRA_SLUGS`
- `src/lib/country-subdomain-links.ts` — list of all ISO direct URLs for `/countries`
- `src/middleware.ts` — sets `x-apex-subdomain`
- `src/app/layout.tsx` — `CountrySubdomainProvider`
- `src/app/countries/page.tsx` — directory of all country links
