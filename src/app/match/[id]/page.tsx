import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, MapPin, Calendar, Clock, ExternalLink, Building2, Info } from "lucide-react";
import { teamDetails } from "@/lib/teamDetails";
import * as GoldenEye from "@/lib/goldenEyePredictions";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from("live_matches")
    .select("*, home_club:clubs!home_club_id(*), away_club:clubs!away_club_id(*)")
    .eq("id", parseInt(id, 10))
    .single();
  if (!data) return { title: "Match | Apex Football" };
  const m = data as { home_club?: { short_name: string }; away_club?: { short_name: string } };
  return {
    title: `${m.home_club?.short_name || "Home"} vs ${m.away_club?.short_name || "Away"} | Apex Football`,
    description: `Détails du match, lieu, horaire et analyse GoldenEye® — ${m.home_club?.short_name} vs ${m.away_club?.short_name}.`,
  };
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: match } = await supabase
    .from("live_matches")
    .select("*, home_club:clubs!home_club_id(*), away_club:clubs!away_club_id(*)")
    .eq("id", parseInt(id, 10))
    .single();

  if (!match) notFound();

  const m = match as Database["public"]["Tables"]["live_matches"]["Row"] & {
    home_club?: Database["public"]["Tables"]["clubs"]["Row"];
    away_club?: Database["public"]["Tables"]["clubs"]["Row"];
  };
  const isLive = m.status === "live" || m.status === "ht";
  const isFt = m.status === "ft";
  const matchDate = m.match_date ? new Date(m.match_date) : null;

  const homeClub = m.home_club as Database["public"]["Tables"]["clubs"]["Row"] | undefined;
  const awayClub = m.away_club as Database["public"]["Tables"]["clubs"]["Row"] | undefined;
  const homeName = homeClub?.name || "";
  const awayName = awayClub?.name || "";
  const detH = teamDetails[homeName];
  const detA = teamDetails[awayName];

  const ge = GoldenEye.goldenEyeFullAnalysis({
    matchId: m.id,
    homeCode: homeClub?.code || "H",
    awayCode: awayClub?.code || "A",
    tournament: m.tournament,
  });
  const eloDelta = GoldenEye.computeApexOrbitalEloDelta(
    homeClub?.code || "H",
    awayClub?.code || "A",
    m.id
  );

  const statusLabel =
    m.status === "upcoming"
      ? "À venir"
      : m.status === "ft"
        ? "Terminé"
        : m.status === "ht"
          ? "Mi-temps"
          : "En direct";

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#results"
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour aux résultats</span>
          </Link>

          <div className="bg-[var(--surface)] border border-[var(--border-clr)] rounded-2xl overflow-hidden">
            <div className={`px-6 py-4 ${isLive ? "bg-red-500/10 border-b border-red-500/20" : "border-b border-[var(--border-clr)]"}`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                  {m.tournament}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border-clr)] text-[var(--foreground)]">
                  {statusLabel}
                  {isLive && m.minute != null ? ` · ${m.minute}'` : ""}
                </span>
              </div>
              {isLive && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-blink" />
                  <span className="text-sm font-bold text-red-500">LIVE {m.minute}&apos;</span>
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 text-center">
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-lg font-black mb-3"
                    style={{
                      backgroundColor: `${homeClub?.primary_color || "#666"}25`,
                      color: homeClub?.primary_color || "#666",
                    }}
                  >
                    {homeClub?.code}
                  </div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">{homeClub?.short_name || "Home"}</h2>
                  {homeClub?.city && (
                    <p className="text-xs text-[var(--muted)] mt-1">{homeClub.city}, {homeClub.country}</p>
                  )}
                </div>

                <div className="text-center px-6">
                  {m.status === "upcoming" ? (
                    <span className="text-2xl font-bold text-[var(--muted)]">vs</span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className={`text-4xl font-black ${isLive ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                        {m.home_score}
                      </span>
                      <span className="text-[var(--muted)]">-</span>
                      <span className={`text-4xl font-black ${isLive ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                        {m.away_score}
                      </span>
                    </div>
                  )}
                  {isFt && <p className="text-xs text-[var(--muted)] mt-1">Full Time</p>}
                </div>

                <div className="flex-1 text-center">
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-lg font-black mb-3"
                    style={{
                      backgroundColor: `${awayClub?.primary_color || "#666"}25`,
                      color: awayClub?.primary_color || "#666",
                    }}
                  >
                    {awayClub?.code}
                  </div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">{awayClub?.short_name || "Away"}</h2>
                  {awayClub?.city && (
                    <p className="text-xs text-[var(--muted)] mt-1">{awayClub.city}, {awayClub.country}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border-clr)] space-y-3">
                {(m.stadium || homeClub?.stadium) && (
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>{m.stadium || homeClub?.stadium}</span>
                  </div>
                )}
                {matchDate && (
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>
                      {matchDate.toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {matchDate && (
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Clock className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>{matchDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                )}
              </div>

              {(detH || detA) && (
                <div className="mt-8 pt-6 border-t border-[var(--border-clr)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Fiches clubs enrichies
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { det: detH, label: homeClub?.short_name },
                      { det: detA, label: awayClub?.short_name },
                    ]
                      .filter((x) => x.det)
                      .map(({ det, label }, i) => (
                        <div key={i} className="rounded-xl border border-[var(--border-clr)] p-4 bg-[var(--background)]/50">
                          <p className="font-bold text-[var(--foreground)] mb-2">{label}</p>
                          {det!.city && <p className="text-xs text-[var(--muted)]">Ville : {det!.city}</p>}
                          {det!.founded && <p className="text-xs text-[var(--muted)]">Fondé : {det!.founded}</p>}
                          {det!.description && (
                            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed flex gap-1">
                              <Info className="w-3 h-3 shrink-0 mt-0.5" />
                              {det!.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {det!.website && (
                              <a
                                href={det!.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[var(--accent)] hover:underline"
                              >
                                Site <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {det!.wikipedia && (
                              <a
                                href={det!.wikipedia}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[var(--accent)] hover:underline"
                              >
                                Wikipedia <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* GoldenEye® — import namespace complet des modules IA */}
          <div className="mt-10 rounded-2xl border border-[#B8860B]/40 bg-gradient-to-br from-[#0d0d0f] via-[#121018] to-[#0a0a0c] p-6 shadow-[0_0_48px_rgba(255,215,0,0.08)]">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/90 mb-1">GoldenEye® · Analyse fusion</p>
            <h3 className="text-lg font-black text-[#FFF8DC] mb-4">Pronostic IA (mode espace)</h3>
            <p className="text-[10px] text-[#8a8168] mb-6 leading-relaxed">
              Toutes les fonctions du module sont chargées via <code className="text-[#FFD700]">import * as GoldenEye</code> — orbite,
              nébuleuse, Poisson, constellation, singularité. Indicatif uniquement.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center mb-6">
              <div className="rounded-lg bg-black/50 border border-[#B8860B]/25 py-3">
                <div className="text-2xl font-black text-[#FFD700]">{Math.round(ge.probHomeWin * 100)}%</div>
                <div className="text-[8px] text-[#8a8168] uppercase">1</div>
              </div>
              <div className="rounded-lg bg-black/50 border border-[#B8860B]/25 py-3">
                <div className="text-2xl font-black text-[#E8DCC4]">{Math.round(ge.probDraw * 100)}%</div>
                <div className="text-[8px] text-[#8a8168] uppercase">X</div>
              </div>
              <div className="rounded-lg bg-black/50 border border-[#B8860B]/25 py-3">
                <div className="text-2xl font-black text-[#FFD700]">{Math.round(ge.probAwayWin * 100)}%</div>
                <div className="text-[8px] text-[#8a8168] uppercase">2</div>
              </div>
            </div>
            <dl className="space-y-2 text-[11px]">
              <div className="flex justify-between border-b border-[#B8860B]/10 pb-2">
                <dt className="text-[#8a8168] uppercase">Verdict Apex</dt>
                <dd className="font-mono text-[#FFD700]">
                  {ge.apexGoldenVerdict} ({ge.verdictConfidencePct}%)
                </dd>
              </div>
              <div className="flex justify-between border-b border-[#B8860B]/10 pb-2">
                <dt className="text-[#8a8168] uppercase">Score probable</dt>
                <dd className="font-mono text-[#FFD700]">
                  {ge.mostLikelyScore} ({(ge.mostLikelyScoreProb * 100).toFixed(1)}%)
                </dd>
              </div>
              <div className="flex justify-between border-b border-[#B8860B]/10 pb-2">
                <dt className="text-[#8a8168] uppercase">λ cosmique H / A</dt>
                <dd className="font-mono text-[#E8DCC4]">
                  {ge.cosmicLambdaHome.toFixed(2)} / {ge.cosmicLambdaAway.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between border-b border-[#B8860B]/10 pb-2">
                <dt className="text-[#8a8168] uppercase">Δ Elo orbital</dt>
                <dd className="font-mono text-[#E8DCC4]">
                  {eloDelta > 0 ? "+" : ""}
                  {eloDelta}
                </dd>
              </div>
              <div className="flex justify-between border-b border-[#B8860B]/10 pb-2">
                <dt className="text-[#8a8168] uppercase">Indice singularité</dt>
                <dd className="font-mono text-[#E8DCC4]">{ge.singularityUpsetIndex}/100</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8a8168] uppercase">Confiance constellation</dt>
                <dd className="text-[#FFD700]">{"★".repeat(ge.confidenceTier)}{"☆".repeat(5 - ge.confidenceTier)}</dd>
              </div>
            </dl>
            <p className="text-[9px] text-[#5c5644] mt-6 font-mono">
              API surface: {Object.keys(GoldenEye.goldenEyeExports).length} fonctions exportées (goldenEyeExports).
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#live"
              className="text-sm font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
            >
              Carte live mondiale →
            </Link>
            <Link
              href="/#golden-eye"
              className="text-sm font-semibold text-[#D4AF37] hover:underline inline-flex items-center gap-1"
            >
              Suite GoldenEye complète →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
