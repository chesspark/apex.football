/**
 * Liens de partage web (WhatsApp, Telegram).
 * Instagram ne propose pas d’URL de partage universelle : utiliser copier texte + collage manuel (Stories/bio).
 */

export function buildWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildTelegramShareUrl(url: string, text: string): string {
  const u = new URL("https://t.me/share/url");
  u.searchParams.set("url", url);
  u.searchParams.set("text", text);
  return u.toString();
}

/** Légende prête à coller (bio, lien, hashtags) — pour Instagram / Stories. */
export function buildInstagramCaption(params: {
  title: string;
  profileUrl: string;
  bio?: string | null;
}): string {
  const lines = [
    `⚽ ${params.title}`,
    params.bio?.trim() || "",
    "",
    params.profileUrl,
    "",
    "#ApexFootball #football #soccer",
  ].filter(Boolean);
  return lines.join("\n").trim();
}
