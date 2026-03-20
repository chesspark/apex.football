# Top 100 seed — `seeds/top100.json`

## Generate / refresh

```bash
npm run seed:top100:json
```

This runs `scripts/build-top100-json.mjs`, which:

1. Converts `src/data/mastodontes-2026-seed.json` (Deloitte M€ + TM M€) into **full EUR** fields.
2. Merges an **extended club list** so the file contains **100** rows.
3. Sets **`is_top100`: `true`** on every club.

Output: **`seeds/top100.json`** (committed to git for download / CI).

## Schema (each club)

| Field | Description |
|--------|-------------|
| `name` | Display name |
| `slug` | URL key (unique) |
| `country` | Country label |
| `league` | Competition |
| `market_value_eur` | Squad value in EUR (integer) |
| `revenue_eur` | Revenue signal in EUR (integer) |
| `fans_estimate` | Fan reach estimate (integer) |
| `is_top100` | Always `true` in this file |
| `notes` | Provenance / disclaimer |

## Supabase ingest (future)

`mastodonte_clubs` uses different column names (`deloitte_revenue_m_eur`, `transfermarkt_squad_value_m_eur`, `composite_score`). Map from this JSON in a dedicated seed script or ETL — do **not** assume columns match 1:1 until a migration adds `is_top100` to `mastodonte_clubs` or a unified `clubs` table exists.

## Disclaimer

Figures are **demo / directional** unless replaced with official Transfermarkt and Deloitte sources.
