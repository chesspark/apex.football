import { createClient } from "@/lib/supabase/server";

export default async function BackofficeDashboardPage() {
  const supabase = await createClient();

  const [clubs, players, matches] = await Promise.all([
    supabase.from("clubs").select("id", { count: "exact", head: true }),
    supabase.from("players").select("id", { count: "exact", head: true }),
    supabase.from("live_matches").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Clubs", count: clubs.count ?? 0 },
    { label: "Joueurs", count: players.count ?? 0 },
    { label: "Matchs (live DB)", count: matches.count ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black uppercase text-[var(--foreground)] tracking-tight">
        Tableau de bord
      </h1>
      <p className="text-[var(--muted)] mt-2 text-sm">
        Vue d&apos;ensemble des données Supabase. Gère les matchs et les rôles depuis le menu.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[var(--border-clr)] bg-[var(--surface)] p-6"
          >
            <p className="text-3xl font-black text-[var(--accent)]">{s.count}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
