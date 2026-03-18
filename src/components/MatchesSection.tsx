"use client";

import { useLanguage } from "@/context/LanguageContext";
import { matches } from "@/lib/data";
import type { Match } from "@/lib/data";

function MatchCard({ match }: { match: Match }) {
  const { t } = useLanguage();

  const isLive = match.status === "live";
  const isHt = match.status === "ht";
  const isFt = match.status === "ft";

  const statusDisplay = isLive
    ? `${t("match.live")} ${match.minute}'`
    : isHt
    ? t("match.ht")
    : isFt
    ? t("match.ft")
    : match.date;

  const statusColor = isLive
    ? "text-red-400"
    : isHt
    ? "text-amber-400"
    : isFt
    ? "text-zinc-500"
    : "text-zinc-600";

  return (
    <div className={`relative bg-zinc-900/50 border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${
      isLive ? "border-red-500/20 hover:border-red-500/40" : "border-white/5 hover:border-white/10"
    }`}>
      {/* Live pulse */}
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-red-400 uppercase">{t("match.live")}</span>
        </div>
      )}

      <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold mb-4">
        {match.tournament}
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Home */}
        <div className="flex-1 text-center">
          <div className="text-3xl mb-2">{match.homeLogo}</div>
          <div className="text-sm font-bold text-white truncate">{match.homeTeam}</div>
        </div>

        {/* Score */}
        <div className="text-center px-4">
          {match.status === "upcoming" ? (
            <div className="text-lg font-bold text-zinc-600">vs</div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-white">{match.homeScore}</span>
              <span className="text-lg text-zinc-600">-</span>
              <span className="text-3xl font-black text-white">{match.awayScore}</span>
            </div>
          )}
          <div className={`text-xs font-bold mt-1 ${statusColor}`}>
            {statusDisplay}
          </div>
        </div>

        {/* Away */}
        <div className="flex-1 text-center">
          <div className="text-3xl mb-2">{match.awayLogo}</div>
          <div className="text-sm font-bold text-white truncate">{match.awayTeam}</div>
        </div>
      </div>
    </div>
  );
}

export default function MatchesSection() {
  const { t } = useLanguage();

  const liveMatches = matches.filter((m) => m.status === "live" || m.status === "ht");
  const recentMatches = matches.filter((m) => m.status === "ft");
  const upcomingMatches = matches.filter((m) => m.status === "upcoming");

  return (
    <section id="results" className="relative py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
            {t("section.results")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            {t("section.results")}
          </h2>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <div className="mb-12" id="live">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              <h3 className="text-lg font-bold uppercase tracking-wider text-red-400">
                {t("nav.live")}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Results */}
        {recentMatches.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold uppercase tracking-wider text-zinc-400 mb-6">
              {t("section.results")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingMatches.length > 0 && (
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-zinc-400 mb-6">
              {t("tournament.upcoming")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
