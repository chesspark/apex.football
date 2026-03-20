/** Official Apex Football Instagram — used across layout, footer, navbar. */
export const APEX_INSTAGRAM_URL = "https://www.instagram.com/apexfootball.world64/";
export const APEX_INSTAGRAM_HANDLE = "@apexfootball.world64";

/** Comma-separated post/reel URLs (optional). Embeds load in the global Instagram panel. */
export function getInstagramPostUrlsFromEnv(): string[] {
  const raw = process.env.NEXT_PUBLIC_INSTAGRAM_POST_URLS;
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("http"));
}
