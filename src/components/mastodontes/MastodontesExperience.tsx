"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Crown, Medal, Award, Sparkles } from "lucide-react";
import type { MastodonteClubSeed, MastodonteSeedMeta } from "@/lib/mastodontes-data";

type Props = {
  rows: MastodonteClubSeed[];
  meta: MastodonteSeedMeta;
};

function PodiumCard({
  club,
  rank,
  accent,
}: {
  club: MastodonteClubSeed;
  rank: 1 | 2 | 3;
  accent: "gold" | "silver" | "bronze";
}) {
  const styles = {
    gold: "from-amber-500/20 border-amber-400/40 shadow-amber-500/10 text-amber-300",
    silver: "from-zinc-400/15 border-zinc-400/30 shadow-zinc-400/5 text-zinc-200",
    bronze: "from-orange-700/20 border-orange-600/35 shadow-orange-900/20 text-orange-200",
  }[accent];

  const Icon = rank === 1 ? Crown : rank === 2 ? Medal : Award;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b ${styles} p-4 sm:p-5 shadow-xl flex flex-col justify-between min-h-[140px] mastodonte-podium-card`}
      style={{ animationDelay: `${rank * 80}ms` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_60%)] pointer-events-none" />
      <div className="relative flex items-start justify-between gap-2">
        <span className="text-3xl font-black tabular-nums text-white/90">#{rank}</span>
        <Icon className="w-6 h-6 opacity-90 shrink-0" aria-hidden />
      </div>
      <div className="relative mt-2">
        <p className="font-black text-white text-sm sm:text-base leading-tight line-clamp-2">{club.name}</p>
        <p className="text-[10px] sm:text-xs text-white/50 mt-1 line-clamp-1">
          {club.country} · {club.league}
        </p>
        <p className="text-lg font-black text-[#D4AF37] mt-2 tabular-nums">{club.composite_score.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default function MastodontesExperience({ rows, meta }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.country.toLowerCase().includes(s) ||
        c.league.toLowerCase().includes(s) ||
        c.slug.includes(s)
    );
  }, [rows, q]);

  const top3 = rows.slice(0, 3);

  return (
    <>
      {top3.length >= 3 && (
        <section className="mb-10" aria-label="Podium des trois premiers">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" aria-hidden />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Podium mondial (seed)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="sm:order-2 sm:pt-0 pt-2">
              <PodiumCard club={top3[0]!} rank={1} accent="gold" />
            </div>
            <div className="sm:order-1 sm:translate-y-2">
              <PodiumCard club={top3[1]!} rank={2} accent="silver" />
            </div>
            <div className="sm:order-3 sm:translate-y-3">
              <PodiumCard club={top3[2]!} rank={3} accent="bronze" />
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <label className="relative flex-1 max-w-md">
          <span className="sr-only">Rechercher un club</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher club, pays, ligue…"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/30"
          />
        </label>
        <p className="text-xs text-zinc-500 shrink-0">
          {filtered.length} / {rows.length} clubs
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-left text-[10px] uppercase tracking-wider text-zinc-500">
                <th className="py-3 px-3 w-12">#</th>
                <th className="py-3 px-3">Club</th>
                <th className="py-3 px-3 hidden md:table-cell">Pays / Ligue</th>
                <th className="py-3 px-3 text-right">Rev. (M€)</th>
                <th className="py-3 px-3 text-right">TM (M€)</th>
                <th className="py-3 px-3 text-right text-[#D4AF37]">Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const globalRank = rows.findIndex((r) => r.slug === c.slug) + 1;
                return (
                  <tr
                    key={c.slug}
                    className="border-b border-white/5 hover:bg-white/[0.05] transition-colors group mastodonte-row-animate"
                    style={{ animationDelay: `${Math.min(i, 24) * 25}ms` }}
                  >
                    <td className="py-3 px-3 font-mono text-zinc-500">{globalRank}</td>
                    <td className="py-3 px-3 font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {c.name}
                    </td>
                    <td className="py-3 px-3 text-zinc-400 hidden md:table-cell">
                      {c.country} · {c.league}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-300">{c.deloitte_revenue_m_eur}</td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-300">{c.transfermarkt_squad_value_m_eur}</td>
                    <td className="py-3 px-3 text-right font-black text-[#D4AF37] tabular-nums">
                      {c.composite_score.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-zinc-500 text-sm">Aucun club ne correspond à « {q} ».</p>
        )}
      </div>

      <p className="mt-8 text-xs text-zinc-600 text-center max-w-2xl mx-auto leading-relaxed">
        Formule (rappel) : {meta.composite_formula}
        <br />
        <Link href="/" className="text-[#D4AF37]/90 hover:text-[#D4AF37] underline-offset-2 hover:underline mt-2 inline-block">
          ← Retour à l’accueil Apex Football
        </Link>
      </p>
    </>
  );
}
