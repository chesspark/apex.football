import type { User } from "@supabase/supabase-js";
import type { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export type ServerSupabaseClient = Awaited<ReturnType<typeof createClient>>;

export async function isAdminUser(
  supabase: ServerSupabaseClient,
  user: User | null
): Promise<boolean> {
  if (!user?.email) return false;

  const envAdmins =
    process.env.ADMIN_EMAILS?.split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean) || [];
  if (envAdmins.includes(user.email.toLowerCase())) return true;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  type RoleRow = { role: string | null };

  if (error || !data) {
    const service = createServiceClient();
    if (service) {
      const { data: row } = await service
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      const r = row as RoleRow | null;
      return r?.role === "admin" || r?.role === "super_admin";
    }
    return false;
  }

  const d = data as RoleRow;
  return d.role === "admin" || d.role === "super_admin";
}
