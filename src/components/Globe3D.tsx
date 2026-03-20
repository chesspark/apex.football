"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { supabase } from "@/lib/supabase";
import type { LiveMatch, Club } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

type MatchWithClubs = LiveMatch & { home_club: Club; away_club: Club };

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  const { t } = useLanguage();
  const [matches, setMatches] = useState<MatchWithClubs[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchWithClubs | null>(null);

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

  const liveMatches = matches.filter((m) => m.status === "live" || m.status === "ht");
  const allWithCoords = matches.filter((m) => m.stadium_lat && m.stadium_lng);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const markers = allWithCoords.map((m) => {
      const isLive = m.status === "live" || m.status === "ht";
      return {
        location: [m.stadium_lat!, m.stadium_lng!] as [number, number],
        size: isLive ? 0.12 : 0.05,
      };
    });

    let width = canvas.offsetWidth || 300;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 300;
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    if (width < 10) return;

    let globe: { destroy: () => void };
    try {
      globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 36000,
      mapBrightness: 2,
      baseColor: [0.15, 0.18, 0.12],
      markerColor: [1, 0.84, 0],
      glowColor: [0.41, 0.53, 0.41],
      markers,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.003;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    } catch {
      return () => window.removeEventListener("resize", onResize);
    }

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [allWithCoords]);

  return (
    <section id="live" className="relative py-16 bg-[var(--background)] overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
            {t("nav.live")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">
            LIVE AROUND THE WORLD
          </h2>
          <p className="text-[var(--muted)] mt-2">
            {liveMatches.length} live {liveMatches.length === 1 ? "match" : "matches"} right now
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Globe */}
          <div className="relative w-full max-w-[500px] aspect-square flex-shrink-0">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                canvasRef.current.style.cursor = "grabbing";
              }}
              onPointerUp={() => {
                pointerInteracting.current = null;
                canvasRef.current.style.cursor = "grab";
              }}
              onPointerOut={() => {
                pointerInteracting.current = null;
                canvasRef.current.style.cursor = "grab";
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta / 200;
                }
              }}
              onTouchMove={(e) => {
                if (pointerInteracting.current !== null && e.touches[0]) {
                  const delta = e.touches[0].clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta / 200;
                }
              }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse" />
                <span className="text-xs text-white/70">Live</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full opacity-50" />
                <span className="text-xs text-white/70">Scheduled</span>
              </div>
            </div>
          </div>

          {/* Live matches panel */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-blink" />
              <h3 className="text-lg font-bold uppercase tracking-wider text-red-400">
                {t("match.live")} — {liveMatches.length} {liveMatches.length === 1 ? "match" : "matches"}
              </h3>
            </div>

            {liveMatches.length === 0 ? (
              <p className="text-[var(--muted)] text-sm">No live matches at the moment.</p>
            ) : (
              <div className="space-y-3">
                {liveMatches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(selectedMatch?.id === match.id ? null : match)}
                    className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      selectedMatch?.id === match.id
                        ? "bg-red-500/10 border-red-500/30 scale-[1.02]"
                        : "bg-[var(--surface)] border-red-500/10 hover:border-red-500/30"
                    }`}
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-blink" />
                      <span className="text-[10px] font-bold text-red-400 uppercase">
                        {match.minute}&apos;
                      </span>
                    </div>

                    <div className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-semibold mb-3">
                      {match.tournament}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black"
                          style={{
                            backgroundColor: match.home_club?.primary_color + "25",
                            color: match.home_club?.primary_color,
                          }}
                        >
                          {match.home_club?.code}
                        </div>
                        <span className="text-sm font-bold text-[var(--foreground)] truncate">
                          {match.home_club?.short_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-lg">
                        <span className="text-2xl font-black text-[var(--accent)]">
                          {match.home_score}
                        </span>
                        <span className="text-[var(--muted)] font-bold">-</span>
                        <span className="text-2xl font-black text-[var(--accent)]">
                          {match.away_score}
                        </span>
                      </div>

                      <div className="flex-1 flex items-center gap-2 justify-end">
                        <span className="text-sm font-bold text-[var(--foreground)] truncate text-right">
                          {match.away_club?.short_name}
                        </span>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black"
                          style={{
                            backgroundColor: match.away_club?.primary_color + "25",
                            color: match.away_club?.primary_color,
                          }}
                        >
                          {match.away_club?.code}
                        </div>
                      </div>
                    </div>

                    {match.stadium && (
                      <div className="text-[10px] text-[var(--muted)] text-center mt-2">
                        {match.stadium}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upcoming matches under live */}
            {matches.filter((m) => m.status === "upcoming").length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                  {t("tournament.upcoming")}
                </h4>
                <div className="space-y-2">
                  {matches
                    .filter((m) => m.status === "upcoming")
                    .slice(0, 4)
                    .map((match) => (
                      <div
                        key={match.id}
                        className="flex items-center justify-between p-3 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl"
                      >
                        <span className="text-xs font-bold text-[var(--foreground)]">
                          {match.home_club?.code}
                        </span>
                        <span className="text-xs text-[var(--accent)] font-bold">vs</span>
                        <span className="text-xs font-bold text-[var(--foreground)]">
                          {match.away_club?.code}
                        </span>
                        <span className="text-[10px] text-[var(--muted)]">{match.tournament}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
