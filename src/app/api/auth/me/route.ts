import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/admin";
import type { Profile } from "@/lib/types";

type ProfileMe = Pick<
  Profile,
  | "username"
  | "display_name"
  | "full_name"
  | "avatar_url"
  | "bio"
  | "favorite_club_slug"
  | "profile_public"
  | "onboarding_completed"
>;

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ user: null, profile: null, isAdmin: false });
  }

  const admin = await isAdminUser(supabase, user);

  const { data: profileRaw } = await supabase
    .from("profiles")
    .select(
      "username, display_name, full_name, avatar_url, bio, favorite_club_slug, profile_public, onboarding_completed"
    )
    .eq("id", user.id)
    .maybeSingle();

  const profile = profileRaw as ProfileMe | null;

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name:
        (user.user_metadata?.full_name as string) ||
        (user.user_metadata?.name as string) ||
        profile?.display_name ||
        profile?.full_name,
      avatar: (user.user_metadata?.avatar_url as string) || profile?.avatar_url,
    },
    profile,
    isAdmin: admin,
  });
}
