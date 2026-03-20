"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, LogIn, LogOut, UserCircle } from "lucide-react";

type Me = {
  user: { email?: string; name?: string } | null;
  profile: { username?: string | null; display_name?: string | null } | null;
  isAdmin: boolean;
};

export default function AuthNav() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/auth/me");
      const data = (await res.json()) as Me;
      if (!cancelled) setMe(data);
    })();
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetch("/api/auth/me")
        .then((r) => r.json())
        .then((data: Me) => setMe(data));
    });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMe({ user: null, profile: null, isAdmin: false });
    window.location.reload();
  }

  if (me === null) {
    return <span className="w-16 h-4 bg-[var(--surface)] rounded animate-pulse" />;
  }

  if (!me.user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)]"
      >
        <LogIn className="w-3.5 h-3.5" />
        Connexion
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap justify-end">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1 text-xs font-bold text-[var(--foreground)] hover:text-[var(--accent)]"
        title="Profil social"
      >
        <UserCircle className="w-3.5 h-3.5" />
        <span className="hidden sm:inline max-w-[100px] truncate">
          {me.profile?.username ? `@${me.profile.username}` : "Profil"}
        </span>
      </Link>
      {me.isAdmin && (
        <Link
          href="/backoffice"
          className="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)] hover:underline"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Backoffice
        </Link>
      )}
      <span className="text-[10px] text-[var(--muted)] max-w-[120px] truncate hidden md:inline">
        {me.user.email}
      </span>
      <button
        type="button"
        onClick={signOut}
        className="inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-red-400"
        title="Déconnexion"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
