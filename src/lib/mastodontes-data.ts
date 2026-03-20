import seed from "@/data/mastodontes-2026-seed.json";

export type MastodonteClubSeed = {
  slug: string;
  name: string;
  country: string;
  league: string;
  deloitte_revenue_m_eur: number;
  transfermarkt_squad_value_m_eur: number;
  composite_score: number;
};

export type MastodonteSeedMeta = {
  product: string;
  disclaimer: string;
  season: string;
  composite_formula: string;
};

export function getMastodonteMeta(): MastodonteSeedMeta {
  return seed._meta as MastodonteSeedMeta;
}

export function getMastodontesSorted(): MastodonteClubSeed[] {
  const clubs = seed.clubs as MastodonteClubSeed[];
  return [...clubs].sort((a, b) => b.composite_score - a.composite_score);
}

export function getMastodonteRank(club: MastodonteClubSeed, sorted: MastodonteClubSeed[]): number {
  return sorted.findIndex((c) => c.slug === club.slug) + 1;
}
