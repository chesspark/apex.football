/** Identifiant public : lettres minuscules, chiffres, underscore ; 3–30 caractères. */
const USERNAME_RE = /^[a-z0-9_]{3,30}$/;

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "_");
}

export function validateUsername(username: string): { ok: true; value: string } | { ok: false; error: string } {
  const v = normalizeUsername(username);
  if (!USERNAME_RE.test(v)) {
    return {
      ok: false,
      error: "Pseudo : 3 à 30 caractères (a-z, 0-9, _).",
    };
  }
  return { ok: true, value: v };
}

const BIO_MAX = 500;

export function sanitizeBio(raw: string): string {
  return raw.trim().slice(0, BIO_MAX);
}

const URL_MAX = 2048;

export function sanitizeWebsiteUrl(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  if (t.length > URL_MAX) return null;
  try {
    const u = new URL(t.startsWith("http") ? t : `https://${t}`);
    if (!["http:", "https:"].includes(u.protocol)) return null;
    return u.toString();
  } catch {
    return null;
  }
}
