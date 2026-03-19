"use client";

import Link from "next/link";
import { getTotalTeams, getTotalCountries } from "@/lib/worldTeams";

export default function RotatingEarthBanner() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden bg-[var(--background)]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/[0.02] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Globe - smaller */}
        <div className="relative flex-shrink-0">
          <div className="globe w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]" />
          <div className="absolute inset-[-12px] border border-[var(--accent)]/15 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-[-24px] border border-[var(--accent-green)]/8 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
        </div>

        {/* Content - compact promise */}
        <div className="text-center lg:text-left flex-1">
          <span className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest">
            The Promise of Apex Football
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2 leading-tight">
            Every Team.
            <br />
            <span className="text-[var(--accent)]">Every Player.</span>
            <br />
            <span className="text-[var(--accent-green)]">Everywhere!</span>
          </h2>
          <p className="mt-3 text-[var(--muted)] text-sm sm:text-base max-w-md">
            From the streets of São Paulo to the stadiums of Manchester — Apex Football covers every professional club and player across the globe.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
            <div className="text-center">
              <div className="text-2xl font-black text-[var(--accent)]">{getTotalCountries()}+</div>
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-[var(--accent-green)]">{getTotalTeams()}+</div>
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-[var(--foreground)]">6</div>
              <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Continents</div>
            </div>
          </div>

          <Link
            href="/#teams"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-[var(--accent)] text-black font-bold uppercase tracking-wider text-xs rounded-full hover:scale-105 transition-transform"
          >
            Explore All Teams
          </Link>
        </div>
      </div>
    </section>
  );
}
