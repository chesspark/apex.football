# Authentification — Google, Apple ID & domain **apex.football**

Le TLD **`.football`** est un domaine de premier niveau (comme **`.com`**). L’app Next.js doit utiliser la même base d’URL pour les redirections OAuth que celle configurée dans Supabase.

## 1. Supabase Dashboard

### URLs de redirection (Authentication → URL configuration)

Ajoute au minimum :

| URL | Usage |
|-----|--------|
| `https://apex.football/auth/callback` | Production |
| `https://www.apex.football/auth/callback` | Si tu utilises le sous-domaine `www` |
| `http://localhost:3000/auth/callback` | Développement local |

**Site URL** : `https://apex.football` (prod) ou `http://localhost:3000` (dev).

### Fournisseurs

1. **Google** — activer *Google* ; renseigner *Client ID* et *Client Secret* (Google Cloud Console → OAuth 2.0).
2. **Apple** — activer *Apple* ; renseigner *Services ID*, *Secret Key*, *Team ID*, *Key ID* (Apple Developer → Sign in with Apple).

Pour Apple : activer **Sign in with Apple** sur l’App ID / Services ID et autoriser le redirect Supabase indiqué dans le dashboard.

## 2. Variables d’environnement (Vercel / `.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://apex.football
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

En **local**, tu peux laisser `NEXT_PUBLIC_SITE_URL` vide : le callback utilisera l’origine de la requête (`getServerSiteUrl`).

⚠️ Ne mets **pas** l’URL de prod en `NEXT_PUBLIC_SITE_URL` sur ta machine si tu testes sur `localhost` — les redirections OAuth casseraient.

## 3. Profil social

Après connexion (Google ou Apple), l’utilisateur est redirigé vers **`/profile`** (paramètre `next` sur `/login`).

- Édition : **`/profile`** (protégé par middleware si non connecté).
- Fiche publique : **`https://apex.football/u/ton-pseudo`** (données via RPC SQL `get_public_profile` — pas d’email exposé).

## 4. Migration SQL

Appliquer **`supabase/migrations/003_profiles_social.sql`** après `001_profiles.sql` (SQL Editor ou `supabase db push`).

---

*Révision : à chaque changement de domaine ou de préfixe `www`, synchroniser Supabase + `NEXT_PUBLIC_SITE_URL`.*
