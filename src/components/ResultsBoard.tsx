"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { LiveMatch, Club } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Trophy, ChevronRight } from "lucide-react";

type MatchWithClubs = LiveMatch & { home_club: Club; away_club: Club };

export default function ResultsBoard() {
  const { t } = useLanguage();
  const [matches, setMatches] = useState<MatchWithClubs[]>([]);
  const [filter, setFilter] = useState<"all" | "live" | "ft" | "upcoming">("all");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("live_matches")
        .select("*, home_club:clubs!home_club_id(*), away_club:clubs!away_club_id(*)")
        .order("status")
        .order("match_date", { ascending: false });
      if (data) setMatches(data as unknown as MatchWithClubs[]);
    }
    load();
  }, []);

  const filtered = filter === "all" ? matches : matches.filter((m) => {
    if (filter === "live") return m.status === "live" || m.status === "ht";
    return m.status === filter;
  });

  const byLeague = filtered.reduce<Record<string, MatchWithClubs[]>>((acc, m) => {
    const t = m.tournament || "Other";
    if (!acc[t]) acc[t] = [];
    acc[t].push(m);
    return acc;
  }, {});

  const liveCount = matches.filter((m) => m.status === "live" || m.status === "ht").length;
  const ftCount = matches.filter((m) => m.status === "ft").length;
  const upCount = matches.filter((m) => m.status === "upcoming").length;

  return (
    <section id="results" className="py-24 bg-[var(--background)] scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
              {t("section.results")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">
              Scoreboard
            </h2>
            <p className="text-[var(--muted)] mt-1">{matches.length} matches tracked</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {([
            { key: "all", label: "All", count: matches.length },
            { key: "live", label: t("match.live"), count: liveCount },
            { key: "ft", label: t("match.ft"), count: ftCount },
            { key: "upcoming", label: t("tournament.upcoming"), count: upCount },
          ] as const).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                filter === key
                  ? key === "live"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-[var(--accent)] text-black"
                  : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border-clr)] hover:text-[var(--foreground)]"
              }`}
            >
              {key === "live" && <span className="w-2 h-2 bg-red-500 rounded-full animate-blink" />}
              {label}
              <span className="text-[10px] opacity-70">({count})</span>
            </button>
          ))}
        </div>

        {/* Results table - grouped by league */}
        <div className="bg-[var(--surface)] border border-[var(--border-clr)] rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[var(--muted)]">No matches found</div>
          ) : (
            Object.entries(byLeague).map(([league, leagueMatches]) => (
              <div key={league}>
                <div className="px-4 py-2 bg-[var(--background)] border-b border-[var(--border-clr)] text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  {league}
                </div>
                {leagueMatches.map((match) => {
                  const isLive = match.status === "live" || match.status === "ht";
                  const isFt = match.status === "ft";
                  return (
                    <Link
                      key={match.id}
                      href={`/match/${match.id}`}
                      className={`grid grid-cols-12 gap-2 px-4 py-3 items-center border-b border-[var(--border-clr)] last:border-0 transition-colors hover:bg-[var(--surface-hover)] cursor-pointer ${
                        isLive ? "bg-red-500/[0.03]" : ""
                      }`}
                    >
                      {/* Status */}
                      <div className="col-span-2 min-w-[4rem]">
                        {isLive ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-wider rounded-full border border-red-500/20">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-blink" />
                            {match.minute}&apos;
                          </span>
                        ) : isFt ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--surface-hover)] text-[var(--muted)] text-[10px] font-bold uppercase rounded-full">
                            <Trophy className="w-3 h-3" />
                            FT
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-bold uppercase rounded-full">
                            <Calendar className="w-3 h-3" />
                            Soon
                          </span>
                        )}
                      </div>

                      {/* Home team */}
                      <div className="col-span-3 flex items-center gap-2 justify-end min-w-0">
                        <span className={`text-sm font-bold truncate ${isLive ? "text-[var(--foreground)]" : "text-[var(--foreground)]/80"}`}>
                        {match.home_club?.short_name}
                        </span>
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                          style={{
                            backgroundColor: match.home_club?.primary_color + "20",
                            color: match.home_club?.primary_color,
                          }}
                        >
                          {match.home_club?.code}
                        </div>
                      </div>

                      {/* Score */}
                      <div className="col-span-2 text-center">
                        {match.status === "upcoming" ? (
                          <span className="text-sm font-bold text-[var(--muted)]">vs</span>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <span className={`text-lg font-black ${isLive ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                              {match.home_score}
                            </span>
                            <span className="text-[var(--muted)] text-xs">-</span>
                            <span className={`text-lg font-black ${isLive ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                              {match.away_score}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Away team */}
                      <div className="col-span-3 flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                          style={{
                            backgroundColor: match.away_club?.primary_color + "20",
                            color: match.away_club?.primary_color,
                          }}
                        >
                          {match.away_club?.code}
                        </div>
                        <span className={`text-sm font-bold truncate ${isLive ? "text-[var(--foreground)]" : "text-[var(--foreground)]/80"}`}>
                          {match.away_club?.short_name}
                        </span>
                      </div>

                      {/* Tournament - hidden in grouped view */}
                      <div className="col-span-2 flex items-center justify-end">
                        <ChevronRight className="w-3 h-3 text-[var(--muted)] shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
