# QA — profil social & partage (WhatsApp, Telegram, Instagram)

## Automatisé (local / CI)

```bash
npm run test
# alias : npm run ci  → lint + build
```

## Tests manuels (après `npm run dev`)

1. **Profil** — `/profile` (connecté) : enregistrer un pseudo → section **Partager** visible.
2. **Fiche publique** — `/u/[pseudo]` : barre **Partager** sous la bio.
3. **WhatsApp** — le lien ouvre `wa.me` avec texte prérempli (nouvel onglet).
4. **Telegram** — ouvre le partage `t.me/share/url` avec URL + titre.
5. **Instagram** — clic **Instagram** copie une **légende** (bio + URL + hashtags) ; coller dans l’app Instagram (story / note / bio). Pas d’API web officielle pour ouvrir IG directement.
6. **Lien** — copie l’URL canonique (`NEXT_PUBLIC_SITE_URL` ou fallback `https://apex.football`).
7. **Partager…** — visible sur navigateurs / OS avec **Web Share API** (surtout mobile).

## Production

Vérifier `NEXT_PUBLIC_SITE_URL=https://apex.football` sur Vercel pour des URLs de partage correctes.
