import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/admin";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ user: null, isAdmin: false });
  }

  const admin = await isAdminUser(supabase, user);
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: (user.user_metadata?.full_name as string) || user.user_metadata?.name,
      avatar: user.user_metadata?.avatar_url as string | undefined,
    },
    isAdmin: admin,
  });
}
