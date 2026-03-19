import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "CGV — Conditions Générales | World 64 LLC",
  description: "Conditions générales de vente et d'utilisation — World 64 LLC, Delaware.",
};

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Conditions Générales (CGV / CGU)
        </h1>
        <p className="text-sm text-[var(--muted)] mt-2">
          Société : <strong className="text-[var(--foreground)]">World 64 LLC</strong> — État du{" "}
          <strong>Delaware</strong>, États-Unis.
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">
          Propriétaire / représentant désigné : <strong className="text-[var(--foreground)]">Aldric Laure</strong>.
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">
          Portail associé : <strong className="text-[var(--foreground)]">Apex Football</strong> (contenu informatif
          et communautaire).
        </p>

        <div className="mt-10 space-y-8 text-sm text-[var(--muted)] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">1. Objet</h2>
            <p>
              Les présentes conditions régissent l&apos;accès aux services numériques, contenus, et formulaires
              proposés via le portail. Elles complètent toute stipulation spécifique signée entre les parties.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">2. Services</h2>
            <p>
              Les informations (scores, pronostics indicatifs, fiches clubs) sont fournies « en l&apos;état ».
              World 64 LLC ne garantit pas l&apos;exhaustivité ni l&apos;absence d&apos;erreur. Les fonctionnalités
              « IA » / Pro Chat peuvent s&apos;appuyer sur des modèles tiers soumis à leurs propres conditions.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">3. Propriété intellectuelle</h2>
            <p>
              Marques, logos, textes et code du portail sont protégés. Toute reproduction non autorisée est
              interdite.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">4. Données personnelles</h2>
            <p>
              Les données collectées via les formulaires (ex. candidature ambassadeur) sont traitées pour la gestion
              des demandes. Droits d&apos;accès et de rectification : contact via les coordonnées fournies par la
              société.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">5. Droit applicable</h2>
            <p>
              Pour les litiges relevant de la compétence des tribunaux des États-Unis, le droit de l&apos;État du
              Delaware prévaut, sous réserve des règles impératives applicables au consommateur dans son pays de
              résidence.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">6. Contact</h2>
            <p>
              World 64 LLC — Delaware, USA. Représentant : Aldric Laure. Pour toute question juridique ou
              commerciale, utilisez le canal officiel communiqué par la société.
            </p>
          </section>
        </div>

        <p className="mt-12 text-xs text-[var(--muted)]">
          Document type à adapter par votre conseil juridique. Dernière mise à jour : mars 2026.
        </p>
      </div>
      <Footer />
    </main>
  );
}
