"use client";

import { useTransition } from "react";
import { updateLiveMatch, deleteLiveMatch } from "@/app/backoffice/actions";
import type { LiveMatch } from "@/lib/types";

export type BackofficeMatchRow = LiveMatch & {
  home_club?: { id: number; short_name: string } | null;
  away_club?: { id: number; short_name: string } | null;
};

export default function MatchRowForm({ match }: { match: BackofficeMatchRow }) {
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      await updateLiveMatch(match.id, {
        home_score: Number(formData.get("home_score")),
        away_score: Number(formData.get("away_score")),
        status: formData.get("status") as LiveMatch["status"],
        minute: formData.get("minute") ? Number(formData.get("minute")) : null,
        tournament: String(formData.get("tournament")),
        match_date: String(formData.get("match_date")),
        stadium: String(formData.get("stadium")) || null,
        stadium_lat: formData.get("stadium_lat") ? Number(formData.get("stadium_lat")) : null,
        stadium_lng: formData.get("stadium_lng") ? Number(formData.get("stadium_lng")) : null,
      });
    });
  }

  function remove() {
    if (!confirm("Supprimer ce match ?")) return;
    startTransition(async () => {
      await deleteLiveMatch(match.id);
    });
  }

  const md = match.match_date?.slice(0, 16) ?? "";

  return (
    <form
      action={submit}
      className="rounded-xl border border-[var(--border-clr)] bg-[var(--surface)] p-4 space-y-3"
    >
      <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--foreground)]">
        <span>
          {match.home_club?.short_name ?? "?"} vs {match.away_club?.short_name ?? "?"}
        </span>
        <span className="text-[var(--muted)] font-mono text-xs">#{match.id}</span>
        <a
          href={`/match/${match.id}`}
          className="text-xs text-[var(--accent)] hover:underline ml-auto"
        >
          Page publique
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        <label className="text-[10px] uppercase text-[var(--muted)]">
          Dom score
          <input
            name="home_score"
            type="number"
            defaultValue={match.home_score}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)]">
          Ext score
          <input
            name="away_score"
            type="number"
            defaultValue={match.away_score}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)]">
          Statut
          <select
            name="status"
            defaultValue={match.status}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          >
            <option value="upcoming">upcoming</option>
            <option value="live">live</option>
            <option value="ht">ht</option>
            <option value="ft">ft</option>
          </select>
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)]">
          Minute
          <input
            name="minute"
            type="number"
            defaultValue={match.minute ?? ""}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)] col-span-2">
          Compétition
          <input
            name="tournament"
            defaultValue={match.tournament}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)] col-span-2">
          Date (ISO local)
          <input
            name="match_date"
            type="datetime-local"
            defaultValue={md}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)] col-span-2">
          Stade
          <input
            name="stadium"
            defaultValue={match.stadium ?? ""}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)]">
          Lat
          <input
            name="stadium_lat"
            type="number"
            step="any"
            defaultValue={match.stadium_lat ?? ""}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
        <label className="text-[10px] uppercase text-[var(--muted)]">
          Lng
          <input
            name="stadium_lng"
            type="number"
            step="any"
            defaultValue={match.stadium_lng ?? ""}
            className="w-full mt-0.5 rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-1 text-sm"
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-bold disabled:opacity-50"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={remove}
          disabled={pending}
          className="px-4 py-2 rounded-lg border border-red-500/50 text-red-500 text-sm font-bold hover:bg-red-500/10"
        >
          Supprimer
        </button>
      </div>
    </form>
  );
}
