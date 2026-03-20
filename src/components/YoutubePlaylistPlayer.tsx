"use client";

import { useCallback, useId, useState } from "react";
import { Music, ChevronDown, ChevronUp, X } from "lucide-react";

/**
 * Lecteur playlist YouTube (inclut les playlists **YouTube Music** publiques : même ID `list=PL…`).
 * Compte source documenté côté config : aldric.laure@gmail.com — l’embed utilise uniquement l’ID playlist.
 *
 * Définir `NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID` (ex. PLxxxxxxxx) depuis l’URL :
 * https://music.youtube.com/playlist?list=PL… ou YouTube → Partager.
 */
export default function YoutubePlaylistPlayer() {
  const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID?.trim();
  const labelId = useId();
  const [open, setOpen] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const toggle = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  if (!playlistId || dismissed) {
    if (process.env.NODE_ENV === "development" && !playlistId) {
      return (
        <div className="fixed bottom-20 left-4 z-[45] max-w-sm rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-[10px] text-amber-200">
          Lecteur playlist : ajoute <code className="font-mono">NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID</code> dans
          .env.local (ID depuis une playlist publique YouTube Music / YouTube).
        </div>
      );
    }
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlistId)}&modestbranding=1`;

  return (
    <div
      className="fixed bottom-4 left-4 z-[45] flex flex-col gap-0 max-w-[min(100vw-2rem,380px)] shadow-2xl rounded-xl overflow-hidden border border-[var(--border-clr)] bg-[var(--background)]/95 backdrop-blur-md"
      role="region"
      aria-labelledby={labelId}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[var(--border-clr)]">
        <div className="flex items-center gap-2 min-w-0">
          <Music className="w-4 h-4 text-red-500 shrink-0" aria-hidden />
          <span id={labelId} className="text-xs font-bold uppercase tracking-wide text-[var(--foreground)] truncate">
            Playlist
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
            aria-expanded={open}
            aria-controls="apex-yt-iframe-wrap"
            title={open ? "Réduire" : "Agrandir"}
          >
            {open ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-400 hover:bg-[var(--surface-hover)]"
            title="Masquer le lecteur (rafraîchir la page pour réafficher)"
            aria-label="Masquer le lecteur"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {open && (
        <div id="apex-yt-iframe-wrap" className="relative w-full bg-black aspect-video max-h-[220px]">
          <iframe
            title="Playlist YouTube — lecture"
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
      {!open && (
        <button
          type="button"
          onClick={toggle}
          className="px-3 py-2 text-left text-[10px] text-[var(--muted)] hover:text-[var(--accent)] w-full"
        >
          Ouvrir le lecteur
        </button>
      )}
    </div>
  );
}
