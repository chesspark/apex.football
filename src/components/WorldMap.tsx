"use client";

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useLanguage } from "@/context/LanguageContext";
import type { LiveMatch, Club } from "@/lib/types";
import { supabase } from "@/lib/supabase";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MatchWithClubs extends LiveMatch {
  home_club: Club;
  away_club: Club;
}

export default function WorldMap() {
  const { t } = useLanguage();
  const [matches, setMatches] = useState<MatchWithClubs[]>([]);
  const [hoveredMatch, setHoveredMatch] = useState<MatchWithClubs | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchMatches() {
      const { data } = await supabase
        .from("live_matches")
        .select("*, home_club:clubs!home_club_id(*), away_club:clubs!away_club_id(*)")
        .order("status");
      if (data) setMatches(data as unknown as MatchWithClubs[]);
    }
    fetchMatches();
  }, []);

  const liveMatches = matches.filter((m) => m.status === "live" || m.status === "ht");

  return (
    <section className="relative py-16 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">{t("nav.live")}</span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">MATCH MAP</h2>
          <p className="text-[var(--muted)] mt-2">{liveMatches.length} live {liveMatches.length === 1 ? "match" : "matches"} right now</p>
        </div>

        <div className="relative bg-[var(--surface)] border border-[var(--border-clr)] rounded-2xl overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-1, 53], scale: 2800 }}
            style={{ width: "100%", height: "auto" }}
            width={800}
            height={500}
          >
            <ZoomableGroup>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1a1a2e"
                      stroke="#2a2a3e"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#252540", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {matches.map((match) => {
                if (!match.stadium_lat || !match.stadium_lng) return null;
                const isLive = match.status === "live" || match.status === "ht";
                const isFt = match.status === "ft";
                return (
                  <Marker
                    key={match.id}
                    coordinates={[match.stadium_lng, match.stadium_lat]}
                    onMouseEnter={(e) => { setHoveredMatch(match); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                    onMouseLeave={() => setHoveredMatch(null)}
                  >
                    {isLive && (
                      <circle r={8} fill="#FFD700" opacity={0.2}>
                        <animate attributeName="r" from="6" to="16" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      r={isLive ? 5 : 3}
                      fill={isLive ? "#FFD700" : isFt ? "#6b7280" : "#A8D8A8"}
                      stroke={isLive ? "#FFD700" : isFt ? "#6b7280" : "#A8D8A8"}
                      strokeWidth={1}
                      opacity={isLive ? 1 : 0.7}
                      style={{ cursor: "pointer" }}
                    />
                    {isLive && (
                      <circle r={5} fill="#FFD700" opacity={0.5}>
                        <animate attributeName="r" from="5" to="10" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-xs text-[var(--muted)]">Live</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[var(--accent-green)] rounded-full" />
              <span className="text-xs text-[var(--muted)]">Upcoming</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-zinc-500 rounded-full" />
              <span className="text-xs text-[var(--muted)]">FT</span>
            </div>
          </div>
        </div>

        {liveMatches.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {liveMatches.map((match) => (
              <div key={match.id} className="bg-[var(--surface)] border border-[var(--accent)]/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: match.home_club?.primary_color + "30", color: match.home_club?.primary_color }}>{match.home_club?.code}</div>
                  <div className="text-center">
                    <span className="text-xl font-black text-[var(--foreground)]">{match.home_score} - {match.away_score}</span>
                    <div className="flex items-center gap-1 justify-center">
                      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-[var(--accent)]">{match.minute}&apos;</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: match.away_club?.primary_color + "30", color: match.away_club?.primary_color }}>{match.away_club?.code}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[var(--muted)]">{match.stadium}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {hoveredMatch && (
        <div className="fixed z-50 bg-[var(--background)] border border-[var(--border-clr)] rounded-xl px-4 py-3 shadow-2xl pointer-events-none" style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 40 }}>
          <div className="text-xs text-[var(--muted)] mb-1">{hoveredMatch.stadium}</div>
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
            <span>{hoveredMatch.home_club?.short_name}</span>
            <span className="text-[var(--accent)]">{hoveredMatch.home_score} - {hoveredMatch.away_score}</span>
            <span>{hoveredMatch.away_club?.short_name}</span>
          </div>
          {(hoveredMatch.status === "live" || hoveredMatch.status === "ht") && (
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-[var(--accent)]">{hoveredMatch.minute}&apos;</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
