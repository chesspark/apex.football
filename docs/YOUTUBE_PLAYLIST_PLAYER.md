# Lecteur playlist (toutes les pages)

Le composant `YoutubePlaylistPlayer` affiche une **playlist publique** YouTube / **YouTube Music** (même identifiant `list=PL…`).

## Configuration

1. Sur [YouTube Music](https://music.youtube.com) ou YouTube, ouvre la playlist **publique** liée au compte concerné (ex. aldric.laure@gmail.com).
2. **Partager** → copier le lien. Il contient `list=PLxxxxxxxx…`.
3. Dans `.env.local` (ou Vercel) :

```env
NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=PLxxxxxxxxxxxxxxxx
```

Redémarre `npm run dev` ou redeploie.

## Comportement

- Barre fixe en bas à **gauche** (le Pro Chat reste à droite).
- Réduire / agrandir ; **X** masque le lecteur jusqu’au prochain rechargement.
- Techniquement : iframe `youtube.com/embed/videoseries?list=…` (API officielle d’embed).

## Limites

- Google ne fournit pas d’API pour résoudre une playlist à partir d’un **e-mail** seul : l’**ID playlist** est obligatoire.
- L’autoplay peut être limité par le navigateur.
