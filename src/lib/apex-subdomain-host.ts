/** Parsing Host uniquement — importable depuis le middleware Edge sans i18n-iso-countries. */

export const APEX_ROOT_DOMAIN = process.env.NEXT_PUBLIC_APEX_ROOT_DOMAIN || "apex.football";
export const APEX_ROOT_DOMAINS = (
  process.env.NEXT_PUBLIC_APEX_ROOT_DOMAINS || `${APEX_ROOT_DOMAIN},opex.football`
)
  .split(",")
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

/** Extrait le segment pays (ex. cuba) depuis cuba.apex.football — null si site global (apex.football, www). */
export function extractCountrySubdomainFromHost(host: string): string | null {
  const hostname = host.split(":")[0].toLowerCase();
  const matchedRoot = APEX_ROOT_DOMAINS.find((domain) => hostname.endsWith(`.${domain}`));
  if (!matchedRoot) return null;

  const suffix = `.${matchedRoot}`;
  const rest = hostname.slice(0, -suffix.length);
  if (!rest) return null;
  const labels = rest.split(".").filter(Boolean);
  if (labels.length === 0) return null;
  const leaf = labels[labels.length - 1];
  if (leaf === "www") return null;
  return leaf;
}
