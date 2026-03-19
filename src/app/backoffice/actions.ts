"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdminUser } from "@/lib/auth/admin";
import type { LiveMatch } from "@/lib/types";
import type { ServerSupabaseClient } from "@/lib/auth/admin";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  if (!(await isAdminUser(supabase, user))) throw new Error("Accès refusé");
  return { supabase, user };
}

/** Écritures : service role si dispo (contourne RLS), sinon session admin. */
async function adminWriteClient(): Promise<ServerSupabaseClient> {
  await requireAdmin();
  const service = createServiceClient();
  if (service) return service as unknown as ServerSupabaseClient;
  return await createClient();
}

export async function updateLiveMatch(
  id: number,
  payload: Partial<
    Pick<
      LiveMatch,
      | "home_score"
      | "away_score"
      | "status"
      | "minute"
      | "tournament"
      | "match_date"
      | "stadium"
      | "stadium_lat"
      | "stadium_lng"
    >
  >
) {
  const supabase = await adminWriteClient();
  const tbl = supabase.from("live_matches") as unknown as {
    update: (p: typeof payload) => { eq: (c: string, v: number) => Promise<{ error: Error | null }> };
  };
  const { error } = await tbl.update(payload).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/backoffice/matches");
  revalidatePath("/");
  revalidatePath(`/match/${id}`);
}

export async function deleteLiveMatch(id: number) {
  const supabase = await adminWriteClient();
  const { error } = await supabase.from("live_matches").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/backoffice/matches");
  revalidatePath("/");
}

export async function createLiveMatch(payload: {
  home_club_id: number;
  away_club_id: number;
  home_score: number;
  away_score: number;
  status: LiveMatch["status"];
  minute: number | null;
  tournament: string;
  match_date: string;
  stadium: string | null;
  stadium_lat: number | null;
  stadium_lng: number | null;
}) {
  const supabase = await adminWriteClient();
  const ins = supabase.from("live_matches") as unknown as {
    insert: (p: typeof payload) => Promise<{ error: Error | null }>;
  };
  const { error } = await ins.insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/backoffice/matches");
  revalidatePath("/");
}

export async function updateProfileRole(userId: string, role: "user" | "admin" | "super_admin") {
  await requireAdmin();
  const service = createServiceClient();
  const client = service ?? (await createClient());
  const ptbl = client.from("profiles") as unknown as {
    update: (p: { role: typeof role }) => { eq: (c: string, v: string) => Promise<{ error: Error | null }> };
  };
  const { error } = await ptbl.update({ role }).eq("id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/backoffice/users");
}
