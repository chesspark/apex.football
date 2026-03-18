"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)] pt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-zinc-900 to-[var(--background)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent-green)]/8 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[150px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-8">
          <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
          <span className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase">
            Live Now — 12 Matches
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[var(--foreground)] leading-[0.85]">
          {t("hero.title")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[var(--accent-green)] to-[var(--accent)]">
            {t("hero.subtitle")}
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          {t("hero.description")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#players"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-all duration-300"
          >
            {t("hero.cta")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#live"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-[var(--foreground)] font-bold uppercase tracking-wider text-sm rounded-full border border-[var(--border-clr)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            {t("hero.cta2")}
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "12+", label: t("stats.worldwide") },
            { value: "500+", label: t("stats.players") },
            { value: "1.2K", label: t("stats.matches") },
            { value: "180+", label: t("stats.countries") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[var(--accent)]">{stat.value}</div>
              <div className="text-xs sm:text-sm text-[var(--muted)] uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
