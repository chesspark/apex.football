"use client";

import Link from "next/link";
import { ExternalLink, MapPin, Trophy } from "lucide-react";

const RAJA_LINKS = [
  { label: "Site officiel", href: "https://www.rajacasablanca.com", desc: "Actualités, calendrier, effectif" },
  { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Raja_CA", desc: "Histoire et palmarès" },
  { label: "Transfermarkt", href: "https://www.transfermarkt.com/raja-casablanca/startseite/verein/3475", desc: "Effectif et transferts" },
  { label: "Soccerway", href: "https://int.soccerway.com/teams/morocco/raja-casablanca/3475/", desc: "Résultats et calendrier" },
  { label: "Flashscore", href: "https://www.flashscore.com/team/raja-casablanca/3475/", desc: "Scores en direct" },
];

export default function RajaFeaturedSection() {
  return (
    <section className="py-16 bg-[var(--surface)]/50 border-y border-[var(--border-clr)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
              🇲🇦 Club de Casablanca
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">
              Raja Club Athletic
            </h2>
            <p className="mt-3 text-[var(--muted)] max-w-xl">
              L&apos;un des plus grands clubs d&apos;Afrique. 3 Ligue des champions CAF, 12 Botola Pro.
              Stade Mohammed V, Casablanca. Fondé en 1949.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#008000]/20 text-[#008000] rounded-lg text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                Casablanca
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg text-xs font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                Botola Pro 2023-24
              </span>
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-4">
              Infos & actualités 2025-2026
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RAJA_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-[var(--background)] border border-[var(--border-clr)] rounded-xl hover:border-[var(--accent)]/40 transition-all group"
                >
                  <ExternalLink className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {link.label}
                    </span>
                    <p className="text-[10px] text-[var(--muted)] mt-0.5">{link.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/#teams"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Voir toutes les équipes marocaines
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
