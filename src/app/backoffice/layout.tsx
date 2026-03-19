import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/admin";
import { LayoutDashboard, Trophy, Users, Settings, ExternalLink } from "lucide-react";
import BackofficeSignOut from "@/components/BackofficeSignOut";

const nav = [
  { href: "/backoffice", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/backoffice/matches", label: "Matchs", icon: Trophy },
  { href: "/backoffice/users", label: "Utilisateurs", icon: Users },
  { href: "/backoffice/settings", label: "Configuration", icon: Settings },
];

export default async function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/backoffice");
  }

  const admin = await isAdminUser(supabase, user);
  if (!admin) {
    redirect("/?error=forbidden");
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <aside className="w-56 shrink-0 border-r border-[var(--border-clr)] bg-[var(--surface)] flex flex-col">
        <div className="p-4 border-b border-[var(--border-clr)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
            Apex Backoffice
          </p>
          <p className="text-xs text-[var(--foreground)] truncate mt-1">{user.email}</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--accent)] hover:bg-[var(--surface-hover)]"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le site
          </Link>
        </nav>
        <div className="p-2 border-t border-[var(--border-clr)]">
          <BackofficeSignOut />
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
