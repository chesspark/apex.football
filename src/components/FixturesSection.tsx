"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { LiveMatch, Club } from "@/lib/types";
import { Calendar, ChevronRight } from "lucide-react";

type MatchWithClubs = LiveMatch & { home_club: Club; away_club: Club };

export default function FixturesSection() {
  const [upcoming, setUpcoming] = useState<MatchWithClubs[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("live_matches")
        .select("*, home_club:clubs!home_club_id(*), away_club:clubs!away_club_id(*)")
        .eq("status", "upcoming")
        .order("match_date", { ascending: true })
        .limit(12);
      if (data) setUpcoming(data as unknown as MatchWithClubs[]);
    }
    load();
  }, []);

  if (upcoming.length === 0) return null;

  return (
    <section className="py-16 bg-[var(--background)] border-t border-[var(--border-clr)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--accent)]" />
            <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
              Calendrier
            </h2>
          </div>
          <Link
            href="/#results"
            className="text-sm font-medium text-[var(--accent)] hover:underline flex items-center gap-1"
          >
            Voir tout
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {upcoming.map((m) => {
            const date = m.match_date ? new Date(m.match_date) : null;
            return (
              <Link
                key={m.id}
                href={`/match/${m.id}`}
                className="flex items-center gap-4 p-4 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl hover:border-[var(--accent)]/30 transition-all"
              >
                <div className="text-center shrink-0 w-14">
                  {date && (
                    <>
                      <div className="text-[10px] font-bold uppercase text-[var(--muted)]">
                        {date.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </div>
                      <div className="text-lg font-black text-[var(--accent)]">
                        {date.getDate()}
                      </div>
                      <div className="text-[10px] text-[var(--muted)]">
                        {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[var(--muted)] truncate">{m.tournament}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold truncate">{m.home_club?.short_name}</span>
                    <span className="text-[var(--muted)] text-xs">vs</span>
                    <span className="text-sm font-bold truncate">{m.away_club?.short_name}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
