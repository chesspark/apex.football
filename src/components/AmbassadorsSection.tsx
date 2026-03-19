"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, ExternalLink } from "lucide-react";

const AMBASSADORS = [
  { name: "Mohamed", delay: 0 },
  { name: "Abdellah", delay: 200 },
];

export default function AmbassadorsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[var(--background)] via-[var(--surface)]/30 to-[var(--background)]">
      {/* 2ciel-inspired subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,215,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/20 mb-10 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <Award className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.3em] uppercase">
            Premiers Ambassadeurs
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[var(--foreground)] mb-8">
          <span className="block">1ers Ambassadeurs de la plateforme</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
          {AMBASSADORS.map((amb, i) => (
            <div
              key={amb.name}
              className={`inline-block transition-all duration-700 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${300 + amb.delay}ms`,
              }}
            >
              <span
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] uppercase text-[var(--foreground)]"
                style={{
                  textShadow: "0 0 60px rgba(255,215,0,0.15)",
                  letterSpacing: "0.15em",
                }}
              >
                {amb.name}
              </span>
              {i < AMBASSADORS.length - 1 && (
                <span className="mx-2 text-4xl text-[var(--accent)]/40 font-light">&</span>
              )}
            </div>
          ))}
        </div>

        <p
          className={`text-sm sm:text-base text-[var(--muted)] tracking-widest uppercase mb-10 transition-all duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Directeurs Associés Monde
        </p>
        <p
          className={`text-[var(--accent)] font-medium tracking-wider text-sm sm:text-base mb-12 transition-all duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          Apex Football LLC
          <span className="text-[var(--muted)] font-normal ml-1">(Delaware, USA)</span>
        </p>

        <Link
          href="/morocco"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all duration-500 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <span className="text-sm font-medium tracking-wider uppercase">
            Découvrir l&apos;histoire du Maroc
          </span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
