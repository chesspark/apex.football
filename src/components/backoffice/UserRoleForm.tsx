"use client";

import { useTransition } from "react";
import { updateProfileRole } from "@/app/backoffice/actions";
import type { Profile } from "@/lib/types";

export default function UserRoleForm({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: Profile["role"];
}) {
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    const role = formData.get("role") as Profile["role"];
    startTransition(async () => {
      try {
        await updateProfileRole(userId, role);
      } catch (e) {
        alert(e instanceof Error ? e.message : "Erreur");
      }
    });
  }

  return (
    <form action={submit} className="flex items-center gap-2">
      <select
        name="role"
        defaultValue={currentRole}
        className="rounded border border-[var(--border-clr)] bg-[var(--background)] px-2 py-2 text-sm"
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
        <option value="super_admin">super_admin</option>
      </select>
      <button
        type="submit"
        disabled={pending}
        className="px-3 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-xs font-bold disabled:opacity-50"
      >
        OK
      </button>
    </form>
  );
}
