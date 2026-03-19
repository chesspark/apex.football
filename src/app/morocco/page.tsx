import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, TrendingUp, Building2, Train, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Maroc sous Mohammed VI — Apex Football",
  description:
    "L'histoire du Maroc depuis l'avènement du Roi Mohammed VI en 1999 : développement économique, infrastructures, réformes et progrès du pays.",
};

export default function MoroccoPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour à l&apos;accueil</span>
          </Link>

          <header className="mb-16">
            <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
              Histoire & Développement
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">
              Le Maroc sous le règne de
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-green)]">
                Mohammed VI
              </span>
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Depuis 1999, le Royaume du Maroc connaît une transformation profonde. Retour sur les progrès majeurs accomplis.
            </p>
          </header>

          <article className="space-y-16">
            <section>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-[var(--foreground)] mb-6">
                <TrendingUp className="w-6 h-6 text-[var(--accent)]" />
                Développement économique
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--muted)] leading-relaxed space-y-4">
                <p>
                  Depuis l&apos;avènement du Roi Mohammed VI en 1999, le Maroc a connu une croissance économique exceptionnelle. Les exportations ont triplé entre 1999 et 2019, le revenu par habitant est passé de 1 963 à 3 361 dollars américains, et le chômage est tombé de 13,9 % à 9 %.
                </p>
                <p>
                  Le pays est passé d&apos;une économie à faible revenu à une économie à revenu intermédiaire. L&apos;Indice de développement humain (IDH) est passé de 0,511 en 1999 (112e rang mondial) à 0,698 en 2024. L&apos;espérance de vie est passée de 66,4 ans à 75 ans, et le revenu par habitant a plus que doublé pour atteindre 7 216 euros. Le taux de pauvreté a chuté de 15,3 % à moins de 1,7 %.
                </p>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-[var(--foreground)] mb-6">
                <Building2 className="w-6 h-6 text-[var(--accent)]" />
                Infrastructures
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--muted)] leading-relaxed space-y-4">
                <p>
                  Le règne de Mohammed VI est marqué par des investissements majeurs dans les infrastructures. Le port Tanger Med a positionné le Maroc comme acteur commercial clé dans les chaînes de valeur mondiales. Le pays s&apos;est doté d&apos;autoroutes, du train à grande vitesse Al Boraq et d&apos;infrastructures de classe mondiale.
                </p>
                <p>
                  Le développement rural a été particulièrement significatif : l&apos;électricité et l&apos;eau potable atteignent désormais l&apos;ensemble de la population rurale, contre à peine la moitié en 2000.
                </p>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-[var(--foreground)] mb-6">
                <Globe className="w-6 h-6 text-[var(--accent)]" />
                Tourisme & rayonnement
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--muted)] leading-relaxed space-y-4">
                <p>
                  Le tourisme a triplé en deux décennies, avec une croissance moyenne annuelle de 6 % — deux points supérieure à la croissance mondiale du secteur. Le Maroc s&apos;est imposé comme destination phare, de Marrakech à Tanger en passant par Agadir et Fès.
                </p>
                <p>
                  Le Royaume a émergé comme puissance régionale au carrefour euro-méditerranéen, atlantique et africain, grâce à une diplomatie stratégique et des partenariats multilatéraux.
                </p>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-[var(--foreground)] mb-6">
                <Train className="w-6 h-6 text-[var(--accent)]" />
                Réformes politiques
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--muted)] leading-relaxed space-y-4">
                <p>
                  Mohammed VI a introduit des réformes constitutionnelles et démocratiques, notamment la Constitution de 2011 qui a élargi les pouvoirs du Parlement et du Premier ministre, tout en conservant l&apos;autorité ultime de la monarchie.
                </p>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-[var(--foreground)] mb-6">
                <Heart className="w-6 h-6 text-[var(--accent)]" />
                Football marocain
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--muted)] leading-relaxed space-y-4">
                <p>
                  Le football marocain a connu un succès retentissant sous ces années de développement. Les Lions de l&apos;Atlas ont remporté la Coupe d&apos;Afrique des Nations 2025 en battant le Sénégal en finale, une première historique pour le Maroc. La Botola Pro, championnat national, attire des millions de spectateurs et des clubs comme Wydad AC, Raja CA, AS FAR et RS Berkane rayonnent sur le continent africain.
                </p>
                <p>
                  Le pays a accueilli la Coupe du Monde 2030 (partagée avec l&apos;Espagne et le Portugal), témoignant de la confiance du monde footballistique dans les infrastructures et la capacité d&apos;organisation du Maroc.
                </p>
              </div>
            </section>
          </article>

          <div className="mt-16 pt-12 border-t border-[var(--border-clr)]">
            <Link
              href="/#teams"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-black font-bold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-all"
            >
              Voir toutes les équipes marocaines
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
