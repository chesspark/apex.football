/**
 * Builds seeds/top100.json from mastodontes-2026-seed.json + extra rows until 100 clubs.
 * Run: node scripts/build-top100-json.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const mastodontes = JSON.parse(
  readFileSync(join(root, "src/data/mastodontes-2026-seed.json"), "utf8")
);

/** @type {{ name: string; slug: string; country: string; league: string; market_value_eur: number; revenue_eur: number; fans_estimate: number; is_top100: boolean; notes: string }[]} */
const fromMastodontes = mastodontes.clubs.map((c) => ({
  name: c.name,
  slug: c.slug,
  country: c.country,
  league: c.league,
  market_value_eur: Math.round(c.transfermarkt_squad_value_m_eur * 1_000_000),
  revenue_eur: Math.round(c.deloitte_revenue_m_eur * 1_000_000),
  fans_estimate: Math.round(2_000_000 + c.composite_score * 2_500_000),
  is_top100: true,
  notes: "Seed MVP — replace with official TM/Deloitte before public comms",
}));

// Additional clubs to reach 100 (representative global pool; extend as needed)
const extra = [
  { name: "VfL Wolfsburg", slug: "wolfsburg", country: "Germany", league: "Bundesliga", market_value_eur: 280_000_000, revenue_eur: 240_000_000, fans_estimate: 12_000_000 },
  { name: "Everton FC", slug: "everton", country: "England", league: "Premier League", market_value_eur: 350_000_000, revenue_eur: 200_000_000, fans_estimate: 18_000_000 },
  { name: "Crystal Palace", slug: "crystal-palace", country: "England", league: "Premier League", market_value_eur: 320_000_000, revenue_eur: 180_000_000, fans_estimate: 11_000_000 },
  { name: "Fulham FC", slug: "fulham", country: "England", league: "Premier League", market_value_eur: 310_000_000, revenue_eur: 175_000_000, fans_estimate: 9_000_000 },
  { name: "Brentford FC", slug: "brentford", country: "England", league: "Premier League", market_value_eur: 290_000_000, revenue_eur: 170_000_000, fans_estimate: 7_000_000 },
  { name: "Wolverhampton", slug: "wolves", country: "England", league: "Premier League", market_value_eur: 340_000_000, revenue_eur: 185_000_000, fans_estimate: 10_000_000 },
  { name: "Leicester City", slug: "leicester", country: "England", league: "Championship", market_value_eur: 250_000_000, revenue_eur: 160_000_000, fans_estimate: 14_000_000 },
  { name: "Leeds United", slug: "leeds-united", country: "England", league: "Championship", market_value_eur: 240_000_000, revenue_eur: 155_000_000, fans_estimate: 16_000_000 },
  { name: "Southampton FC", slug: "southampton", country: "England", league: "Championship", market_value_eur: 220_000_000, revenue_eur: 140_000_000, fans_estimate: 8_000_000 },
  { name: "Atalanta BC", slug: "atalanta", country: "Italy", league: "Serie A", market_value_eur: 380_000_000, revenue_eur: 210_000_000, fans_estimate: 6_000_000 },
  { name: "Fiorentina", slug: "fiorentina", country: "Italy", league: "Serie A", market_value_eur: 260_000_000, revenue_eur: 165_000_000, fans_estimate: 5_000_000 },
  { name: "Torino FC", slug: "torino", country: "Italy", league: "Serie A", market_value_eur: 180_000_000, revenue_eur: 120_000_000, fans_estimate: 4_000_000 },
  { name: "Hamburger SV", slug: "hamburger-sv", country: "Germany", league: "2. Bundesliga", market_value_eur: 95_000_000, revenue_eur: 85_000_000, fans_estimate: 6_000_000 },
  { name: "1. FC Köln", slug: "fc-koln", country: "Germany", league: "Bundesliga", market_value_eur: 200_000_000, revenue_eur: 155_000_000, fans_estimate: 5_000_000 },
  { name: "TSG Hoffenheim", slug: "hoffenheim", country: "Germany", league: "Bundesliga", market_value_eur: 210_000_000, revenue_eur: 160_000_000, fans_estimate: 3_000_000 },
  { name: "Athletic Bilbao", slug: "athletic-bilbao", country: "Spain", league: "LaLiga", market_value_eur: 330_000_000, revenue_eur: 195_000_000, fans_estimate: 5_000_000 },
  { name: "Valencia CF", slug: "valencia", country: "Spain", league: "LaLiga", market_value_eur: 250_000_000, revenue_eur: 170_000_000, fans_estimate: 9_000_000 },
  { name: "RC Celta", slug: "celta-vigo", country: "Spain", league: "LaLiga", market_value_eur: 180_000_000, revenue_eur: 125_000_000, fans_estimate: 4_000_000 },
  { name: "Real Mallorca", slug: "mallorca", country: "Spain", league: "LaLiga", market_value_eur: 120_000_000, revenue_eur: 95_000_000, fans_estimate: 1_500_000 },
  { name: "OGC Nice", slug: "nice", country: "France", league: "Ligue 1", market_value_eur: 220_000_000, revenue_eur: 140_000_000, fans_estimate: 3_000_000 },
  { name: "RC Lens", slug: "lens", country: "France", league: "Ligue 1", market_value_eur: 200_000_000, revenue_eur: 130_000_000, fans_estimate: 4_000_000 },
  { name: "Stade Rennais", slug: "rennes", country: "France", league: "Ligue 1", market_value_eur: 195_000_000, revenue_eur: 128_000_000, fans_estimate: 3_500_000 },
  { name: "Sporting Charleroi", slug: "charleroi", country: "Belgium", league: "Pro League", market_value_eur: 45_000_000, revenue_eur: 35_000_000, fans_estimate: 600_000 },
  { name: "RSC Anderlecht", slug: "anderlecht", country: "Belgium", league: "Pro League", market_value_eur: 120_000_000, revenue_eur: 90_000_000, fans_estimate: 3_000_000 },
  { name: "FC Schalke 04", slug: "schalke", country: "Germany", league: "2. Bundesliga", market_value_eur: 110_000_000, revenue_eur: 95_000_000, fans_estimate: 15_000_000 },
  { name: "Fortuna Düsseldorf", slug: "fortuna-dusseldorf", country: "Germany", league: "2. Bundesliga", market_value_eur: 55_000_000, revenue_eur: 48_000_000, fans_estimate: 2_000_000 },
  { name: "Santos FC", slug: "santos-fc", country: "Brazil", league: "Brasileirão", market_value_eur: 95_000_000, revenue_eur: 75_000_000, fans_estimate: 12_000_000 },
  { name: "Grêmio FBPA", slug: "gremio-fbpa", country: "Brazil", league: "Brasileirão", market_value_eur: 110_000_000, revenue_eur: 70_000_000, fans_estimate: 8_000_000 },
  { name: "Colo-Colo", slug: "colo-colo", country: "Chile", league: "Primera División", market_value_eur: 45_000_000, revenue_eur: 35_000_000, fans_estimate: 6_000_000 },
  { name: "Universidad de Chile", slug: "u-de-chile", country: "Chile", league: "Primera División", market_value_eur: 38_000_000, revenue_eur: 28_000_000, fans_estimate: 4_000_000 },
  { name: "Al Ahly SC", slug: "al-ahly-sc", country: "Egypt", league: "Egyptian Premier League", market_value_eur: 45_000_000, revenue_eur: 25_000_000, fans_estimate: 55_000_000 },
  { name: "Orlando City SC", slug: "orlando-city", country: "USA", league: "MLS", market_value_eur: 55_000_000, revenue_eur: 48_000_000, fans_estimate: 3_000_000 },
  { name: "Getafe CF", slug: "getafe", country: "Spain", league: "LaLiga", market_value_eur: 95_000_000, revenue_eur: 88_000_000, fans_estimate: 2_000_000 },
  { name: "CA Osasuna", slug: "osasuna", country: "Spain", league: "LaLiga", market_value_eur: 105_000_000, revenue_eur: 92_000_000, fans_estimate: 2_500_000 },
  { name: "RCD Espanyol", slug: "espanyol", country: "Spain", league: "LaLiga", market_value_eur: 98_000_000, revenue_eur: 85_000_000, fans_estimate: 3_000_000 },
  { name: "Hertha BSC", slug: "hertha-berlin", country: "Germany", league: "2. Bundesliga", market_value_eur: 88_000_000, revenue_eur: 75_000_000, fans_estimate: 4_000_000 },
  { name: "1. FC Union Berlin", slug: "union-berlin", country: "Germany", league: "Bundesliga", market_value_eur: 175_000_000, revenue_eur: 145_000_000, fans_estimate: 3_500_000 },
  { name: "SC Freiburg", slug: "freiburg", country: "Germany", league: "Bundesliga", market_value_eur: 195_000_000, revenue_eur: 150_000_000, fans_estimate: 4_500_000 },
  { name: "1. FSV Mainz 05", slug: "mainz", country: "Germany", league: "Bundesliga", market_value_eur: 165_000_000, revenue_eur: 130_000_000, fans_estimate: 2_500_000 },
  { name: "SV Werder Bremen", slug: "werder-bremen", country: "Germany", league: "Bundesliga", market_value_eur: 185_000_000, revenue_eur: 140_000_000, fans_estimate: 4_000_000 },
  { name: "Bologna FC", slug: "bologna", country: "Italy", league: "Serie A", market_value_eur: 210_000_000, revenue_eur: 155_000_000, fans_estimate: 4_000_000 },
  { name: "Udinese Calcio", slug: "udinese", country: "Italy", league: "Serie A", market_value_eur: 175_000_000, revenue_eur: 125_000_000, fans_estimate: 3_000_000 },
  { name: "Genoa CFC", slug: "genoa", country: "Italy", league: "Serie A", market_value_eur: 155_000_000, revenue_eur: 118_000_000, fans_estimate: 3_500_000 },
  { name: "Cagliari Calcio", slug: "cagliari", country: "Italy", league: "Serie A", market_value_eur: 125_000_000, revenue_eur: 98_000_000, fans_estimate: 2_500_000 },
  { name: "Hellas Verona", slug: "verona", country: "Italy", league: "Serie A", market_value_eur: 135_000_000, revenue_eur: 105_000_000, fans_estimate: 2_000_000 },
  { name: "Empoli FC", slug: "empoli", country: "Italy", league: "Serie A", market_value_eur: 115_000_000, revenue_eur: 95_000_000, fans_estimate: 1_500_000 },
  { name: "Villarreal CF", slug: "villarreal-cf", country: "Spain", league: "LaLiga", market_value_eur: 220_000_000, revenue_eur: 165_000_000, fans_estimate: 5_000_000 },
  { name: "Girona FC", slug: "girona", country: "Spain", league: "LaLiga", market_value_eur: 195_000_000, revenue_eur: 140_000_000, fans_estimate: 2_000_000 },
  { name: "Rayo Vallecano", slug: "rayo-vallecano", country: "Spain", league: "LaLiga", market_value_eur: 88_000_000, revenue_eur: 82_000_000, fans_estimate: 2_000_000 },
  { name: "Real Oviedo", slug: "real-oviedo", country: "Spain", league: "Segunda División", market_value_eur: 42_000_000, revenue_eur: 38_000_000, fans_estimate: 1_200_000 },
  { name: "Real Zaragoza", slug: "real-zaragoza", country: "Spain", league: "Segunda División", market_value_eur: 48_000_000, revenue_eur: 42_000_000, fans_estimate: 2_500_000 },
  { name: "Deportivo La Coruña", slug: "deportivo-la-coruna", country: "Spain", league: "Primera RFEF", market_value_eur: 35_000_000, revenue_eur: 30_000_000, fans_estimate: 3_000_000 },
];

const seen = new Set(fromMastodontes.map((c) => c.slug));
const extraMapped = extra
  .filter((c) => !seen.has(c.slug))
  .map((c) => ({
    ...c,
    is_top100: true,
    notes: "notes" in c && c.notes ? c.notes : "Extended seed — verify vs official sources",
  }));

let clubs = [...fromMastodontes, ...extraMapped];

// Dedupe by slug (keep first)
const bySlug = new Map();
for (const c of clubs) {
  if (!bySlug.has(c.slug)) bySlug.set(c.slug, c);
}
clubs = [...bySlug.values()];

if (clubs.length < 100) {
  console.warn("Only", clubs.length, "clubs — add more rows in scripts/build-top100-json.mjs extra[]");
}
if (clubs.length > 100) {
  clubs = clubs.slice(0, 100);
}

clubs.sort((a, b) => b.market_value_eur - a.market_value_eur);

const out = {
  _meta: {
    product: "Apex.Football — Top 100 seed",
    disclaimer:
      "Demo financials — replace with official Transfermarkt / Deloitte sources before press or investor use.",
    season: "2025-26 (seed)",
    count: clubs.length,
    generated: new Date().toISOString(),
  },
  clubs,
};

mkdirSync(join(root, "seeds"), { recursive: true });
writeFileSync(join(root, "seeds/top100.json"), JSON.stringify(out, null, 2), "utf8");
console.log("Wrote seeds/top100.json with", clubs.length, "clubs; all is_top100=true");
