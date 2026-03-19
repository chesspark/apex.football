import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import MatchRowForm, { type BackofficeMatchRow } from "@/components/backoffice/MatchRowForm";
import CreateMatchForm from "@/components/backoffice/CreateMatchForm";

export default async function BackofficeMatchesPage() {
  const supabase = await createClient();
  const { data: rawMatches } = await supabase
    .from("live_matches")
    .select("*, home_club:clubs!home_club_id(id, short_name), away_club:clubs!away_club_id(id, short_name)")
    .order("match_date", { ascending: false });

  const matches = rawMatches as BackofficeMatchRow[] | null;

  const { data: clubs } = await supabase.from("clubs").select("id, short_name").order("short_name");

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase text-[var(--foreground)]">Matchs</h1>
          <p className="text-[var(--muted)] text-sm mt-1">
            Modifier les scores, statuts et métadonnées. Les changements se reflètent sur le site.
          </p>
        </div>
        <Link
          href="/#results"
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          Voir les résultats publics →
        </Link>
      </div>

      <div className="mt-10 space-y-4">
        {(matches || []).map((m) => (
          <MatchRowForm key={m.id} match={m} />
        ))}
        {(!matches || matches.length === 0) && (
          <p className="text-[var(--muted)] text-sm">Aucun match en base.</p>
        )}
      </div>

      <div className="mt-14 pt-10 border-t border-[var(--border-clr)]">
        <h2 className="text-xl font-black uppercase text-[var(--foreground)] mb-4">
          Créer un match
        </h2>
        <CreateMatchForm clubs={clubs || []} />
      </div>
    </div>
  );
}
