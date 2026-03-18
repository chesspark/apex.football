"use client";

import { useLanguage } from "@/context/LanguageContext";
import { players } from "@/lib/data";
import PlayerCard from "./PlayerCard";

export default function PlayersSection() {
  const { t } = useLanguage();

  return (
    <section id="players" className="relative py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
              {t("section.topPerformers")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              {t("section.trending")}
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-emerald-400 uppercase tracking-wider transition-colors"
          >
            View All →
          </a>
        </div>

        {/* Player cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </section>
  );
}
