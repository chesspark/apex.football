"use client";

import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Player, Club } from "@/lib/types";
import { useFavorites } from "@/context/FavoritesContext";
import PlayerModal from "./PlayerModal";

type PlayerWithClub = Player & { club: Club };

export default function FavoritesBar() {
  const { favorites, toggleFavorite, count } = useFavorites();
  const [players, setPlayers] = useState<PlayerWithClub[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithClub | null>(null);

  useEffect(() => {
    async function fetchFavs() {
      if (favorites.length === 0) { setPlayers([]); return; }
      const { data } = await supabase.from("players").select("*, club:clubs(*)").in("id", favorites);
      if (data) setPlayers(data as unknown as PlayerWithClub[]);
    }
    fetchFavs();
  }, [favorites]);

  if (count === 0) return null;

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[var(--background)]/95 backdrop-blur-xl border border-[var(--border-clr)] rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 animate-fade-in-up">
        <div className="flex items-center gap-1.5 px-2 shrink-0">
          <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
          <span className="text-xs font-bold text-[var(--muted)]">{count}/5</span>
        </div>
        <div className="h-8 w-px bg-[var(--border-clr)]" />
        <div className="flex items-center gap-2">
          {players.map((player) => (
            <div key={player.id} className="relative group cursor-pointer" onClick={() => setSelectedPlayer(player)}>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--surface)] border-2 border-[var(--border-clr)] hover:border-[var(--accent)]/50 transition-colors">
                {player.photo_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={player.photo_url} alt={player.name} className="w-full h-full object-cover" />
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(player.id); }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5 text-white" />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {player.name}
              </div>
            </div>
          ))}
          {Array.from({ length: 5 - count }).map((_, i) => (
            <div key={`empty-${i}`} className="w-10 h-10 rounded-full border-2 border-dashed border-[var(--border-clr)] flex items-center justify-center">
              <span className="text-[var(--muted)] text-xs">+</span>
            </div>
          ))}
        </div>
      </div>
      {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
    </>
  );
}
