# Absolument Football — prompt MVP réécrit + audit pas à pas

> **Méthode** : revue structurée (exigences → preuve dans le repo → écart → action).  
> Utilisable comme **grille de validation** avant chaque release, avec n’importe quel LLM ou revue humaine.

---

## 1. Prompt Cursor (copier-coller) — MVP « Absolument Football »

```text
Tu es architecte produit senior + lead developer full-stack, spécialiste plateformes sociales sportives et produits data-heavy à fort trafic.

**Mission** : concevoir et itérer sur le MVP **Absolument Football** dans le dépôt **apexfootball** — plateforme où les fans vivent le football 24/7. Ce n’est pas un clone de X : c’est social viral + communautés profondes + base de données de référence (type Wikipédia foot × Transfermarkt) + expérience live (type Discord × scoreboard).

### Objectifs MVP (par priorité)
1. **Auth** : email + Google ; profil fan avec **club favori obligatoire** (table `profiles` / extension schéma).
2. **Feed** : posts, reposts (ou équivalent), clips, prédictions ; données persistées (ex. `social_posts` + évolutions).
3. **Fiches tuiles** : pages **Club /[slug]** et **Joueur /[slug]** riches, SEO, performantes — **killing feature**.
4. **Création de contenu** : texte, image, vidéo, sondage, prédiction (phaser : commencer par texte + image URL).
5. **Fan clubs** : par équipe/joueur ; badges, niveaux, leaderboards (socle tables + RLS d’abord).
6. **Rooms live** : par match + chat temps réel (Supabase Realtime après socle données match).
7. **Page « Les Vrais Mastodontes »** : ranking composite **revenus (logique Deloitte Money League)** + **valeur d’effectif (logique Transfermarkt)** ; chiffres seed = **démo uniquement** jusqu’import officiel ; disclaimer visible UI.

### Critère « Vrais Mastodontes »
- **35–50 clubs** max qualité (Europe ~80 % + Amériques + Brésil / Asie / Golfe sélectionnés). Pas de remplissage massif anonyme au MVP.
- Composite documenté (formule ou score pré-calculé dans seed) ; **ne jamais** présenter le seed comme source Deloitte/TM officielle.

### Stack cible (alignement progressif avec le repo)
- Next.js App Router + TypeScript strict + React récent.
- Tailwind + composants accessibles (Radix / shadcn si ajoutés par module).
- Supabase : Auth, PostgreSQL, RLS, Realtime, Storage, Edge Functions si besoin.
- Validation : Zod côté API ; ORM (Drizzle) **optionnel** par module social/data.
- TanStack Query pour états serveur client lourds ; Server Components / Actions ailleurs.
- Thème sombre premium football ; **mobile-first** ; **PWA** quand le socle est stable.
- Déploiement : Vercel ; pas de fuite de secrets ; `next/image` + budgets bundle.

### Livrables attendus (ordre)
1. Structure de dossiers documentée + migrations SQL versionnées.
2. Schéma Supabase + **RLS** testé (lecture publique contrôlée, écriture authentifiée).
3. Seed mastodontes (JSON ou SQL) + page `/mastodontes`.
4. Pages `club/[slug]` et `player/[slug]` au-dessus du standard marché.
5. Code modulaire, commenté, SEO (metadata, Open Graph de base).

### Exigences non négociables
- UX fluide ; pas de données financières seed présentées comme officielles.
- Performance : lazy-load sections lourdes ; CWV visés élevés sur pages publiques.
- Architecture extensible (IA clips / génération **plus tard**, hooks prévus).

Quand tu modifies le code : indique les fichiers touchés, les migrations à appliquer, et les variables d’environnement nécessaires.
```

---

## 2. Audit pas à pas (état repo **apexfootball**)

| # | Exigence | Statut | Preuve / constat | Action suivante |
|---|----------|--------|------------------|-----------------|
| 1 | Next App Router + TS | OK | `src/app/*`, `tsconfig` strict | Garder strict ; éviter `any` |
| 2 | Auth Google | OK | login, callback, `profiles` (migration 001) | Ajouter email si produit l’exige |
| 3 | Profil + **club favori obligatoire** | **Manquant** | `001_profiles` sans `favorite_club` | Colonne + UI onboarding / settings |
| 4 | Feed social | **Partiel** | Table `social_posts` en migration 002 | UI feed + mutations + appliquer 002 |
| 5 | Reposts / clips / polls | **Manquant** | Non modélisé | Tables ou champs `post_type`, `parent_id` |
| 6 | Fiches Club/Joueur « killing » | **Partiel** | Données `clubs`/`players` + modals | Routes dédiées SEO + contenu riche |
| 7 | Création contenu | **Manquant** | Pas de composer branché DB | Formulaire + Storage |
| 8 | Fan clubs | **Partiel** | `fan_clubs` + membres en 002 | UI + logique rôles |
| 9 | Rooms live + chat match | **Partiel** | `live_matches` côté app | Realtime + room par `match_id` |
| 10 | Page Mastodontes | OK | `/mastodontes` + JSON seed | Option : lire depuis `mastodonte_clubs` |
| 11 | Seed 35–50 mastodontes | OK | `mastodontes-2026-seed.json` | Sync SQL si besoin |
| 12 | Disclaimer seed financier | OK | `_meta` + page | Maintenir sur toute UI chiffrée |
| 13 | Supabase RLS | Partiel | 001 + 002 définis | **Appliquer** migrations sur projet cloud |
| 14 | Drizzle ORM | Non | — | Introduire si module data grossit |
| 15 | shadcn/ui | Non | Tailwind + composants maison | Ajouter par besoin |
| 16 | PWA | Non | — | `manifest` + service worker plus tard |
| 17 | i18n FR/EN/ES/PT | Partiel | `LanguageContext` | Étendre routes + contenu |
| 18 | Assistant IA « Apex Football Intelligence » | **Partiel** | Doc + `apexFootballIntelligence.ts` | Branché dans **Pro Chat** (voir code) |

**Verdict synthétique** : le socle **marketing + mastodontes + backoffice matchs** est là ; le cœur **social + fiches SEO + fan obligatoire** reste à construire. Les migrations SQL sont prêtes mais doivent être **appliquées** sur Supabase (voir `docs/SUPABASE_APPLIQUER_MIGRATIONS.md`).

---

## 3. Checklist avant de dire « MVP social prêt »

- [ ] `002_social_mastodontes.sql` exécuté sur le projet Supabase de prod/staging.
- [ ] Au moins un flux **create post → liste feed** avec RLS testé utilisateur réel.
- [ ] `favorite_club` (ou équivalent) requis avant usage feed.
- [ ] Pages `/club/[slug]` et `/player/[slug]` indexables (metadata dynamiques).
- [ ] Aucune communication publique sans disclaimer sur les chiffres seed.

---

## 4. Fichiers de référence (single source of truth)

| Sujet | Fichier |
|-------|---------|
| Vision + phases | `docs/ABSOLUMENT_FOOTBALL_ARCHITECTURE.md` |
| Règles assistant IA | `docs/APEX_FOOTBALL_INTELLIGENCE.md` + `src/lib/prompts/apexFootballIntelligence.ts` |
| Prompt Pro Chat (modes) | `src/lib/icqGrokConfig.ts` |
| Migrations | `supabase/migrations/001_profiles.sql`, `002_social_mastodontes.sql` |
| Seed mastodontes | `src/data/mastodontes-2026-seed.json` |

---

*Document généré pour itération produit ; à mettre à jour à chaque merge majeur.*
