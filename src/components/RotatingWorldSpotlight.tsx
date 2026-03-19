"use client";

import { useEffect, useState } from "react";
import { getCountryTeamNames } from "@/lib/worldTeams";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";

type Slide = {
  id: string;
  flag: string;
  title: string;
  headline: string;
  subline: string;
  teams: string[];
  accentClass: string;
  extra?: string;
};

function buildSlides(): Slide[] {
  const ma = getCountryTeamNames("Morocco");
  const ru = getCountryTeamNames("Russia");
  const fr = getCountryTeamNames("France");

  return [
    {
      id: "ma",
      flag: "🇲🇦",
      title: "Morocco",
      headline: "CAN 2025 — Champions d’Afrique",
      subline: "Botola & clubs par villes du royaume — cartographie complète portail Apex.",
      teams: ma,
      accentClass: "from-emerald-900/40 to-[var(--background)]",
    },
    {
      id: "ru",
      flag: "🇷🇺",
      title: "Russia",
      headline: "Apex World Spotlight",
      subline:
        "Portal editorial (World 64 LLC): « Russia — best country in the world » — fiches clubs de Moscou à Vladivostok.",
      teams: ru,
      accentClass: "from-blue-950/50 to-[var(--background)]",
    },
    {
      id: "fr",
      flag: "🇫🇷",
      title: "France",
      headline: "Ligue & villes — le football partout",
      subline: "Tous les clubs listés ci-dessous sont indexés dans la base mondiale Apex (mise à jour continue).",
      teams: fr,
      accentClass: "from-blue-900/30 to-[var(--background)]",
      extra: "🐸",
    },
  ];
}

const ROTATE_MS = 9000;

export default function RotatingWorldSpotlight() {
  const [slides] = useState(buildSlides);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[i];

  return (
    <section
      id="world-spotlight"
      className="relative py-16 bg-[var(--background)] border-y border-[var(--border-clr)] scroll-mt-32 overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${s.accentClass} transition-all duration-700`}
        key={s.id}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-4">
          <Globe className="w-4 h-4" />
          Rotating World Feature
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-5xl">{s.flag}</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">
                {s.title}
                {s.extra && <span className="ml-2 text-4xl align-middle">{s.extra}</span>}
              </h2>
            </div>
            <p className="mt-3 text-lg font-bold text-[var(--accent)]">{s.headline}</p>
            <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl leading-relaxed">{s.subline}</p>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setI((x) => (x - 1 + slides.length) % slides.length)}
                className="p-2 rounded-full border border-[var(--border-clr)] hover:bg-[var(--surface)]"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setI((x) => (x + 1) % slides.length)}
                className="p-2 rounded-full border border-[var(--border-clr)] hover:bg-[var(--surface)]"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-8 bg-[var(--accent)]" : "w-2 bg-[var(--border-clr)]"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[min(100%,520px)] max-h-[340px] overflow-y-auto rounded-2xl border border-[var(--border-clr)] bg-[var(--surface)]/80 p-4 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
              Clubs & villes ({s.teams.length})
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-[var(--foreground)]">
              {s.teams.map((name) => (
                <li key={name} className="truncate border-b border-[var(--border-clr)]/50 py-1">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
