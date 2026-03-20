import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { rpcGetPublicProfile } from "@/lib/supabase/rpc-public-profile";
import { Heart, Globe, ExternalLink } from "lucide-react";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();
  const { data } = await rpcGetPublicProfile(supabase, username);
  const row = data?.[0];
  if (!row) return { title: "Profil | Apex Football" };
  const name = row.display_name || row.username;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://apex.football";
  return {
    title: `${name} | Apex Football`,
    description: row.bio?.slice(0, 160) || `Profil fan ${row.username} sur apex.football`,
    openGraph: {
      title: `${name} — Apex Football`,
      description: row.bio?.slice(0, 200) || undefined,
      url: `${base.replace(/\/$/, "")}/u/${row.username}`,
      siteName: "Apex Football",
    },
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const supabase = await createClient();
  const { data, error } = await rpcGetPublicProfile(supabase, username);

  if (error || !data?.[0]) notFound();
  const p = data[0];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-28 pb-16 px-4 max-w-2xl mx-auto">
        <article className="rounded-3xl border border-[var(--border-clr)] bg-[var(--surface)]/90 overflow-hidden shadow-xl">
          <div className="h-32 bg-gradient-to-br from-[var(--accent)]/30 via-[var(--accent-green)]/20 to-[var(--background)]" />
          <div className="px-6 sm:px-10 pb-10 -mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="relative w-28 h-28 rounded-2xl border-4 border-[var(--background)] bg-[var(--surface)] overflow-hidden shadow-lg shrink-0">
                {p.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element -- URLs OAuth tierces (Google, Apple)
                  <img
                    src={p.avatar_url}
                    alt=""
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-black text-[var(--muted)]">
                    {(p.display_name || p.username).slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Profil fan</p>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] truncate">
                  {p.display_name || p.username}
                </h1>
                <p className="text-sm text-[var(--muted)] font-mono">@{p.username}</p>
              </div>
            </div>

            {p.bio && <p className="mt-6 text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">{p.bio}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              {p.favorite_club_slug && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border-clr)] text-sm">
                  <Heart className="w-4 h-4 text-red-500 shrink-0" aria-hidden />
                  Club : {p.favorite_club_slug.replace(/-/g, " ")}
                </span>
              )}
              {p.website_url && (
                <a
                  href={p.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border-clr)] text-sm text-[var(--accent)] hover:border-[var(--accent)]/50"
                >
                  <Globe className="w-4 h-4" aria-hidden />
                  Site web
                  <ExternalLink className="w-3 h-3 opacity-60" aria-hidden />
                </a>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--border-clr)] flex flex-wrap gap-4 justify-between items-center">
              <Link href="/" className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">
                ← Apex Football
              </Link>
              <Link
                href="/login"
                className="text-sm font-bold text-[var(--accent)] hover:underline"
              >
                Créer mon profil
              </Link>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
