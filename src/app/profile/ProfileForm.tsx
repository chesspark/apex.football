"use client";

import { useActionState } from "react";
import Link from "next/link";
import { User, Globe, Heart, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import type { MastodonteClubSeed } from "@/lib/mastodontes-data";
import type { Profile } from "@/lib/types";
import SocialShareBar from "@/components/social/SocialShareBar";
import { updateSocialProfile, type ProfileActionState } from "./actions";

const initialState: ProfileActionState = { ok: false };

type Props = {
  profile: Profile | null;
  clubs: MastodonteClubSeed[];
  email: string | undefined;
  /** Ex. https://apex.football — TLD .football */
  publicSiteBase: string;
};

export default function ProfileForm({ profile, clubs, email, publicSiteBase }: Props) {
  const [state, formAction, pending] = useActionState(updateSocialProfile, initialState);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
      <div className="rounded-3xl border border-[var(--border-clr)] bg-[var(--surface)]/80 backdrop-blur-sm p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)]">
            <User className="w-7 h-7" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
              Profil social Apex
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Visible sur <strong className="text-[var(--foreground)]">apex.football</strong> si tu actives le profil public
              et un pseudo.
            </p>
          </div>
        </div>

        {email && (
          <p className="text-xs text-[var(--muted)] mt-4 mb-6 font-mono truncate border border-[var(--border-clr)] rounded-lg px-3 py-2 bg-[var(--background)]/50">
            Compte : {email}
          </p>
        )}

        {state.ok && (
          <p className="mb-4 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Profil enregistré.
          </p>
        )}
        {state.error && (
          <p className="mb-4 text-sm text-red-500 font-medium" role="alert">
            {state.error}
          </p>
        )}

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
              Pseudo public <span className="text-red-400">*</span> pour être trouvable
            </label>
            <div className="flex rounded-xl border border-[var(--border-clr)] bg-[var(--background)] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--accent)]/40">
              <span className="px-3 py-2.5 text-xs text-[var(--muted)] shrink-0 border-r border-[var(--border-clr)]">
                apex.football/u/
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                defaultValue={profile?.username ?? ""}
                placeholder="ton_pseudo"
                className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-[var(--muted)]">3–30 caractères : a-z, 0-9, underscore. Laisse vide pour ne pas réserver de pseudo.</p>
          </div>

          <div>
            <label htmlFor="display_name" className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
              Nom affiché
            </label>
            <input
              id="display_name"
              name="display_name"
              type="text"
              defaultValue={profile?.display_name ?? profile?.full_name ?? ""}
              className="w-full rounded-xl border border-[var(--border-clr)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              defaultValue={profile?.bio ?? ""}
              placeholder="Ton club, ton style, ta tribu…"
              className="w-full rounded-xl border border-[var(--border-clr)] bg-[var(--background)] px-3 py-2.5 text-sm resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
            />
          </div>

          <div>
            <label htmlFor="favorite_club_slug" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
              <Heart className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden />
              Club favori (mastodonte)
            </label>
            <select
              id="favorite_club_slug"
              name="favorite_club_slug"
              defaultValue={profile?.favorite_club_slug ?? ""}
              className="w-full rounded-xl border border-[var(--border-clr)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
            >
              <option value="">— Choisir —</option>
              {clubs.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.league})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="website_url" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
              <Globe className="w-3.5 h-3.5" aria-hidden />
              Site ou lien (optionnel)
            </label>
            <input
              id="website_url"
              name="website_url"
              type="url"
              inputMode="url"
              defaultValue={profile?.website_url ?? ""}
              placeholder="https://…"
              className="w-full rounded-xl border border-[var(--border-clr)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="profile_public"
              defaultChecked={profile?.profile_public !== false}
              value="on"
              className="mt-1 rounded border-[var(--border-clr)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <span className="text-sm text-[var(--foreground)]">
              <span className="font-semibold flex items-center gap-2">
                {profile?.profile_public !== false ? (
                  <Eye className="w-4 h-4 text-[var(--accent)]" aria-hidden />
                ) : (
                  <EyeOff className="w-4 h-4 text-[var(--muted)]" aria-hidden />
                )}
                Profil public
              </span>
              <span className="text-[var(--muted)] text-xs block mt-1">
                Si activé, les visiteurs peuvent voir ta fiche sur /u/ton-pseudo (sans afficher ton email).
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-fg)] font-black uppercase text-xs tracking-wider hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {pending ? "Enregistrement…" : "Enregistrer le profil"}
          </button>
        </form>

        {profile?.username && (
          <div className="mt-8 pt-8 border-t border-[var(--border-clr)] space-y-6">
            <div>
              <p className="text-xs text-[var(--muted)] mb-2">Ta page publique :</p>
              <Link
                href={`/u/${profile.username}`}
                className="text-sm font-bold text-[var(--accent)] hover:underline break-all"
              >
                {publicSiteBase.replace(/\/$/, "")}/u/{profile.username}
              </Link>
            </div>
            <SocialShareBar
              profileUrl={`${publicSiteBase.replace(/\/$/, "")}/u/${profile.username}`}
              title={`${profile.display_name || profile.full_name || profile.username} — Apex Football`}
              description={profile.bio || `Profil fan @${profile.username}`}
              bio={profile.bio}
            />
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-[var(--muted)]">
        Connexion avec Google ou Apple — même compte, profil unique sur le domaine .football.
      </p>
    </div>
  );
}
