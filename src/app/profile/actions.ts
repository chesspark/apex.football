"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sanitizeBio, sanitizeWebsiteUrl, validateUsername } from "@/lib/profile/username";
import type { Database } from "@/lib/types";

type ProfilesUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type ProfileActionState = { ok: boolean; error?: string };

export async function updateSocialProfile(
  _prev: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Non connecté." };
  }

  const usernameRaw = String(formData.get("username") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim().slice(0, 80);
  const bio = sanitizeBio(String(formData.get("bio") ?? ""));
  const favoriteClubSlug = String(formData.get("favorite_club_slug") ?? "").trim() || null;
  const websiteRaw = String(formData.get("website_url") ?? "");
  const profilePublic =
    formData.get("profile_public") === "on" || formData.get("profile_public") === "true";

  const websiteUrl = sanitizeWebsiteUrl(websiteRaw);

  const updates: ProfilesUpdate = {
    display_name: displayName || null,
    bio: bio || null,
    favorite_club_slug: favoriteClubSlug,
    website_url: websiteUrl,
    profile_public: profilePublic,
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  };

  if (usernameRaw.trim()) {
    const v = validateUsername(usernameRaw);
    if (!v.ok) return { ok: false, error: v.error };
    updates.username = v.value;
  }

  const db = supabase as unknown as SupabaseClient;
  const { error } = await db.from("profiles").update(updates).eq("id", user.id);

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Ce pseudo est déjà pris." };
    }
    return { ok: false, error: error.message };
  }

  const { data: row } = await db.from("profiles").select("username").eq("id", user.id).single();
  if (row?.username) {
    revalidatePath(`/u/${row.username}`);
  }
  revalidatePath("/profile");
  return { ok: true };
}
