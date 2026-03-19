"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { LiveMatch, Club } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

type MatchWithClubs = LiveMatch & { home_club: Club; away_club: Club };

export default function LiveMatchesTicker() {
  const { t } = useLanguage();
  const [matches, setMatches] = useState<MatchWithClubs[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("live_matches")
        .select("*, home_club:clubs!home_club_id(*), away_club:clubs!away_club_id(*)")
        .order("status");
      if (data) setMatches(data as unknown as MatchWithClubs[]);
    }
    load();
  }, []);

  const live = matches.filter((m) => m.status === "live" || m.status === "ht");
  const finished = matches.filter((m) => m.status === "ft");
  const upcoming = matches.filter((m) => m.status === "upcoming");

  const MatchCard = ({ match }: { match: MatchWithClubs }) => {
    const isLive = match.status === "live" || match.status === "ht";
    return (
      <div
        className={`relative bg-[var(--surface)] border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${
          isLive ? "border-red-500/20 hover:border-red-500/40" : "border-[var(--border-clr)] hover:border-[var(--accent)]/20"
        }`}
      >
        {isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-blink" />
            <span className="text-[10px] font-bold text-red-400 uppercase">{t("match.live")}</span>
          </div>
        )}
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-semibold mb-4">{match.tournament}</div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 text-center">
            <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-xs font-black mb-1" style={{ backgroundColor: match.home_club?.primary_color + "25", color: match.home_club?.primary_color }}>{match.home_club?.code}</div>
            <div className="text-xs font-bold text-[var(--foreground)] truncate">{match.home_club?.short_name}</div>
          </div>
          <div className="text-center px-3">
            {match.status === "upcoming" ? (
              <div className="text-lg font-bold text-[var(--muted)]">vs</div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[var(--foreground)]">{match.home_score}</span>
                <span className="text-[var(--muted)]">-</span>
                <span className="text-2xl font-black text-[var(--foreground)]">{match.away_score}</span>
              </div>
            )}
            <div className={`text-[10px] font-bold mt-1 ${isLive ? "text-red-400" : match.status === "ft" ? "text-[var(--muted)]" : "text-[var(--accent)]"}`}>
              {isLive ? `${match.minute}'` : match.status === "ft" ? "FT" : "Upcoming"}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-xs font-black mb-1" style={{ backgroundColor: match.away_club?.primary_color + "25", color: match.away_club?.primary_color }}>{match.away_club?.code}</div>
            <div className="text-xs font-bold text-[var(--foreground)] truncate">{match.away_club?.short_name}</div>
          </div>
        </div>
        <div className="text-[10px] text-[var(--muted)] text-center mt-3">{match.stadium}</div>
      </div>
    );
  };

  if (matches.length === 0) return null;

  return (
    <section id="results" className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">{t("section.results")}</span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">{t("section.results")}</h2>
        </div>

        {live.length > 0 && (
          <div className="mb-10" id="live">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              <h3 className="text-lg font-bold uppercase tracking-wider text-red-400">{t("nav.live")}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {live.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        )}

        {finished.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--muted)] mb-5">Full Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {finished.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        )}

        {upcoming.length > 0 && (
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--muted)] mb-5">{t("tournament.upcoming")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
