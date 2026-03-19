"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, SlidersHorizontal, Heart, ChevronDown, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Player, Club } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/context/FavoritesContext";
import PlayerModal from "./PlayerModal";

type PlayerWithClub = Player & { club: Club };

const POSITIONS = ["All", "GK", "DEF", "MID", "FWD"];

export default function PlayerGrid() {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite, canAddMore, favorites } = useFavorites();

  const [players, setPlayers] = useState<PlayerWithClub[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");
  const [selectedClub, setSelectedClub] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "goals" | "assists" | "market_value_millions">("rating");
  const [showFavsOnly, setShowFavsOnly] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithClub | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    async function load() {
      const [playersRes, clubsRes] = await Promise.all([
        supabase.from("players").select("*, club:clubs(*)").order("rating", { ascending: false }),
        supabase.from("clubs").select("*").order("name"),
      ]);
      if (playersRes.data) setPlayers(playersRes.data as unknown as PlayerWithClub[]);
      if (clubsRes.data) setClubs(clubsRes.data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = [...players];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nationality.toLowerCase().includes(q) ||
          p.club?.short_name?.toLowerCase().includes(q)
      );
    }

    if (position !== "All") result = result.filter((p) => p.position === position);
    if (selectedClub) result = result.filter((p) => p.club_id === selectedClub);
    if (showFavsOnly) result = result.filter((p) => favorites.includes(p.id));

    result.sort((a, b) => {
      const av = a[sortBy] ?? 0;
      const bv = b[sortBy] ?? 0;
      return (bv as number) - (av as number);
    });

    return result;
  }, [players, search, position, selectedClub, sortBy, showFavsOnly, favorites]);

  const visible = filtered.slice(0, visibleCount);

  if (loading) {
    return (
      <section id="players" className="py-24 bg-[var(--background)] scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-[var(--surface)] rounded-xl w-64 mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-72 bg-[var(--surface)] rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="players" className="py-24 bg-[var(--background)] scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">Premier League</span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">{t("section.trending")}</h2>
            <p className="text-[var(--muted)] mt-1">{players.length} players across 20 clubs</p>
          </div>
          <button
            onClick={() => setShowFavsOnly(!showFavsOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
              showFavsOnly
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-[var(--surface)] border-[var(--border-clr)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Heart className="w-4 h-4" fill={showFavsOnly ? "currentColor" : "none"} />
            My Favorites ({favorites.length}/5)
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players, clubs, countries..."
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-[var(--muted)] hover:text-[var(--foreground)]" />
              </button>
            )}
          </div>

          <div className="flex bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl overflow-hidden">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  position === pos
                    ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={selectedClub || ""}
              onChange={(e) => setSelectedClub(e.target.value ? Number(e.target.value) : null)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl text-sm text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/30 cursor-pointer"
            >
              <option value="">All Clubs</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>{club.short_name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
          </div>

          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none pl-9 pr-8 py-2.5 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl text-sm text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/30 cursor-pointer"
            >
              <option value="rating">Rating</option>
              <option value="goals">Goals</option>
              <option value="assists">Assists</option>
              <option value="market_value_millions">Value</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
          </div>
        </div>

        <div className="text-xs text-[var(--muted)] mb-4 uppercase tracking-wider">
          {filtered.length} {filtered.length === 1 ? "player" : "players"} found
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((player) => {
            const fav = isFavorite(player.id);
            return (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="group relative bg-[var(--surface)] border border-[var(--border-clr)] rounded-2xl overflow-hidden hover:border-[var(--accent)]/20 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <div className="h-1 w-full" style={{ backgroundColor: player.club?.primary_color || "var(--accent)" }} />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--surface-hover)] shrink-0 border border-[var(--border-clr)]">
                      {player.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={player.photo_url} alt={player.name} className="w-full h-full object-cover" loading="lazy" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[var(--foreground)] truncate group-hover:text-[var(--accent)] transition-colors">{player.name}</h3>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(player.id); }}
                          disabled={!fav && !canAddMore}
                          className={`shrink-0 p-1 rounded-full transition-all ${fav ? "text-red-400" : canAddMore ? "text-[var(--muted)] hover:text-red-400" : "text-[var(--muted)]/30 cursor-not-allowed"}`}
                        >
                          <Heart className="w-4 h-4" fill={fav ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                          style={{
                            backgroundColor: (player.club?.primary_color || "var(--accent)") + "25",
                            color: player.club?.primary_color || "var(--accent)",
                          }}
                        >
                          {player.club?.code}
                        </span>
                        <span className="text-[10px] text-[var(--muted)]">{player.position}</span>
                        <span className="text-[10px] text-[var(--muted)]">{player.nationality}</span>
                      </div>
                      {player.shirt_number && <span className="text-[10px] text-[var(--muted)]">#{player.shirt_number}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-[var(--border-clr)]">
                    <div className="text-center">
                      <div className="text-sm font-black text-[var(--foreground)]">{player.goals}</div>
                      <div className="text-[8px] uppercase tracking-wider text-[var(--muted)]">{t("player.goals")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-black text-[var(--foreground)]">{player.assists}</div>
                      <div className="text-[8px] uppercase tracking-wider text-[var(--muted)]">{t("player.assists")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-black text-[var(--foreground)]">{player.appearances}</div>
                      <div className="text-[8px] uppercase tracking-wider text-[var(--muted)]">{t("player.matches")}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-black text-[var(--accent)]">{player.rating}</div>
                      <div className="text-[8px] uppercase tracking-wider text-[var(--muted)]">{t("player.rating")}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((v) => v + 24)}
              className="px-8 py-3 bg-[var(--surface)] border border-[var(--border-clr)] rounded-full text-sm font-bold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/20 transition-all"
            >
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚽</div>
            <div className="text-[var(--muted)] text-lg">No players found</div>
            <button
              onClick={() => { setSearch(""); setPosition("All"); setSelectedClub(null); setShowFavsOnly(false); }}
              className="mt-4 text-[var(--accent)] text-sm font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </section>
  );
}
