# Appliquer les migrations Supabase (Apex Football)

## Prérequis

- Compte [Supabase](https://supabase.com) et projet créé.
- `001_profiles.sql` déjà exécuté **si** tu utilises les profils + trigger `on_auth_user_created` (sinon exécute-le **avant** `002`).

---

## Méthode A — SQL Editor (la plus simple, sans CLI)

1. Ouvre ton projet Supabase → **SQL Editor** → **New query**.
2. Colle le contenu **dans l’ordre** :
   - `supabase/migrations/001_profiles.sql` (si pas encore appliqué),
   - puis `supabase/migrations/002_social_mastodontes.sql`.
3. **Run**. Vérifie qu’il n’y a pas d’erreur.
4. (Optionnel) **Table Editor** → confirme la présence de `mastodonte_clubs`, `social_posts`, etc.

---

## Méthode B — Supabase CLI (`db push`)

Sur ta machine (réseau npm / accès Internet requis) :

```bash
cd /chemin/vers/apexfootball

# 1) CLI (une fois)
npm install -g supabase
# ou : npx supabase@latest --version

# 2) Connexion
supabase login

# 3) Lier le dossier au projet cloud (ref = Project ID dans Settings → General)
supabase link --project-ref TON_PROJECT_REF

# 4) Pousser les migrations du dossier supabase/migrations/
supabase db push
```

Si `db push` demande le mot de passe DB : **Settings → Database → Database password** (ou reset).

---

## Vérification rapide

Dans **SQL Editor** :

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('mastodonte_clubs', 'social_posts', 'fan_clubs', 'match_predictions');
```

Tu dois voir les 4 tables (après `002`).

---

## Problèmes fréquents

| Symptôme | Piste |
|----------|--------|
| `relation "auth.users" does not exist` | Tu n’es pas sur une instance Supabase (Auth) — utilise toujours le SQL Editor du **projet** Supabase. |
| `policy already exists` | Migration déjà partiellement appliquée : adapter le script (DROP POLICY IF EXISTS) ou ignorer si les objets existent déjà. |
| Erreur sur `live_matches` | **Normal pour `002`** : la FK vers `live_matches` a été retirée ; seule une ancienne version du fichier pourrait encore la référencer. |

---

## Script `scripts/seed.mjs` (données clubs / matchs)

Variables **obligatoires** :

- `SUPABASE_SERVICE_ROLE_KEY` — **Settings → API → service_role** (ne jamais commit).
- `SUPABASE_URL` **ou** `NEXT_PUBLIC_SUPABASE_URL` — URL du projet (`https://xxx.supabase.co`).

### Option 1 — Fichier `.env.local` (recommandé, Node 20+)

Copie `.env.example` vers `.env.local`, remplis les clés, puis :

```bash
cd /chemin/vers/apexfootball
npm run seed
```

(`package.json` utilise `node --env-file=.env.local scripts/seed.mjs`.)

### Option 2 — Variables dans le shell

```bash
export SUPABASE_URL="https://TON_PROJET.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJ..."
node scripts/seed.mjs
```

(Si tu n’exportes que `NEXT_PUBLIC_SUPABASE_URL`, ça suffit aussi à la place de `SUPABASE_URL`.)

### Si `npm run seed` échoue avec « unknown option --env-file »

Mets à jour Node **≥ 20.6** ou lance sans `--env-file` :

```bash
set -a && source .env.local && set +a   # ou export manuel
node scripts/seed.mjs
```
