/**
 * Sous-domaines pays : cuba.apex.football, fr.apex.football (code ISO2), united-kingdom.apex.football (slug anglais), etc.
 * Résolution pays (serveur / layout uniquement — pas le middleware Edge).
 */
import { getNames } from "i18n-iso-countries";

export { APEX_ROOT_DOMAIN } from "./apex-subdomain-host";

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Alias slug -> ISO2 (en plus des slugs dérivés des noms officiels EN) */
const EXTRA_SLUGS: Record<string, string> = {
  uk: "GB",
  usa: "US",
  uae: "AE",
  "south-korea": "KR",
  "north-korea": "KP",
  "czech-republic": "CZ",
  "dominican-republic": "DO",
  "ivory-coast": "CI",
  "cote-divoire": "CI",
  russia: "RU",
  turkey: "TR",
  bolivia: "BO",
  /** Bosnie — accès directs type bosna.apex.world */
  bosna: "BA",
  bih: "BA",
  holland: "NL",
  schweiz: "CH",
  suisse: "CH",
  espana: "ES",
  deutschland: "DE",
  osterreich: "AT",
  belgie: "BE",
  magyarorszag: "HU",
};

/** ISO2 -> nom officiel EN */
const ISO_TO_NAME = getNames("en", { select: "official" }) as Record<string, string>;

function buildSlugToIso(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [iso2, nameEn] of Object.entries(ISO_TO_NAME)) {
    map.set(slugify(nameEn), iso2);
  }
  for (const [slug, iso2] of Object.entries(EXTRA_SLUGS)) {
    map.set(slug, iso2);
  }
  return map;
}

const SLUG_TO_ISO = buildSlugToIso();

export type CountrySubdomainContext = {
  /** Sous-domaine brut (ex. cuba, cu) */
  rawSlug: string;
  iso2: string;
  /** Slug canonique du nom anglais (ex. cuba, united-kingdom) */
  canonicalSlug: string;
  nameEn: string;
};

/**
 * Résout un segment de sous-domaine vers un pays (serveur uniquement).
 * - 2 lettres : traité comme ISO 3166-1 alpha-2 (cu, fr).
 * - sinon : slug anglais (cuba, france, united-kingdom).
 */
export function resolveCountrySubdomain(rawSlug: string): CountrySubdomainContext | null {
  const s = rawSlug.trim().toLowerCase();
  if (!s || s === "www") return null;

  if (s.length === 2) {
    const iso2 = s.toUpperCase();
    const nameEn = ISO_TO_NAME[iso2];
    if (!nameEn) return null;
    return {
      rawSlug: s,
      iso2,
      canonicalSlug: slugify(nameEn),
      nameEn,
    };
  }

  const iso2 = SLUG_TO_ISO.get(s);
  if (!iso2) return null;

  const nameEn = ISO_TO_NAME[iso2];
  if (!nameEn) return null;

  return {
    rawSlug: s,
    iso2,
    canonicalSlug: slugify(nameEn),
    nameEn,
  };
}
