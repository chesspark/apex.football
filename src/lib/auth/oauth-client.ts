export type OAuthProvider = "google" | "apple";

export type SupabaseBrowserClient = ReturnType<
  typeof import("@/lib/supabase/client").createClient
>;

/**
 * OAuth Google / Apple — redirect vers /auth/callback.
 * Configurer les fournisseurs dans Supabase Dashboard → Authentication → Providers.
 */
export async function signInWithOAuthProvider(
  supabase: SupabaseBrowserClient,
  provider: OAuthProvider,
  nextPath: string
) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;

  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      ...(provider === "apple"
        ? {
            queryParams: {
              scope: "name email",
            },
          }
        : {}),
    },
  });
}
