"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApexLogoMark from "@/components/ApexLogoMark";
import { signInWithOAuthProvider } from "@/lib/auth/oauth-client";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/profile";
  const err = searchParams.get("error");
  const [loading, setLoading] = useState<"google" | "apple" | null>(null);

  async function signIn(provider: "google" | "apple") {
    setLoading(provider);
    const supabase = createClient();
    const { error } = await signInWithOAuthProvider(supabase, provider, next);
    if (error) {
      alert(error.message);
      setLoading(null);
    }
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-clr)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <ApexLogoMark size={56} />
        </div>
        <h1 className="text-2xl font-black uppercase text-center text-[var(--foreground)]">
          Connexion
        </h1>
        <p className="text-sm text-[var(--muted)] text-center mt-2 leading-relaxed">
          Compte <strong className="text-[var(--foreground)]">Google</strong> ou{" "}
          <strong className="text-[var(--foreground)]">Apple ID</strong> — puis crée ton profil fan sur{" "}
          <strong className="text-[var(--accent)]">apex.football</strong> (TLD .football, comme .com).
        </p>
        {err && (
          <p className="mt-4 text-sm text-red-500 text-center" role="alert">
            Échec de la connexion. Réessaie ou vérifie la configuration OAuth dans Supabase.
          </p>
        )}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => signIn("google")}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-gray-800 font-bold border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading === "google" ? "Redirection…" : "Continuer avec Google"}
          </button>

          <button
            type="button"
            onClick={() => signIn("apple")}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#000] text-white font-bold border border-zinc-700 hover:bg-zinc-900 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            {loading === "apple" ? "Redirection…" : "Continuer avec Apple"}
          </button>
        </div>

        <p className="mt-6 text-[11px] text-[var(--muted)] text-center leading-relaxed">
          Après connexion, tu peux définir ton pseudo et ta bio depuis{" "}
          <Link href="/profile" className="text-[var(--accent)] font-semibold hover:underline">
            Profil social
          </Link>
          .
        </p>

        <Link
          href="/"
          className="block text-center text-sm text-[var(--muted)] hover:text-[var(--accent)] mt-6"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-24">
        <Suspense
          fallback={
            <div className="min-h-[40vh] flex items-center justify-center text-[var(--muted)]">Chargement…</div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
