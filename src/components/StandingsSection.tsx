"use client";

import { useState } from "react";
import { sampleStandings } from "@/lib/standings";

export default function StandingsSection() {
  const [activeLeague, setActiveLeague] = useState(0);
  const standings = sampleStandings[activeLeague];

  return (
    <section className="py-16 bg-[var(--surface)]/30 border-t border-[var(--border-clr)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)] mb-6">
          Classements
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {sampleStandings.map((s, i) => (
            <button
              key={s.league}
              onClick={() => setActiveLeague(i)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeLeague === i
                  ? "bg-[var(--accent)] text-black"
                  : "bg-[var(--background)] text-[var(--muted)] border border-[var(--border-clr)] hover:text-[var(--foreground)]"
              }`}
            >
              {s.leagueLogo} {s.league}
            </button>
          ))}
        </div>

        <div className="bg-[var(--background)] border border-[var(--border-clr)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border-clr)] flex items-center gap-2">
            <span className="text-xl">{standings.leagueLogo}</span>
            <span className="font-bold text-[var(--foreground)]">{standings.league}</span>
            <span className="text-[10px] text-[var(--muted)]">({standings.season})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-clr)] text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  <th className="text-left py-3 px-4 w-10">#</th>
                  <th className="text-left py-3 px-4">Équipe</th>
                  <th className="text-center py-3 px-2 w-12">J</th>
                  <th className="text-center py-3 px-2 w-12">G</th>
                  <th className="text-center py-3 px-2 w-12">N</th>
                  <th className="text-center py-3 px-2 w-12">P</th>
                  <th className="text-center py-3 px-2 w-12">BP</th>
                  <th className="text-center py-3 px-2 w-12">BC</th>
                  <th className="text-center py-3 px-2 w-12">+/-</th>
                  <th className="text-center py-3 px-4 w-14 font-black text-[var(--accent)]">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.rows.map((row) => (
                  <tr
                    key={row.team}
                    className="border-b border-[var(--border-clr)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-[var(--foreground)]">{row.rank}</td>
                    <td className="py-3 px-4 font-bold text-[var(--foreground)]">{row.team}</td>
                    <td className="py-3 px-2 text-center text-[var(--muted)]">{row.played}</td>
                    <td className="py-3 px-2 text-center text-[var(--muted)]">{row.won}</td>
                    <td className="py-3 px-2 text-center text-[var(--muted)]">{row.drawn}</td>
                    <td className="py-3 px-2 text-center text-[var(--muted)]">{row.lost}</td>
                    <td className="py-3 px-2 text-center text-[var(--muted)]">{row.goalsFor}</td>
                    <td className="py-3 px-2 text-center text-[var(--muted)]">{row.goalsAgainst}</td>
                    <td className={`py-3 px-2 text-center font-medium ${row.goalDiff >= 0 ? "text-[var(--accent-green)]" : "text-red-400"}`}>
                      {row.goalDiff >= 0 ? "+" : ""}{row.goalDiff}
                    </td>
                    <td className="py-3 px-4 text-center font-black text-[var(--accent)]">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
