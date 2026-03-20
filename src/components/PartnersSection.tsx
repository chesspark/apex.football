"use client";

import { Handshake, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PARTNERS = [
  {
    name: "Seminaire",
    href: "https://seminaire.com/",
    descriptionKey: "partners.seminaireDesc" as const,
  },
];

export default function PartnersSection() {
  const { t } = useLanguage();

  return (
    <section
      id="partners"
      className="relative py-16 sm:py-20 border-t border-[var(--border-clr)] bg-gradient-to-b from-[var(--background)] to-[var(--surface)]/20"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25 mb-4">
              <Handshake className="w-4 h-4 text-[#D4AF37]" aria-hidden />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em]">
                {t("section.partners")}
              </span>
            </div>
            <h2
              id="partners-heading"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--foreground)]"
            >
              {t("section.partnersTitle")}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)] max-w-xl leading-relaxed">
              {t("section.partnersLead")}
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PARTNERS.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-2xl border border-[var(--border-clr)] bg-[var(--background)]/80 p-5 sm:p-6 shadow-sm hover:border-[#D4AF37]/40 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.12)] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-lg font-black text-[var(--foreground)] group-hover:text-[#D4AF37] transition-colors">
                      {p.name}
                    </span>
                    <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                      {t(p.descriptionKey)}
                    </p>
                  </div>
                  <ExternalLink
                    className="w-5 h-5 shrink-0 text-[var(--muted)] group-hover:text-[#D4AF37] transition-colors"
                    aria-hidden
                  />
                </div>
                <span className="mt-4 text-[10px] font-mono text-[var(--muted)]/80 truncate">
                  {p.href.replace(/^https?:\/\//, "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
