"use client";

import { useLanguage } from "@/context/LanguageContext";
import { tournaments } from "@/lib/data";
import type { Tournament } from "@/lib/data";
import { MapPin, Users, Calendar } from "lucide-react";

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const { locale, t } = useLanguage();

  const name =
    locale === "ar" ? tournament.nameAr : locale === "fr" ? tournament.nameFr : tournament.name;
  const stage =
    locale === "ar" ? tournament.stageAr : locale === "fr" ? tournament.stageFr : tournament.stage;

  const statusColor =
    tournament.status === "ongoing"
      ? "bg-[var(--accent-green)]/20 text-[var(--accent-green)] border-[var(--accent-green)]/30"
      : "bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)]/30";

  const statusText =
    tournament.status === "ongoing" ? t("tournament.ongoing") : t("tournament.upcoming");

  return (
    <div className="group relative bg-[var(--surface)] border border-[var(--border-clr)] rounded-2xl p-6 hover:border-[var(--accent)]/20 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{tournament.logo}</div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${statusColor}`}>
          {tournament.status === "ongoing" && (
            <span className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full animate-pulse" />
          )}
          {statusText}
        </span>
      </div>

      <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-1">
        {name}
      </h3>
      <p className="text-sm text-[var(--accent)]/80 font-semibold mb-4">{stage}</p>

      <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{tournament.country}</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tournament.teams} teams</span>
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{tournament.continent}</span>
      </div>
    </div>
  );
}

export default function TournamentsSection() {
  const { t } = useLanguage();

  const ongoing = tournaments.filter((t) => t.status === "ongoing");
  const upcoming = tournaments.filter((t) => t.status === "upcoming");

  return (
    <section id="tournaments" className="relative py-24 bg-[var(--background)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">{t("section.tournaments")}</span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">{t("section.tournaments")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ongoing.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>

        {upcoming.length > 0 && (
          <>
            <div className="mt-16 mb-8">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--muted)]">{t("tournament.upcoming")}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
