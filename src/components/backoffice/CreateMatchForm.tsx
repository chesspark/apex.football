"use client";

import { useTransition } from "react";
import { createLiveMatch } from "@/app/backoffice/actions";

export default function CreateMatchForm({
  clubs,
}: {
  clubs: { id: number; short_name: string }[];
}) {
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      await createLiveMatch({
        home_club_id: Number(formData.get("home_club_id")),
        away_club_id: Number(formData.get("away_club_id")),
        home_score: Number(formData.get("home_score") || 0),
        away_score: Number(formData.get("away_score") || 0),
        status: (formData.get("status") as "live" | "ht" | "ft" | "upcoming") || "upcoming",
        minute: formData.get("minute") ? Number(formData.get("minute")) : null,
        tournament: String(formData.get("tournament")),
        match_date: new Date(String(formData.get("match_date"))).toISOString(),
        stadium: String(formData.get("stadium")) || null,
        stadium_lat: formData.get("stadium_lat") ? Number(formData.get("stadium_lat")) : null,
        stadium_lng: formData.get("stadium_lng") ? Number(formData.get("stadium_lng")) : null,
      });
    });
  }

  return (
    <form action={submit} className="max-w-2xl space-y-3 rounded-xl border border-[var(--border-clr)] p-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-xs text-[var(--muted)]">
          Domicile
          <select
            name="home_club_id"
            required
            className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
          >
            <option value="">—</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.short_name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-[var(--muted)]">
          Extérieur
          <select
            name="away_club_id"
            required
            className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
          >
            <option value="">—</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.short_name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <label className="text-xs text-[var(--muted)]">
          Score dom.
          <input
            name="home_score"
            type="number"
            defaultValue={0}
            className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
          />
        </label>
        <label className="text-xs text-[var(--muted)]">
          Score ext.
          <input
            name="away_score"
            type="number"
            defaultValue={0}
            className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
          />
        </label>
        <label className="text-xs text-[var(--muted)]">
          Statut
          <select
            name="status"
            defaultValue="upcoming"
            className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
          >
            <option value="upcoming">upcoming</option>
            <option value="live">live</option>
            <option value="ht">ht</option>
            <option value="ft">ft</option>
          </select>
        </label>
        <label className="text-xs text-[var(--muted)]">
          Minute
          <input
            name="minute"
            type="number"
            className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
          />
        </label>
        <label className="text-xs text-[var(--muted)]">
          Date & heure
          <input
            name="match_date"
            type="datetime-local"
            required
            className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
          />
        </label>
      </div>
      <label className="text-xs text-[var(--muted)] block">
        Compétition
        <input
          name="tournament"
          required
          className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
        />
      </label>
      <label className="text-xs text-[var(--muted)] block">
        Stade (optionnel)
        <input
          name="stadium"
          className="mt-1 w-full rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="px-6 py-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-bold"
      >
        Créer
      </button>
    </form>
  );
}
