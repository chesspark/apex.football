"use client";

import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

export default function BecomeAmbassadorSection() {
  return (
    <section
      id="become-ambassador"
      className="py-20 bg-[var(--surface)]/40 border-y border-[var(--border-clr)] scroll-mt-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25 mb-6">
          <Users className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Rejoindre le réseau</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Devenir ambassadeur Apex
        </h2>
        <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Tu représentes une ville, un pays ou une communauté foot ? World 64 LLC (Delaware) et Apex Football
          recrutent des ambassadeurs pour porter la voix du portail. Candidature 100 % en ligne.
        </p>
        <Link
          href="/apply"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-black uppercase text-sm tracking-wider hover:scale-105 transition-transform"
        >
          Postuler maintenant
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
