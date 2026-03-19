export default function BackofficeSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-black uppercase text-[var(--foreground)]">Configuration</h1>
      <div className="mt-8 space-y-6 text-sm text-[var(--muted)] max-w-2xl">
        <section className="rounded-xl border border-[var(--border-clr)] p-4 bg-[var(--surface)]">
          <h2 className="font-bold text-[var(--foreground)] mb-2">Google OAuth (Supabase)</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Dashboard Supabase → Authentication → Providers → Google : activer.</li>
            <li>Google Cloud Console : OAuth 2.0 Client ID (Web), URI de redirection :</li>
          </ol>
          <code className="block mt-2 p-2 rounded bg-[var(--background)] text-xs break-all">
            https://&lt;PROJECT_REF&gt;.supabase.co/auth/v1/callback
          </code>
        </section>
        <section className="rounded-xl border border-[var(--border-clr)] p-4 bg-[var(--surface)]">
          <h2 className="font-bold text-[var(--foreground)] mb-2">Variables d&apos;environnement</h2>
          <ul className="space-y-1 font-mono text-xs">
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            <li>SUPABASE_SERVICE_ROLE_KEY — liste utilisateurs + MAJ rôles (recommandé)</li>
            <li>ADMIN_EMAILS — emails séparés par virgule, accès admin immédiat</li>
          </ul>
        </section>
        <section className="rounded-xl border border-[var(--border-clr)] p-4 bg-[var(--surface)]">
          <h2 className="font-bold text-[var(--foreground)] mb-2">SQL</h2>
          <p>
            Exécuter <code className="text-[var(--accent)]">supabase/migrations/001_profiles.sql</code> dans
            l&apos;éditeur SQL Supabase (table profiles + trigger + RLS).
          </p>
        </section>
      </div>
    </div>
  );
}
