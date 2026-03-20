import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMastodonteMeta, getMastodontesSorted } from "@/lib/mastodontes-data";
import { Trophy, TrendingUp, Landmark, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Les Vrais Mastodontes | Apex Football",
  description:
    "Ranking composite démo (revenus Deloitte-style + valeur Transfermarkt-style) — seed MVP Absolument Football.",
};

export default function MastodontesPage() {
  const meta = getMastodonteMeta();
  const rows = getMastodontesSorted();

  return (
    <main className="min-h-screen bg-[#050508] text-[#e8e8ec]">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#0c0c10] via-[#101018] to-[#060608] p-8 sm:p-12 mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.35em] mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Absolument Football · Data MVP
            </p>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Les Vrais Mastodontes
            </h1>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              <strong className="text-white">Verdict :</strong> ce classement combine des indicateurs
              « revenus » et « valeur d’effectif » pour prioriser les clubs qui pèsent vraiment à
              l’échelle mondiale — <span className="text-amber-200/90">seed démo</span>, pas une
              publication Deloitte/Transfermarkt.
            </p>
            <p className="mt-3 text-xs text-zinc-500 border-l-2 border-[#D4AF37]/50 pl-3">
              {meta.disclaimer}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
            <Landmark className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Axe revenus</p>
              <p className="text-sm font-semibold text-white">Deloitte Money League (logique)</p>
              <p className="text-xs text-zinc-500 mt-1">Millions € — placeholder seed</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Axe effectif</p>
              <p className="text-sm font-semibold text-white">Transfermarkt (logique)</p>
              <p className="text-xs text-zinc-500 mt-1">Valeur de groupe — placeholder seed</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Composite</p>
              <p className="text-sm font-semibold text-white">Score 0–100</p>
              <p className="text-xs text-zinc-500 mt-1">{meta.composite_formula}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 overflow-hidden">
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
                {rows.map((c, i) => (
                  <tr
                    key={c.slug}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-3 px-3 font-mono text-zinc-500">{i + 1}</td>
                    <td className="py-3 px-3 font-bold text-white">{c.name}</td>
                    <td className="py-3 px-3 text-zinc-400 hidden md:table-cell">
                      {c.country} · {c.league}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">{c.deloitte_revenue_m_eur}</td>
                    <td className="py-3 px-3 text-right tabular-nums">{c.transfermarkt_squad_value_m_eur}</td>
                    <td className="py-3 px-3 text-right font-black text-[#D4AF37] tabular-nums">
                      {c.composite_score.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-xs text-zinc-600 text-center max-w-2xl mx-auto">
          Prochaine étape : importer ce seed en SQL via{" "}
          <code className="text-zinc-400">mastodonte_clubs</code> ou ETL — voir{" "}
          <code className="text-zinc-500">docs/ABSOLUMENT_FOOTBALL_ARCHITECTURE.md</code>{" "}
          à la racine du projet.
        </p>
      </div>
      <Footer />
    </main>
  );
}
