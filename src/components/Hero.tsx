"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Play } from "lucide-react";
import { APEX_MOTTO } from "@/lib/brand";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-20 flex items-center justify-center overflow-hidden bg-[var(--background)] pt-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--surface)]/30 to-[var(--background)]" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[var(--accent)]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[var(--accent-green)]/6 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          href="/#live"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6 hover:border-[var(--accent)]/40 transition-colors"
          title={APEX_MOTTO}
        >
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-blink" />
          <span className="text-[var(--accent)] text-xs font-semibold tracking-wider uppercase">
            Live Now — 12 Matches
          </span>
        </Link>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-[var(--foreground)] leading-tight">
          {t("hero.title")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[var(--accent-green)] to-[var(--accent)]">
            {t("hero.subtitle")}
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[var(--muted)] max-w-xl mx-auto">
          {t("hero.description")}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#players"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-black font-bold uppercase tracking-wider text-xs rounded-full hover:scale-105 transition-all duration-300"
          >
            {t("hero.cta")}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#results"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[var(--foreground)] font-bold uppercase tracking-wider text-xs rounded-full border border-[var(--border-clr)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-300"
          >
            <Play className="w-3.5 h-3.5" />
            {t("hero.cta2")}
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { value: "12+", label: t("stats.worldwide") },
            { value: "500+", label: t("stats.players") },
            { value: "1.2K", label: t("stats.matches") },
            { value: "180+", label: t("stats.countries") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-[var(--accent)]">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-[var(--muted)] uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
