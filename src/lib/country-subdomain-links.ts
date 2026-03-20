/**
 * Liens directs pays — chaque ISO 3166-1 alpha-2 a au moins : `https://{xx}.{rootDomain}`
 */
import { getNames } from "i18n-iso-countries";
import { APEX_ROOT_DOMAIN } from "./apex-subdomain-host";

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type CountryDirectLinks = {
  iso2: string;
  nameEn: string;
  /** Toujours valide : code ISO2 minuscule (ex. ba, fr, de) */
  urlIso: string;
  /** Slug du nom officiel EN (ex. bosnia-and-herzegovina) */
  urlSlug: string;
};

export function getAllCountryDirectLinks(rootDomain: string = APEX_ROOT_DOMAIN): CountryDirectLinks[] {
  const names = getNames("en", { select: "official" }) as Record<string, string>;
  const protocol = "https" as const;
  return Object.entries(names)
    .map(([iso2, nameEn]) => {
      const lower = iso2.toLowerCase();
      const slug = slugify(nameEn);
      return {
        iso2,
        nameEn,
        urlIso: `${protocol}://${lower}.${rootDomain}`,
        urlSlug: `${protocol}://${slug}.${rootDomain}`,
      };
    })
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en"));
}
