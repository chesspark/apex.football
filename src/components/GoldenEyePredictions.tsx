"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { LiveMatch, Club } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import {
  goldenEyeFullAnalysis,
  computeApexOrbitalEloDelta,
  type GoldenEyeReport,
} from "@/lib/goldenEyePredictions";
import { Radar, Sparkles, ScanEye, Zap } from "lucide-react";

type MatchWithClubs = LiveMatch & { home_club: Club; away_club: Club };

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-[11px] border-b border-[#B8860B]/15 py-1.5 last:border-0">
      <span className="text-[#C4B998] uppercase tracking-wider">{label}</span>
      <span className="font-mono text-[#FFD700] text-right">{value}</span>
    </div>
  );
}

function OneMatchGoldenBlock({ m }: { m: MatchWithClubs }) {
  const r: GoldenEyeReport = goldenEyeFullAnalysis({
    matchId: m.id,
    homeCode: m.home_club?.code || "H",
    awayCode: m.away_club?.code || "A",
    tournament: m.tournament,
  });
  const elo = computeApexOrbitalEloDelta(
    m.home_club?.code || "H",
    m.away_club?.code || "A",
    m.id
  );
  const stars = "★".repeat(r.confidenceTier) + "☆".repeat(5 - r.confidenceTier);

  return (
    <div className="rounded-xl border border-[#B8860B]/40 bg-gradient-to-br from-[#0d0d0f] via-[#121018] to-[#0a0a0c] p-4 shadow-[0_0_40px_rgba(255,215,0,0.06)]">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/80">
            GoldenEye® · Orbital
          </p>
          <Link href={`/match/${m.id}`} className="text-sm font-black text-[#FFF8DC] hover:text-[#FFD700] mt-1 inline-block">
            {m.home_club?.short_name} vs {m.away_club?.short_name}
          </Link>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/30">
          {m.status === "upcoming" ? "PRE-MATCH" : m.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="rounded-lg bg-black/40 border border-[#B8860B]/20 py-2">
          <div className="text-lg font-black text-[#FFD700]">{Math.round(r.probHomeWin * 100)}%</div>
          <div className="text-[8px] text-[#8a8168] uppercase">1</div>
        </div>
        <div className="rounded-lg bg-black/40 border border-[#B8860B]/20 py-2">
          <div className="text-lg font-black text-[#E8DCC4]">{Math.round(r.probDraw * 100)}%</div>
          <div className="text-[8px] text-[#8a8168] uppercase">X</div>
        </div>
        <div className="rounded-lg bg-black/40 border border-[#B8860B]/20 py-2">
          <div className="text-lg font-black text-[#FFD700]">{Math.round(r.probAwayWin * 100)}%</div>
          <div className="text-[8px] text-[#8a8168] uppercase">2</div>
        </div>
      </div>

      <div className="text-center mb-3 py-2 rounded-lg bg-[#FFD700]/5 border border-[#FFD700]/10">
        <span className="text-[10px] text-[#C4B998] uppercase tracking-widest">Verdict fusion</span>
        <div className="text-xl font-black text-[#FFD700] mt-0.5">
          {r.apexGoldenVerdict === "1" ? "1 · Domicile" : r.apexGoldenVerdict === "2" ? "2 · Extérieur" : "X · Nul"}{" "}
          <span className="text-sm text-[#8a8168]">({r.verdictConfidencePct}%)</span>
        </div>
        <div className="text-xs text-[#E8DCC4] mt-1">
          Score le plus probable : <strong className="text-[#FFD700]">{r.mostLikelyScore}</strong>{" "}
          ({(r.mostLikelyScoreProb * 100).toFixed(1)}%)
        </div>
      </div>

      <div className="space-y-0.5 mb-2">
        <ReportRow label="Forme orbitale H/A" value={`${r.orbitalFormHome.toFixed(2)} / ${r.orbitalFormAway.toFixed(2)}`} />
        <ReportRow label="Momentum stellaire" value={`${r.stellarMomentumHome.toFixed(2)} / ${r.stellarMomentumAway.toFixed(2)}`} />
        <ReportRow label="Voile nébuleux déf." value={`${r.nebulaDefenseHome.toFixed(2)} / ${r.nebulaDefenseAway.toFixed(2)}`} />
        <ReportRow label="λ cosmique (xG synth.)" value={`${r.cosmicLambdaHome.toFixed(2)} / ${r.cosmicLambdaAway.toFixed(2)}`} />
        <ReportRow label="Δ Elo orbital" value={`${elo > 0 ? "+" : ""}${elo}`} />
        <ReportRow label="Indice singularity" value={`${r.singularityUpsetIndex}/100`} />
        <ReportRow label="Constellation" value={stars} />
      </div>
    </div>
  );
}

export default function GoldenEyePredictions() {
  const { t } = useLanguage();
  const [matches, setMatches] = useState<MatchWithClubs[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("live_matches")
        .select("*, home_club:clubs!home_club_id(*), away_club:clubs!away_club_id(*)")
        .order("match_date", { ascending: true });
      if (data) setMatches(data as unknown as MatchWithClubs[]);
    })();
  }, []);

  const upcoming = matches.filter((m) => m.status === "upcoming").slice(0, 6);
  const live = matches.filter((m) => m.status === "live" || m.status === "ht");

  return (
    <section
      id="golden-eye"
      className="relative py-20 bg-[var(--background)] border-t border-[#B8860B]/20 scroll-mt-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, #FFD700 0%, transparent 50%), radial-gradient(circle at 80% 70%, #4a90d9 0%, transparent 45%)`,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-2">
              <ScanEye className="w-4 h-4" />
              {t("goldenEye.badge")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--foreground)] flex items-center gap-3 flex-wrap">
              <Sparkles className="w-8 h-8 text-[#FFD700]" />
              {t("goldenEye.title")}
            </h2>
            <p className="text-[var(--muted)] mt-2 max-w-2xl text-sm leading-relaxed">
              {t("goldenEye.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-[#8a8168] uppercase tracking-wider">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[#B8860B]/30">
              <Radar className="w-3 h-3 text-[#FFD700]" /> Poisson orbital
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[#B8860B]/30">
              <Zap className="w-3 h-3 text-[#FFD700]" /> Fusion GoldenEye
            </span>
          </div>
        </div>

        <p className="text-[11px] text-[var(--muted)] border-l-2 border-[#FFD700]/50 pl-3 mb-8 max-w-3xl">
          {t("goldenEye.disclaimer")}
        </p>

        {live.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-black uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-blink" />
              {t("match.live")} — GoldenEye live layer
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {live.map((m) => (
                <OneMatchGoldenBlock key={m.id} m={m} />
              ))}
            </div>
          </div>
        )}

        <h3 className="text-sm font-black uppercase tracking-widest text-[#D4AF37] mb-4">
          {t("goldenEye.upcoming")}
        </h3>
        {upcoming.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">{t("goldenEye.noMatches")}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((m) => (
              <OneMatchGoldenBlock key={m.id} m={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
