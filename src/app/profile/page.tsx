import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { getMastodontesSorted } from "@/lib/mastodontes-data";
import type { Profile } from "@/lib/types";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Profil social | Apex Football",
  description: "Configure ton profil fan sur apex.football — pseudo public, bio, club favori.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const { data: profileRow } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  const profile = profileRow as Profile | null;

  const clubs = getMastodontesSorted();
  const publicSiteBase =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://apex.football";

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-24">
        <ProfileForm profile={profile} clubs={clubs} email={user.email} publicSiteBase={publicSiteBase} />
      </div>
      <Footer />
    </main>
  );
}
