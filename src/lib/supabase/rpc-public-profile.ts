import type { PublicProfileRow } from "@/lib/types";

type RpcResult = { data: PublicProfileRow[] | null; error: { message: string } | null };

/**
 * RPC SQL `get_public_profile` — typage runtime ; le client Supabase générique ne déclare pas les RPC ici.
 */
export async function rpcGetPublicProfile(
  supabase: unknown,
  username: string
): Promise<RpcResult> {
  const client = supabase as {
    rpc: (name: string, args: { p_username: string }) => Promise<RpcResult>;
  };
  return client.rpc("get_public_profile", { p_username: username });
}
