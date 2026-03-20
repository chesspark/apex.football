import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicProfileNotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-32 pb-20 px-4 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-black text-[var(--foreground)]">Profil introuvable</h1>
        <p className="mt-3 text-[var(--muted)] text-sm">
          Ce pseudo n’existe pas ou le profil n’est pas public.
        </p>
        <Link href="/login" className="inline-block mt-8 text-[var(--accent)] font-bold hover:underline">
          Créer mon compte
        </Link>
      </div>
      <Footer />
    </main>
  );
}
