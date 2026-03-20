# Absolument Football — architecture MVP (roadmap)

> **Nom produit cible** : *Absolument Football* — réseau social + data football 24/7.  
> **Code actuel** : dépôt **apexfootball** (Next.js 16) — évolution progressive sans big-bang.

## Vision produit

| Pilier | Description |
|--------|-------------|
| **Social** | Feed, reposts, débats, prédictions, sondages, fan clubs, rooms match |
| **Data** | Fiches club / joueur riches (stats, palmarès, transferts, blessures, médias) |
| **Référence** | Page **Vrais Mastodontes** — ranking composite (revenus + valeur d’effectif + critères qualitatifs seed) |

## Stack cible (alignement progressif)

| Couche | Cible long terme | État actuel repo |
|--------|-------------------|------------------|
| Framework | Next.js App Router + TS strict | Next 16 + TS |
| UI | Tailwind + shadcn/ui + Radix + Framer | Tailwind v4 + Lucide |
| Data | Supabase PG + RLS + Realtime + Storage | Supabase client + migrations |
| ORM | Drizzle + Zod | Types manuels + Zod (à ajouter par module) |
| Cache / async | TanStack Query | fetch / Server Components |
| Auth | Email + Google | Google + profils (`001_profiles.sql`) |

**Décision** : ne pas introduire Drizzle + shadcn sur tout le repo en un seul commit ; ajouter **par feature** (ex. module social).

## Arborescence cible (modules)

```
src/
  app/
    (public)/ ...
    mastodontes/          # MVP livré : ranking seed
    (social)/             # futur : feed, club/[slug], player/[slug]
  components/
    social/               # futur
    data/                 # futur fiches
  lib/
    supabase/
    mastodontes-data.ts
docs/
  ABSOLUMENT_FOOTBALL_ARCHITECTURE.md
  APEX_FOOTBALL_INTELLIGENCE.md
supabase/migrations/
  001_profiles.sql
  002_social_mastodontes.sql
data/ ou src/data/
  mastodontes-2026-seed.json
```

## Schéma base de données (MVP étape 1)

Voir `supabase/migrations/002_social_mastodontes.sql` :

- **`mastodonte_clubs`** — lignes seed indépendantes (slug, revenus/TM **démo**, composite).
- **`social_posts`** — auteur `auth.users`, contenu, média optionnel.
- **`fan_clubs`**, **`fan_club_members`** — socle fan clubs.
- **`match_predictions`** — prédiction scores (optionnel MVP+1).

RLS : lecture publique mastodontes + posts ; écriture authentifiée selon politiques.

## Seed « Vrais Mastodontes »

- Fichier **`src/data/mastodontes-2026-seed.json`** : **35–50 clubs** prioritaires (Europe majoritaire + Amériques + Asie/Golfe + Brésil).
- Champs **Deloitte** / **Transfermarkt** : **valeurs de démonstration** pour UI et tri — à remplacer par imports officiels ou ETL.
- **Composite** : `0.45 * norm(log(revenue)) + 0.45 * norm(log(TM)) + 0.10 * bonus_régional` (détail dans commentaire JSON `_meta`).

## Phases de livraison

1. ✅ Architecture + schéma + seed JSON + page `/mastodontes`.
2. ⏭ Appliquer migration `002` sur Supabase + importer seed SQL ou script.
3. ⏭ Feed minimal + `social_posts` branché UI.
4. ⏭ Fiches `club/[slug]` enrichies (données existantes `clubs` + nouvelles tables).
5. ⏭ Fan clubs + Realtime + Storage médias.

**Audit MVP détaillé (prompt Cursor réécrit + tableau étape par étape)** : [`ABSOLUMENT_FOOTBALL_PROMPT_MVP_OPUS.md`](./ABSOLUMENT_FOOTBALL_PROMPT_MVP_OPUS.md).

## Performance & déploiement

- Pages statiques / ISR pour fiches quand données stabilisées.
- Images : `next/image`, domaines Supabase Storage whitelist Vercel.
- Core Web Vitals : lazy sections lourdes, pas de bundle social sur la home avant besoin.

## Marque

- **Absolument Football** : nom produit social/data.  
- **Apex Football** : marque actuelle du site — cohabitation possible (sous-marque ou rename ultérieur).
