"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Player } from "@/lib/data";
import { TrendingUp } from "lucide-react";

export default function PlayerCard({ player }: { player: Player }) {
  const { t, locale } = useLanguage();
  const name = locale === "ar" ? player.nameAr : player.name;

  return (
    <div className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1">
      {/* Player image placeholder */}
      <div className="relative h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
            ⚽
          </span>
        </div>
        {/* Player number */}
        <div className="absolute top-4 right-4 z-20 text-6xl font-black text-white/5 group-hover:text-emerald-500/10 transition-colors">
          {player.number}
        </div>
        {/* Trending badge */}
        {player.trending && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">TRENDING</span>
          </div>
        )}
        {/* Nationality */}
        <div className="absolute bottom-4 left-4 z-20 text-2xl">{player.nationality}</div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-zinc-500">
              {player.teamLogo} {player.team}
            </p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-lg">
            <span className="text-sm font-bold text-emerald-400">{player.rating}</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-2 bg-white/[0.02] rounded-lg">
            <div className="text-xl font-black text-white">{player.goals}</div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">{t("player.goals")}</div>
          </div>
          <div className="text-center p-2 bg-white/[0.02] rounded-lg">
            <div className="text-xl font-black text-white">{player.assists}</div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">{t("player.assists")}</div>
          </div>
          <div className="text-center p-2 bg-white/[0.02] rounded-lg">
            <div className="text-xl font-black text-white">{player.matches}</div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">{t("player.matches")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
