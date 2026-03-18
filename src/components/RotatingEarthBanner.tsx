"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getTotalTeams, getTotalCountries } from "@/lib/worldTeams";

export default function RotatingEarthBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden bg-[var(--background)]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/[0.03] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Globe */}
        <div className="relative flex-shrink-0">
          <div className="globe" />
          {/* Orbit rings */}
          <div className="absolute inset-[-20px] border border-[var(--accent)]/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-[-40px] border border-[var(--accent-green)]/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          {/* Glow */}
          <div className="absolute inset-[-60px] bg-[var(--accent)]/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
            {t("section.worldwide") || "Worldwide Coverage"}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[var(--foreground)] mt-3 leading-tight">
            Every Team.<br />
            <span className="text-[var(--accent)]">Every Nation.</span>
          </h2>
          <p className="mt-4 text-[var(--muted)] text-lg max-w-lg">
            From the streets of São Paulo to the stadiums of Manchester — Apex Football covers every professional club across the globe.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start">
            <div className="text-center">
              <div className="text-3xl font-black text-[var(--accent)]">{getTotalCountries()}+</div>
              <div className="text-xs text-[var(--muted)] uppercase tracking-wider">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-[var(--accent-green)]">{getTotalTeams()}+</div>
              <div className="text-xs text-[var(--muted)] uppercase tracking-wider">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-[var(--foreground)]">6</div>
              <div className="text-xs text-[var(--muted)] uppercase tracking-wider">Continents</div>
            </div>
          </div>

          <a
            href="#teams"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-[var(--accent)] text-black font-bold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-transform"
          >
            Explore All Teams
          </a>
        </div>
      </div>
    </section>
  );
}
