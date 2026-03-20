/** Parsing Host uniquement — importable depuis le middleware Edge sans i18n-iso-countries. */

export const APEX_ROOT_DOMAIN = process.env.NEXT_PUBLIC_APEX_ROOT_DOMAIN || "apex.football";

/** Extrait le segment pays (ex. cuba) depuis cuba.apex.football — null si site global (apex.football, www). */
export function extractCountrySubdomainFromHost(host: string): string | null {
  const hostname = host.split(":")[0].toLowerCase();
  const suffix = `.${APEX_ROOT_DOMAIN.toLowerCase()}`;
  if (!hostname.endsWith(suffix)) return null;
  const rest = hostname.slice(0, -suffix.length);
  if (!rest) return null;
  const labels = rest.split(".").filter(Boolean);
  if (labels.length === 0) return null;
  const leaf = labels[labels.length - 1];
  if (leaf === "www") return null;
  return leaf;
}
