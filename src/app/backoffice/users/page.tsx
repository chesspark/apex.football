import { createServiceClient } from "@/lib/supabase/service";
import { createClient } from "@/lib/supabase/server";
import UserRoleForm from "@/components/backoffice/UserRoleForm";
import type { Profile } from "@/lib/types";

export default async function BackofficeUsersPage() {
  const service = createServiceClient();
  const supabase = await createClient();

  let profiles: Profile[] = [];
  let hint = "";

  if (service) {
    const { data, error } = await service.from("profiles").select("*").order("created_at", {
      ascending: false,
    });
    if (!error && data) profiles = data as Profile[];
    else hint = error?.message || "Erreur lecture profiles.";
  } else {
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", {
      ascending: false,
    });
    if (!error && data) profiles = data as Profile[];
    else
      hint =
        "Ajoute SUPABASE_SERVICE_ROLE_KEY ou exécute le SQL migrations pour la table profiles + RLS. Tu peux aussi utiliser ADMIN_EMAILS sans liste ici.";
  }

  return (
    <div>
      <h1 className="text-3xl font-black uppercase text-[var(--foreground)]">Utilisateurs</h1>
      <p className="text-[var(--muted)] text-sm mt-2">
        Rôles : user, admin, super_admin. Premiers admins : variable{" "}
        <code className="text-[var(--accent)]">ADMIN_EMAILS</code> ou rôle en base.
      </p>
      {hint && !profiles.length && (
        <p className="mt-4 text-amber-600 text-sm">{hint}</p>
      )}
      <div className="mt-8 space-y-3">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-[var(--border-clr)] bg-[var(--surface)] p-4"
          >
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-[var(--muted)] truncate">{p.id}</p>
              <p className="font-semibold text-[var(--foreground)]">{p.email || "—"}</p>
              <p className="text-sm text-[var(--muted)]">{p.full_name || "—"}</p>
            </div>
            <UserRoleForm userId={p.id} currentRole={p.role} />
          </div>
        ))}
        {profiles.length === 0 && !hint && (
          <p className="text-[var(--muted)] text-sm">Aucun profil. Connecte-toi une fois avec Google après migration SQL.</p>
        )}
      </div>
    </div>
  );
}
