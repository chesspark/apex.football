import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "[seed] Définis SUPABASE_URL (ou NEXT_PUBLIC_SUPABASE_URL) et SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Exemple : export SUPABASE_SERVICE_ROLE_KEY=… && node scripts/seed.mjs"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ============ SCHEMA (optionnel — non appelé par défaut ; exécuter le schéma via SQL Editor) ============
async function runSchema() {
  console.log("Running schema...");
  const sql = readFileSync(join(__dirname, "schema.sql"), "utf8");
  const { error } = await supabase.rpc("exec_sql", { sql_text: sql }).maybeSingle();
  if (error) {
    // Try via REST raw SQL
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ sql_text: sql }),
    });
    if (!resp.ok) {
      console.log("RPC not available, running SQL statements individually...");
      await runSchemaStatements(sql);
    }
  }
  console.log("Schema done.");
}

async function runSchemaStatements(sql) {
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  for (const stmt of statements) {
    const { error } = await supabase.rpc("pg_query", { query: stmt + ";" });
    if (error) {
      // ignore individual errors and try direct POST
    }
  }
}

// ============ CLUBS ============
const clubs = [
  { name: "Arsenal", short_name: "Arsenal", code: "ARS", stadium: "Emirates Stadium", stadium_lat: 51.5549, stadium_lng: -0.1084, city: "London", country: "England", founded: 1886, primary_color: "#EF0107", secondary_color: "#FFFFFF" },
  { name: "Aston Villa", short_name: "Aston Villa", code: "AVL", stadium: "Villa Park", stadium_lat: 52.5092, stadium_lng: -1.8847, city: "Birmingham", country: "England", founded: 1874, primary_color: "#670E36", secondary_color: "#95BFE5" },
  { name: "AFC Bournemouth", short_name: "Bournemouth", code: "BOU", stadium: "Vitality Stadium", stadium_lat: 50.7352, stadium_lng: -1.8384, city: "Bournemouth", country: "England", founded: 1899, primary_color: "#DA291C", secondary_color: "#000000" },
  { name: "Brentford", short_name: "Brentford", code: "BRE", stadium: "Gtech Community Stadium", stadium_lat: 51.4907, stadium_lng: -0.2886, city: "London", country: "England", founded: 1889, primary_color: "#E30613", secondary_color: "#FFB81C" },
  { name: "Brighton & Hove Albion", short_name: "Brighton", code: "BHA", stadium: "Amex Stadium", stadium_lat: 50.8616, stadium_lng: -0.0834, city: "Brighton", country: "England", founded: 1901, primary_color: "#0057B8", secondary_color: "#FFFFFF" },
  { name: "Chelsea", short_name: "Chelsea", code: "CHE", stadium: "Stamford Bridge", stadium_lat: 51.4817, stadium_lng: -0.1910, city: "London", country: "England", founded: 1905, primary_color: "#034694", secondary_color: "#FFFFFF" },
  { name: "Crystal Palace", short_name: "Crystal Palace", code: "CRY", stadium: "Selhurst Park", stadium_lat: 51.3983, stadium_lng: -0.0855, city: "London", country: "England", founded: 1905, primary_color: "#1B458F", secondary_color: "#C4122E" },
  { name: "Everton", short_name: "Everton", code: "EVE", stadium: "Goodison Park", stadium_lat: 53.4388, stadium_lng: -2.9664, city: "Liverpool", country: "England", founded: 1878, primary_color: "#003399", secondary_color: "#FFFFFF" },
  { name: "Fulham", short_name: "Fulham", code: "FUL", stadium: "Craven Cottage", stadium_lat: 51.4750, stadium_lng: -0.2217, city: "London", country: "England", founded: 1879, primary_color: "#000000", secondary_color: "#FFFFFF" },
  { name: "Ipswich Town", short_name: "Ipswich", code: "IPS", stadium: "Portman Road", stadium_lat: 52.0545, stadium_lng: 1.1449, city: "Ipswich", country: "England", founded: 1878, primary_color: "#0044AA", secondary_color: "#FFFFFF" },
  { name: "Leicester City", short_name: "Leicester", code: "LEI", stadium: "King Power Stadium", stadium_lat: 52.6204, stadium_lng: -1.1421, city: "Leicester", country: "England", founded: 1884, primary_color: "#003090", secondary_color: "#FDBE11" },
  { name: "Liverpool", short_name: "Liverpool", code: "LIV", stadium: "Anfield", stadium_lat: 53.4308, stadium_lng: -2.9608, city: "Liverpool", country: "England", founded: 1892, primary_color: "#C8102E", secondary_color: "#FFFFFF" },
  { name: "Manchester City", short_name: "Man City", code: "MCI", stadium: "Etihad Stadium", stadium_lat: 53.4831, stadium_lng: -2.2004, city: "Manchester", country: "England", founded: 1880, primary_color: "#6CABDD", secondary_color: "#FFFFFF" },
  { name: "Manchester United", short_name: "Man United", code: "MUN", stadium: "Old Trafford", stadium_lat: 53.4631, stadium_lng: -2.2913, city: "Manchester", country: "England", founded: 1878, primary_color: "#DA291C", secondary_color: "#FBE122" },
  { name: "Newcastle United", short_name: "Newcastle", code: "NEW", stadium: "St James' Park", stadium_lat: 54.9756, stadium_lng: -1.6216, city: "Newcastle", country: "England", founded: 1892, primary_color: "#241F20", secondary_color: "#FFFFFF" },
  { name: "Nottingham Forest", short_name: "Nott'm Forest", code: "NFO", stadium: "The City Ground", stadium_lat: 52.9400, stadium_lng: -1.1325, city: "Nottingham", country: "England", founded: 1865, primary_color: "#DD0000", secondary_color: "#FFFFFF" },
  { name: "Southampton", short_name: "Southampton", code: "SOU", stadium: "St Mary's Stadium", stadium_lat: 50.9058, stadium_lng: -1.3910, city: "Southampton", country: "England", founded: 1885, primary_color: "#D71920", secondary_color: "#FFFFFF" },
  { name: "Tottenham Hotspur", short_name: "Spurs", code: "TOT", stadium: "Tottenham Hotspur Stadium", stadium_lat: 51.6042, stadium_lng: -0.0662, city: "London", country: "England", founded: 1882, primary_color: "#132257", secondary_color: "#FFFFFF" },
  { name: "West Ham United", short_name: "West Ham", code: "WHU", stadium: "London Stadium", stadium_lat: 51.5387, stadium_lng: -0.0166, city: "London", country: "England", founded: 1895, primary_color: "#7A263A", secondary_color: "#1BB1E7" },
  { name: "Wolverhampton Wanderers", short_name: "Wolves", code: "WOL", stadium: "Molineux Stadium", stadium_lat: 52.5902, stadium_lng: -2.1305, city: "Wolverhampton", country: "England", founded: 1877, primary_color: "#FDB913", secondary_color: "#231F20" },
];

// ============ PLAYERS ============
// [name, nationality, nat_code, dob, height, weight, position, number, goals, assists, apps, cs, yc, rc, mins, rating, value, foot]
const P = (name, nationality, nat_code, dob, h, w, pos, num, g, a, app, cs, yc, rc, mins, rat, val, foot = "Right") =>
  ({ name, nationality, nationality_code: nat_code, date_of_birth: dob, age: null, height_cm: h, weight_kg: w, position: pos, shirt_number: num, goals: g, assists: a, appearances: app, clean_sheets: cs, yellow_cards: yc, red_cards: rc, minutes_played: mins, rating: rat, market_value_millions: val, preferred_foot: foot });

const playersByClub = {
  ARS: [
    P("David Raya", "Spain", "ES", "1995-09-15", 183, 80, "GK", 22, 0, 0, 30, 12, 1, 0, 2700, 7.2, 35),
    P("Aaron Ramsdale", "England", "GB", "1998-05-14", 190, 77, "GK", 1, 0, 0, 4, 1, 0, 0, 360, 6.5, 20),
    P("William Saliba", "France", "FR", "2001-03-24", 192, 92, "DEF", 2, 2, 1, 32, 12, 4, 0, 2880, 7.8, 90),
    P("Gabriel Magalhães", "Brazil", "BR", "1997-12-19", 190, 78, "DEF", 6, 4, 0, 31, 12, 6, 0, 2790, 7.5, 75),
    P("Ben White", "England", "GB", "1997-10-08", 186, 78, "DEF", 4, 1, 4, 29, 10, 3, 0, 2610, 7.3, 55),
    P("Jurriën Timber", "Netherlands", "NL", "2001-06-17", 182, 79, "DEF", 12, 1, 3, 28, 8, 5, 0, 2520, 7.2, 50),
    P("Oleksandr Zinchenko", "Ukraine", "UA", "1996-12-15", 175, 64, "DEF", 35, 1, 5, 18, 4, 2, 0, 1440, 6.9, 25, "Left"),
    P("Takehiro Tomiyasu", "Japan", "JP", "1998-11-05", 188, 82, "DEF", 18, 0, 1, 14, 3, 1, 0, 1100, 6.8, 22),
    P("Jakub Kiwior", "Poland", "PL", "2000-02-15", 189, 79, "DEF", 15, 0, 0, 12, 3, 2, 0, 900, 6.6, 18),
    P("Riccardo Calafiori", "Italy", "IT", "2002-05-19", 185, 80, "DEF", 33, 1, 2, 22, 5, 3, 0, 1800, 7.0, 45),
    P("Declan Rice", "England", "GB", "1999-01-14", 185, 80, "MID", 41, 6, 8, 33, 0, 7, 0, 2970, 8.1, 110),
    P("Martin Ødegaard", "Norway", "NO", "1998-12-17", 178, 68, "MID", 8, 8, 11, 28, 0, 3, 0, 2380, 8.3, 120),
    P("Thomas Partey", "Ghana", "GH", "1993-06-13", 185, 77, "MID", 5, 2, 2, 20, 0, 4, 0, 1600, 7.0, 20),
    P("Jorginho", "Italy", "IT", "1991-12-20", 180, 65, "MID", 20, 1, 3, 24, 0, 5, 0, 1800, 6.9, 12),
    P("Fabio Vieira", "Portugal", "PT", "2000-05-30", 170, 63, "MID", 21, 1, 2, 10, 0, 1, 0, 650, 6.5, 15),
    P("Ethan Nwaneri", "England", "GB", "2007-03-21", 175, 65, "MID", 53, 3, 2, 16, 0, 1, 0, 1050, 7.1, 30),
    P("Mikel Merino", "Spain", "ES", "1996-06-22", 189, 80, "MID", 23, 3, 4, 26, 0, 5, 0, 2100, 7.3, 40),
    P("Bukayo Saka", "England", "GB", "2001-09-05", 178, 72, "FWD", 7, 16, 13, 33, 0, 3, 0, 2900, 8.5, 140),
    P("Gabriel Martinelli", "Brazil", "BR", "2001-06-18", 178, 75, "FWD", 11, 8, 5, 30, 0, 4, 0, 2200, 7.3, 65, "Left"),
    P("Leandro Trossard", "Belgium", "BE", "1994-12-04", 172, 61, "FWD", 19, 10, 4, 32, 0, 3, 0, 1900, 7.4, 35, "Left"),
    P("Kai Havertz", "Germany", "DE", "1999-06-11", 193, 83, "FWD", 29, 14, 6, 34, 0, 5, 0, 2850, 7.6, 70),
    P("Gabriel Jesus", "Brazil", "BR", "1997-04-03", 175, 73, "FWD", 9, 6, 4, 22, 0, 2, 0, 1500, 7.0, 40),
    P("Raheem Sterling", "England", "GB", "1994-12-08", 170, 69, "FWD", 30, 3, 2, 15, 0, 1, 0, 900, 6.5, 15),
  ],
  AVL: [
    P("Emiliano Martínez", "Argentina", "AR", "1992-09-02", 195, 88, "GK", 1, 0, 0, 33, 11, 2, 0, 2970, 7.5, 35),
    P("Robin Olsen", "Sweden", "SE", "1990-01-08", 198, 86, "GK", 25, 0, 0, 2, 0, 0, 0, 180, 6.2, 2),
    P("Ezri Konsa", "England", "GB", "1997-10-23", 183, 77, "DEF", 4, 2, 1, 28, 8, 4, 0, 2400, 7.1, 35),
    P("Pau Torres", "Spain", "ES", "1997-01-16", 191, 78, "DEF", 14, 1, 1, 30, 9, 3, 0, 2650, 7.3, 45),
    P("Diego Carlos", "Brazil", "BR", "1993-03-15", 186, 78, "DEF", 3, 1, 0, 20, 5, 4, 0, 1700, 6.8, 15),
    P("Lucas Digne", "France", "FR", "1993-07-20", 178, 74, "DEF", 12, 1, 5, 26, 5, 3, 0, 2200, 7.0, 12, "Left"),
    P("Matty Cash", "Poland", "PL", "1997-08-07", 185, 77, "DEF", 2, 1, 3, 24, 4, 4, 0, 2050, 6.9, 25),
    P("Ian Maatsen", "Netherlands", "NL", "2002-03-10", 178, 72, "DEF", 22, 1, 3, 22, 3, 2, 0, 1800, 7.0, 30, "Left"),
    P("Lamare Bogarde", "England", "GB", "2004-05-19", 183, 75, "DEF", 44, 0, 0, 8, 1, 1, 0, 500, 6.4, 5),
    P("Boubacar Kamara", "France", "FR", "1999-11-23", 184, 72, "MID", 44, 1, 2, 20, 0, 4, 0, 1700, 7.0, 30),
    P("Youri Tielemans", "Belgium", "BE", "1997-05-07", 176, 70, "MID", 8, 5, 7, 32, 0, 5, 0, 2750, 7.4, 30),
    P("John McGinn", "Scotland", "GB", "1994-10-18", 179, 70, "MID", 7, 4, 5, 30, 0, 6, 0, 2500, 7.1, 25),
    P("Jacob Ramsey", "England", "GB", "2001-05-28", 180, 72, "MID", 41, 3, 4, 22, 0, 3, 0, 1600, 7.0, 30),
    P("Ross Barkley", "England", "GB", "1993-12-05", 189, 80, "MID", 6, 2, 3, 18, 0, 3, 0, 1300, 6.8, 5),
    P("Amadou Onana", "Belgium", "BE", "2001-08-16", 195, 83, "MID", 24, 3, 2, 28, 0, 6, 0, 2300, 7.2, 45),
    P("Ollie Watkins", "England", "GB", "1995-12-30", 180, 70, "FWD", 11, 16, 10, 34, 0, 3, 0, 2950, 7.9, 60),
    P("Jhon Durán", "Colombia", "CO", "2003-12-13", 185, 78, "FWD", 9, 10, 2, 28, 0, 2, 0, 1600, 7.3, 40),
    P("Leon Bailey", "Jamaica", "JM", "1997-08-09", 178, 72, "FWD", 31, 6, 7, 26, 0, 2, 0, 1800, 7.1, 25),
    P("Morgan Rogers", "England", "GB", "2002-07-26", 185, 75, "FWD", 27, 5, 6, 30, 0, 3, 0, 2400, 7.2, 35),
    P("Moussa Diaby", "France", "FR", "1999-07-07", 170, 67, "FWD", 19, 4, 3, 16, 0, 1, 0, 1100, 6.7, 40),
  ],
  BOU: [
    P("Neto", "Brazil", "BR", "1989-07-19", 190, 83, "GK", 1, 0, 0, 32, 8, 1, 0, 2880, 7.0, 5),
    P("Mark Travers", "Ireland", "IE", "1999-05-18", 188, 82, "GK", 42, 0, 0, 3, 0, 0, 0, 270, 6.2, 3),
    P("Milos Kerkez", "Hungary", "HU", "2003-11-07", 183, 78, "DEF", 3, 1, 4, 30, 5, 4, 0, 2600, 7.1, 30, "Left"),
    P("Illia Zabarnyi", "Ukraine", "UA", "2002-09-01", 189, 82, "DEF", 27, 2, 0, 31, 8, 3, 0, 2790, 7.2, 30),
    P("Marcos Senesi", "Argentina", "AR", "1997-05-10", 185, 78, "DEF", 25, 1, 0, 22, 4, 5, 0, 1800, 6.8, 12),
    P("Adam Smith", "England", "GB", "1991-04-29", 175, 74, "DEF", 15, 0, 1, 14, 2, 2, 0, 1100, 6.5, 3),
    P("Dean Huijsen", "Spain", "ES", "2005-04-12", 195, 85, "DEF", 34, 1, 0, 20, 4, 3, 0, 1600, 6.9, 20),
    P("Lewis Cook", "England", "GB", "1997-02-03", 175, 68, "MID", 4, 2, 3, 28, 0, 4, 0, 2200, 7.0, 10),
    P("Ryan Christie", "Scotland", "GB", "1995-02-22", 180, 73, "MID", 10, 4, 5, 26, 0, 3, 0, 2000, 7.0, 8),
    P("Tyler Adams", "USA", "US", "1999-02-14", 175, 63, "MID", 14, 1, 2, 18, 0, 3, 0, 1400, 6.8, 15),
    P("Philip Billing", "Denmark", "DK", "1996-06-11", 193, 82, "MID", 29, 3, 4, 24, 0, 4, 0, 1800, 6.9, 12),
    P("Alex Scott", "England", "GB", "2003-08-14", 178, 72, "MID", 32, 2, 3, 20, 0, 2, 0, 1500, 7.0, 15),
    P("Justin Kluivert", "Netherlands", "NL", "1999-05-05", 173, 68, "FWD", 17, 8, 6, 30, 0, 3, 0, 2400, 7.3, 25, "Left"),
    P("Antoine Semenyo", "Ghana", "GH", "2000-01-07", 175, 73, "FWD", 24, 9, 4, 31, 0, 4, 0, 2500, 7.2, 25),
    P("Evanilson", "Brazil", "BR", "1999-10-06", 184, 78, "FWD", 9, 7, 3, 26, 0, 2, 0, 1900, 7.0, 30),
    P("Dango Ouattara", "Burkina Faso", "BF", "2002-02-11", 172, 68, "FWD", 11, 5, 3, 22, 0, 2, 0, 1400, 6.8, 18),
    P("Marcus Tavernier", "England", "GB", "1999-03-22", 175, 70, "MID", 16, 3, 5, 28, 0, 3, 0, 2200, 7.0, 12),
    P("Enes Ünal", "Turkey", "TR", "1997-05-10", 188, 82, "FWD", 22, 3, 1, 14, 0, 1, 0, 800, 6.5, 8),
  ],
  BRE: [
    P("Mark Flekken", "Netherlands", "NL", "1993-06-13", 194, 88, "GK", 1, 0, 0, 32, 9, 1, 0, 2880, 7.0, 10),
    P("Ethan Pinnock", "Jamaica", "JM", "1993-05-29", 195, 90, "DEF", 5, 2, 0, 28, 8, 3, 0, 2400, 7.0, 10),
    P("Nathan Collins", "Ireland", "IE", "2001-04-30", 193, 85, "DEF", 22, 2, 1, 30, 9, 5, 0, 2650, 7.2, 22),
    P("Kristoffer Ajer", "Norway", "NO", "1998-04-17", 195, 90, "DEF", 20, 0, 1, 22, 5, 3, 0, 1800, 6.8, 12),
    P("Sepp van den Berg", "Netherlands", "NL", "2001-12-20", 193, 84, "DEF", 24, 1, 0, 20, 4, 2, 0, 1650, 6.9, 15),
    P("Rico Henry", "England", "GB", "1997-07-08", 170, 68, "DEF", 3, 0, 2, 12, 2, 1, 0, 900, 6.7, 12, "Left"),
    P("Aaron Hickey", "Scotland", "GB", "2002-06-10", 179, 72, "DEF", 2, 0, 2, 18, 3, 2, 0, 1400, 6.8, 15),
    P("Mads Roerslev", "Denmark", "DK", "1999-06-24", 181, 77, "DEF", 17, 0, 2, 20, 3, 3, 0, 1600, 6.8, 8),
    P("Vitaly Janelt", "Germany", "DE", "1998-05-10", 189, 82, "MID", 27, 2, 2, 24, 0, 4, 0, 1900, 6.9, 10),
    P("Christian Nørgaard", "Denmark", "DK", "1994-03-10", 185, 79, "MID", 6, 1, 1, 26, 0, 5, 0, 2100, 6.8, 5),
    P("Mathias Jensen", "Denmark", "DK", "1996-01-01", 180, 70, "MID", 8, 3, 6, 30, 0, 3, 0, 2400, 7.1, 10),
    P("Mikkel Damsgaard", "Denmark", "DK", "2000-07-03", 180, 65, "MID", 24, 4, 5, 26, 0, 2, 0, 1900, 7.1, 18, "Left"),
    P("Frank Onyeka", "Nigeria", "NG", "1997-12-01", 183, 78, "MID", 15, 1, 2, 20, 0, 4, 0, 1400, 6.7, 8),
    P("Bryan Mbeumo", "Cameroon", "CM", "1999-08-07", 175, 69, "FWD", 19, 15, 8, 33, 0, 3, 0, 2850, 7.8, 50),
    P("Yoane Wissa", "DR Congo", "CD", "1996-09-03", 177, 73, "FWD", 11, 12, 4, 30, 0, 4, 0, 2300, 7.4, 25),
    P("Kevin Schade", "Germany", "DE", "2001-11-27", 181, 74, "FWD", 7, 5, 3, 24, 0, 1, 0, 1500, 6.9, 18),
    P("Igor Thiago", "Brazil", "BR", "2001-02-03", 188, 83, "FWD", 9, 4, 1, 16, 0, 1, 0, 1000, 6.8, 20),
    P("Fabio Carvalho", "Portugal", "PT", "2002-08-30", 170, 60, "MID", 28, 3, 4, 22, 0, 1, 0, 1400, 7.0, 15),
  ],
  BHA: [
    P("Bart Verbruggen", "Netherlands", "NL", "2002-08-18", 193, 86, "GK", 1, 0, 0, 32, 8, 1, 0, 2880, 7.0, 20),
    P("Lewis Dunk", "England", "GB", "1991-11-21", 192, 88, "DEF", 5, 2, 0, 28, 7, 5, 0, 2450, 7.0, 10),
    P("Jan Paul van Hecke", "Netherlands", "NL", "1999-06-08", 187, 80, "DEF", 29, 1, 0, 26, 6, 4, 0, 2250, 6.9, 15),
    P("Igor Julio", "Brazil", "BR", "1998-02-07", 186, 79, "DEF", 4, 0, 0, 20, 4, 3, 0, 1650, 6.7, 10),
    P("Pervis Estupiñán", "Ecuador", "EC", "1998-01-21", 175, 67, "DEF", 30, 2, 5, 24, 4, 3, 0, 2000, 7.1, 25, "Left"),
    P("Tariq Lamptey", "England", "GB", "2000-09-30", 163, 62, "DEF", 2, 0, 3, 22, 3, 2, 0, 1700, 6.8, 15),
    P("Joel Veltman", "Netherlands", "NL", "1992-01-15", 182, 76, "DEF", 34, 0, 1, 18, 3, 3, 0, 1400, 6.6, 3),
    P("James Milner", "England", "GB", "1986-01-04", 175, 70, "MID", 37, 0, 1, 14, 0, 2, 0, 900, 6.4, 1),
    P("Carlos Baleba", "Cameroon", "CM", "2003-12-10", 185, 78, "MID", 45, 1, 2, 26, 0, 3, 0, 2000, 7.0, 25),
    P("Mats Wieffer", "Netherlands", "NL", "1999-11-16", 189, 78, "MID", 6, 1, 3, 22, 0, 4, 0, 1750, 7.0, 25),
    P("Yankuba Minteh", "Gambia", "GM", "2004-12-08", 173, 67, "FWD", 40, 5, 4, 24, 0, 2, 0, 1700, 7.0, 22),
    P("Kaoru Mitoma", "Japan", "JP", "1997-05-20", 178, 68, "FWD", 22, 8, 6, 28, 0, 2, 0, 2200, 7.4, 40, "Left"),
    P("João Pedro", "Brazil", "BR", "2001-09-26", 183, 73, "FWD", 9, 10, 5, 30, 0, 3, 0, 2400, 7.3, 40),
    P("Danny Welbeck", "England", "GB", "1990-11-26", 185, 73, "FWD", 18, 7, 3, 26, 0, 2, 0, 1800, 7.0, 5),
    P("Simon Adingra", "Ivory Coast", "CI", "2002-01-01", 175, 65, "FWD", 7, 4, 5, 24, 0, 1, 0, 1600, 7.0, 22),
    P("Georginio Rutter", "France", "FR", "2002-04-20", 181, 72, "FWD", 10, 3, 6, 22, 0, 2, 0, 1500, 6.9, 25),
    P("Brajan Gruda", "Germany", "DE", "2004-05-19", 186, 75, "MID", 14, 2, 3, 18, 0, 1, 0, 1200, 6.8, 20),
    P("Ferdi Kadıoğlu", "Turkey", "TR", "1999-10-07", 177, 72, "DEF", 3, 1, 4, 28, 4, 3, 0, 2400, 7.2, 30, "Left"),
  ],
  CHE: [
    P("Robert Sánchez", "Spain", "ES", "1997-11-18", 197, 90, "GK", 1, 0, 0, 28, 8, 2, 0, 2520, 6.8, 20),
    P("Filip Jörgensen", "Sweden", "SE", "2002-04-15", 189, 82, "GK", 30, 0, 0, 6, 1, 0, 0, 540, 6.5, 10),
    P("Wesley Fofana", "France", "FR", "2000-12-17", 190, 84, "DEF", 33, 1, 0, 18, 4, 2, 0, 1500, 7.0, 45),
    P("Levi Colwill", "England", "GB", "2003-02-26", 187, 78, "DEF", 6, 1, 1, 30, 8, 3, 0, 2600, 7.2, 45, "Left"),
    P("Marc Cucurella", "Spain", "ES", "1998-07-22", 172, 66, "DEF", 3, 0, 4, 30, 7, 5, 0, 2600, 7.0, 25, "Left"),
    P("Axel Disasi", "France", "FR", "1998-03-11", 190, 85, "DEF", 2, 1, 0, 22, 4, 4, 0, 1800, 6.7, 20),
    P("Malo Gusto", "France", "FR", "2003-05-19", 178, 72, "DEF", 27, 1, 3, 28, 5, 3, 0, 2300, 7.1, 35),
    P("Benoît Badiashile", "France", "FR", "2001-03-26", 194, 89, "DEF", 4, 0, 0, 14, 2, 2, 0, 1100, 6.5, 15),
    P("Reece James", "England", "GB", "1999-12-08", 182, 82, "DEF", 24, 0, 1, 8, 1, 1, 0, 550, 6.5, 20),
    P("Moisés Caicedo", "Ecuador", "EC", "2001-11-02", 178, 72, "MID", 25, 3, 4, 33, 0, 8, 0, 2900, 7.5, 80),
    P("Enzo Fernández", "Argentina", "AR", "2001-01-17", 178, 77, "MID", 8, 4, 7, 32, 0, 5, 0, 2750, 7.4, 70),
    P("Romeo Lavia", "Belgium", "BE", "2004-01-06", 181, 69, "MID", 45, 1, 2, 20, 0, 3, 0, 1500, 7.0, 40),
    P("Kiernan Dewsbury-Hall", "England", "GB", "1998-09-06", 180, 73, "MID", 22, 3, 4, 22, 0, 2, 0, 1500, 6.9, 20),
    P("Cole Palmer", "England", "GB", "2002-05-06", 185, 70, "FWD", 20, 20, 12, 33, 0, 2, 0, 2900, 8.6, 130),
    P("Noni Madueke", "England", "GB", "2002-03-10", 178, 69, "FWD", 11, 10, 6, 30, 0, 3, 0, 2400, 7.5, 50),
    P("Nicolas Jackson", "Senegal", "SN", "2001-06-20", 182, 72, "FWD", 15, 13, 5, 32, 0, 4, 0, 2600, 7.3, 45),
    P("Christopher Nkunku", "France", "FR", "1997-11-14", 175, 73, "FWD", 18, 8, 5, 22, 0, 2, 0, 1500, 7.2, 50),
    P("Mykhaylo Mudryk", "Ukraine", "UA", "2001-01-05", 175, 65, "FWD", 10, 3, 3, 20, 0, 1, 0, 1200, 6.6, 25, "Left"),
    P("Pedro Neto", "Portugal", "PT", "2000-03-09", 175, 64, "FWD", 7, 5, 7, 26, 0, 2, 0, 1900, 7.1, 50, "Left"),
    P("João Félix", "Portugal", "PT", "1999-11-10", 181, 68, "FWD", 14, 6, 3, 18, 0, 2, 0, 1200, 7.0, 25),
  ],
  CRY: [
    P("Dean Henderson", "England", "GB", "1997-03-12", 188, 85, "GK", 1, 0, 0, 32, 7, 1, 0, 2880, 7.0, 15),
    P("Sam Johnstone", "England", "GB", "1993-03-25", 191, 82, "GK", 32, 0, 0, 3, 0, 0, 0, 270, 6.2, 3),
    P("Marc Guéhi", "England", "GB", "2000-07-13", 182, 75, "DEF", 6, 1, 0, 30, 7, 3, 0, 2650, 7.3, 50),
    P("Joachim Andersen", "Denmark", "DK", "1996-05-31", 192, 87, "DEF", 4, 1, 0, 28, 6, 5, 0, 2400, 7.0, 18),
    P("Chris Richards", "USA", "US", "2000-03-28", 188, 80, "DEF", 26, 0, 0, 16, 3, 2, 0, 1250, 6.7, 8),
    P("Tyrick Mitchell", "England", "GB", "1999-09-01", 176, 68, "DEF", 3, 0, 3, 26, 4, 3, 0, 2200, 6.9, 15, "Left"),
    P("Daniel Muñoz", "Colombia", "CO", "1996-05-25", 180, 75, "DEF", 22, 3, 2, 28, 4, 6, 1, 2400, 7.0, 15),
    P("Nathaniel Clyne", "England", "GB", "1991-04-05", 175, 68, "DEF", 17, 0, 1, 10, 1, 1, 0, 700, 6.3, 1),
    P("Cheick Doucouré", "Mali", "ML", "2000-01-08", 182, 74, "MID", 28, 2, 3, 26, 0, 6, 0, 2200, 7.1, 20),
    P("Adam Wharton", "England", "GB", "2004-10-04", 180, 72, "MID", 10, 2, 5, 28, 0, 3, 0, 2300, 7.3, 30),
    P("Daichi Kamada", "Japan", "JP", "1996-08-05", 183, 72, "MID", 18, 4, 4, 24, 0, 2, 0, 1800, 7.0, 15),
    P("Jefferson Lerma", "Colombia", "CO", "1994-10-25", 180, 76, "MID", 8, 1, 2, 22, 0, 5, 0, 1700, 6.8, 5),
    P("Eberechi Eze", "England", "GB", "1998-06-29", 178, 70, "MID", 7, 10, 6, 30, 0, 2, 0, 2500, 7.6, 55),
    P("Michael Olise", "France", "FR", "2001-12-12", 185, 72, "FWD", 0, 0, 0, 0, 0, 0, 0, 0, 0, 60),
    P("Jean-Philippe Mateta", "France", "FR", "1997-06-28", 192, 83, "FWD", 14, 14, 3, 32, 0, 3, 0, 2600, 7.5, 30),
    P("Eddie Nketiah", "England", "GB", "1999-05-30", 175, 72, "FWD", 9, 6, 2, 24, 0, 2, 0, 1600, 6.9, 20),
    P("Ismaïla Sarr", "Senegal", "SN", "1998-02-25", 185, 76, "FWD", 23, 5, 4, 22, 0, 3, 0, 1500, 6.8, 15),
    P("Trevoh Chalobah", "England", "GB", "1999-07-05", 191, 83, "DEF", 15, 1, 0, 18, 3, 2, 0, 1400, 6.8, 15),
  ],
  EVE: [
    P("Jordan Pickford", "England", "GB", "1994-03-07", 185, 77, "GK", 1, 0, 0, 34, 8, 2, 0, 3060, 7.1, 18),
    P("João Virginia", "Portugal", "PT", "1999-10-10", 191, 85, "GK", 12, 0, 0, 1, 0, 0, 0, 90, 6.0, 2),
    P("James Tarkowski", "England", "GB", "1992-11-19", 185, 80, "DEF", 2, 2, 0, 34, 8, 5, 0, 3060, 7.0, 5),
    P("Jarrad Branthwaite", "England", "GB", "2002-06-27", 195, 85, "DEF", 32, 1, 0, 20, 5, 2, 0, 1700, 7.2, 45),
    P("Michael Keane", "England", "GB", "1993-01-11", 188, 84, "DEF", 5, 0, 0, 14, 2, 2, 0, 1100, 6.4, 3),
    P("Vitalii Mykolenko", "Ukraine", "UA", "1999-05-29", 180, 73, "DEF", 19, 0, 3, 28, 5, 4, 0, 2400, 6.8, 12, "Left"),
    P("Ashley Young", "England", "GB", "1985-07-09", 175, 65, "DEF", 18, 0, 1, 22, 3, 3, 0, 1700, 6.4, 1),
    P("Nathan Patterson", "Scotland", "GB", "2001-10-16", 180, 72, "DEF", 3, 0, 1, 14, 1, 2, 0, 1000, 6.5, 8),
    P("Seamus Coleman", "Ireland", "IE", "1988-10-11", 177, 73, "DEF", 23, 0, 0, 8, 0, 1, 0, 500, 6.2, 1),
    P("Amadou Onana", "Belgium", "BE", "2001-08-16", 195, 83, "MID", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    P("Idrissa Gueye", "Senegal", "SN", "1989-09-26", 174, 66, "MID", 27, 1, 2, 28, 0, 6, 0, 2300, 6.8, 3),
    P("Abdoulaye Doucouré", "Mali", "ML", "1993-01-01", 183, 80, "MID", 16, 2, 2, 26, 0, 4, 0, 2050, 6.7, 5),
    P("James Garner", "England", "GB", "2001-03-13", 183, 73, "MID", 4, 1, 3, 24, 0, 3, 0, 1800, 6.8, 10),
    P("Tim Iroegbunam", "England", "GB", "2003-06-30", 181, 75, "MID", 8, 1, 1, 16, 0, 2, 0, 1100, 6.6, 8),
    P("Jack Harrison", "England", "GB", "1996-11-20", 180, 67, "FWD", 11, 4, 4, 28, 0, 2, 0, 2100, 6.9, 10, "Left"),
    P("Dwight McNeil", "England", "GB", "1999-11-22", 178, 66, "FWD", 7, 5, 6, 32, 0, 3, 0, 2600, 7.1, 18, "Left"),
    P("Dominic Calvert-Lewin", "England", "GB", "1997-03-16", 187, 71, "FWD", 9, 7, 2, 26, 0, 3, 0, 1900, 6.9, 15),
    P("Beto", "Portugal", "PT", "1998-01-31", 194, 89, "FWD", 14, 4, 1, 18, 0, 2, 0, 1100, 6.5, 10),
    P("Iliman Ndiaye", "Senegal", "SN", "2000-03-06", 178, 70, "FWD", 10, 5, 3, 24, 0, 2, 0, 1700, 7.0, 15),
  ],
  FUL: [
    P("Bernd Leno", "Germany", "DE", "1992-03-04", 190, 83, "GK", 1, 0, 0, 34, 9, 1, 0, 3060, 7.2, 8),
    P("Antonee Robinson", "USA", "US", "1997-08-08", 183, 68, "DEF", 33, 2, 6, 34, 6, 3, 0, 3000, 7.3, 30, "Left"),
    P("Kenny Tete", "Netherlands", "NL", "1995-10-09", 180, 71, "DEF", 2, 0, 2, 22, 3, 2, 0, 1800, 6.8, 5),
    P("Calvin Bassey", "Nigeria", "NG", "1999-12-31", 185, 80, "DEF", 3, 1, 0, 26, 5, 3, 0, 2200, 6.9, 18),
    P("Issa Diop", "France", "FR", "1997-01-09", 194, 87, "DEF", 31, 1, 0, 24, 5, 4, 0, 2050, 6.7, 8),
    P("Tim Ream", "USA", "US", "1987-10-05", 185, 80, "DEF", 13, 0, 1, 20, 3, 3, 0, 1650, 6.5, 1, "Left"),
    P("Jorge Cuenca", "Spain", "ES", "1999-12-17", 191, 82, "DEF", 24, 0, 0, 14, 2, 2, 0, 1050, 6.5, 5),
    P("Harrison Reed", "England", "GB", "1995-01-27", 180, 68, "MID", 6, 1, 2, 24, 0, 5, 0, 1900, 6.7, 5),
    P("Sasa Lukić", "Serbia", "RS", "1996-08-13", 185, 78, "MID", 28, 3, 4, 30, 0, 4, 0, 2500, 7.0, 12),
    P("Andreas Pereira", "Brazil", "BR", "1996-01-01", 177, 67, "MID", 18, 5, 5, 28, 0, 3, 0, 2200, 7.1, 15),
    P("Tom Cairney", "Scotland", "GB", "1991-01-20", 185, 75, "MID", 10, 1, 2, 18, 0, 2, 0, 1200, 6.6, 2),
    P("Emile Smith Rowe", "England", "GB", "2000-07-28", 182, 66, "MID", 7, 6, 5, 26, 0, 2, 0, 2000, 7.2, 25),
    P("Alex Iwobi", "Nigeria", "NG", "1996-05-03", 183, 75, "MID", 17, 4, 6, 32, 0, 3, 0, 2600, 7.1, 15),
    P("Rodrigo Muniz", "Brazil", "BR", "2001-05-04", 183, 76, "FWD", 9, 12, 3, 32, 0, 3, 0, 2600, 7.3, 30),
    P("Raúl Jiménez", "Mexico", "MX", "1991-05-05", 187, 81, "FWD", 21, 6, 2, 24, 0, 3, 0, 1600, 6.8, 5),
    P("Adama Traoré", "Spain", "ES", "1996-01-25", 178, 72, "FWD", 11, 2, 3, 18, 0, 1, 0, 1100, 6.6, 8),
    P("Harry Wilson", "Wales", "GB", "1997-03-22", 178, 68, "FWD", 8, 4, 5, 24, 0, 2, 0, 1700, 6.9, 8),
    P("Reiss Nelson", "England", "GB", "1999-12-10", 175, 65, "FWD", 22, 2, 3, 16, 0, 1, 0, 1000, 6.6, 8),
  ],
  IPS: [
    P("Ari Muric", "Kosovo", "XK", "1998-11-07", 194, 86, "GK", 1, 0, 0, 30, 5, 1, 0, 2700, 6.5, 5),
    P("Christian Walton", "England", "GB", "1995-11-09", 190, 83, "GK", 13, 0, 0, 4, 0, 0, 0, 360, 6.0, 1),
    P("Luke Woolfenden", "England", "GB", "1999-09-21", 185, 78, "DEF", 6, 1, 0, 24, 3, 3, 0, 2000, 6.6, 5),
    P("Cameron Burgess", "Australia", "AU", "1995-10-21", 193, 85, "DEF", 5, 1, 0, 22, 3, 4, 0, 1800, 6.5, 3),
    P("Leif Davis", "England", "GB", "1999-12-31", 175, 68, "DEF", 3, 1, 6, 28, 3, 2, 0, 2400, 7.0, 10, "Left"),
    P("Ben Johnson", "England", "GB", "2000-01-24", 176, 68, "DEF", 24, 0, 2, 22, 2, 2, 0, 1750, 6.6, 5),
    P("Axel Tuanzebe", "DR Congo", "CD", "1997-11-14", 185, 80, "DEF", 4, 0, 0, 16, 2, 3, 0, 1200, 6.4, 3),
    P("Dara O'Shea", "Ireland", "IE", "1999-03-04", 190, 82, "DEF", 15, 2, 0, 26, 4, 3, 0, 2200, 6.8, 10),
    P("Sam Morsy", "Egypt", "EG", "1991-09-10", 175, 72, "MID", 5, 1, 2, 30, 0, 7, 0, 2500, 6.7, 3),
    P("Massimo Luongo", "Australia", "AU", "1992-09-25", 175, 74, "MID", 21, 1, 1, 20, 0, 4, 0, 1500, 6.4, 1),
    P("Jens Cajuste", "Sweden", "SE", "1999-08-10", 187, 76, "MID", 8, 1, 2, 18, 0, 3, 0, 1300, 6.5, 8),
    P("Omari Hutchinson", "England", "GB", "2003-11-28", 175, 66, "FWD", 20, 5, 5, 28, 0, 2, 0, 2200, 7.0, 15),
    P("Liam Delap", "England", "GB", "2003-02-08", 185, 78, "FWD", 19, 10, 3, 30, 0, 3, 0, 2400, 7.2, 25),
    P("Sammie Szmodics", "Ireland", "IE", "1995-09-24", 168, 68, "FWD", 23, 6, 3, 26, 0, 4, 0, 1900, 6.8, 8),
    P("Chiedozie Ogbene", "Ireland", "IE", "1997-05-01", 180, 74, "FWD", 11, 3, 2, 22, 0, 2, 0, 1400, 6.5, 5),
    P("Nathan Broadhead", "Wales", "GB", "1998-04-05", 180, 72, "FWD", 17, 3, 1, 16, 0, 1, 0, 1000, 6.4, 3),
    P("Conor Chaplin", "England", "GB", "1997-02-14", 175, 70, "FWD", 10, 4, 3, 24, 0, 3, 0, 1700, 6.7, 3),
    P("Jack Clarke", "England", "GB", "2000-11-23", 175, 67, "FWD", 7, 5, 6, 28, 0, 2, 0, 2200, 7.1, 15, "Left"),
    P("Kalvin Phillips", "England", "GB", "1995-12-02", 178, 72, "MID", 14, 0, 1, 12, 0, 2, 0, 800, 6.3, 10),
  ],
  LEI: [
    P("Mads Hermansen", "Denmark", "DK", "2000-07-12", 193, 85, "GK", 1, 0, 0, 32, 6, 1, 0, 2880, 6.8, 12),
    P("Danny Ward", "Wales", "GB", "1993-06-22", 191, 83, "GK", 12, 0, 0, 2, 0, 0, 0, 180, 6.0, 1),
    P("Wout Faes", "Belgium", "BE", "1998-04-03", 187, 82, "DEF", 3, 1, 0, 30, 5, 5, 0, 2650, 6.8, 12),
    P("Jannik Vestergaard", "Denmark", "DK", "1992-08-03", 199, 98, "DEF", 23, 2, 0, 20, 3, 3, 0, 1600, 6.5, 3),
    P("James Justin", "England", "GB", "1998-02-23", 183, 73, "DEF", 2, 1, 2, 26, 3, 3, 0, 2200, 6.8, 12),
    P("Ricardo Pereira", "Portugal", "PT", "1993-10-06", 173, 70, "DEF", 21, 1, 3, 24, 2, 2, 0, 1900, 6.7, 5),
    P("Victor Kristiansen", "Denmark", "DK", "2002-12-16", 179, 68, "DEF", 16, 0, 3, 22, 3, 2, 0, 1750, 6.7, 12, "Left"),
    P("Conor Coady", "England", "GB", "1993-02-25", 185, 76, "DEF", 5, 0, 0, 14, 1, 2, 0, 1050, 6.3, 2),
    P("Wilfred Ndidi", "Nigeria", "NG", "1996-12-16", 183, 74, "MID", 25, 2, 2, 28, 0, 7, 0, 2300, 6.9, 15),
    P("Harry Winks", "England", "GB", "1996-02-02", 178, 64, "MID", 8, 2, 4, 26, 0, 3, 0, 2000, 6.8, 5),
    P("Hamza Choudhury", "England", "GB", "1997-10-01", 178, 70, "MID", 20, 0, 1, 12, 0, 3, 0, 800, 6.3, 3),
    P("Kiernan Dewsbury-Hall", "England", "GB", "1998-09-06", 180, 73, "MID", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    P("Stephy Mavididi", "England", "GB", "1998-05-31", 178, 72, "FWD", 9, 6, 4, 28, 0, 3, 0, 2100, 6.9, 12),
    P("Jamie Vardy", "England", "GB", "1987-01-11", 179, 74, "FWD", 11, 8, 3, 26, 0, 3, 0, 1800, 7.0, 3),
    P("Patson Daka", "Zambia", "ZM", "1998-10-09", 183, 72, "FWD", 20, 5, 2, 20, 0, 1, 0, 1300, 6.7, 10),
    P("Facundo Buonanotte", "Argentina", "AR", "2004-12-23", 172, 65, "MID", 7, 4, 5, 26, 0, 2, 0, 1900, 7.1, 18),
    P("Bobby De Cordova-Reid", "Jamaica", "JM", "1993-02-02", 174, 70, "FWD", 14, 3, 2, 22, 0, 2, 0, 1500, 6.6, 3),
    P("Abdul Fatawu", "Ghana", "GH", "2004-01-09", 180, 70, "FWD", 17, 5, 6, 28, 0, 2, 0, 2100, 7.0, 15),
  ],
  LIV: [
    P("Alisson Becker", "Brazil", "BR", "1992-10-02", 191, 91, "GK", 1, 0, 0, 30, 14, 1, 0, 2700, 7.5, 35),
    P("Caoimhín Kelleher", "Ireland", "IE", "1998-11-23", 188, 83, "GK", 62, 0, 0, 6, 2, 0, 0, 540, 6.8, 15),
    P("Virgil van Dijk", "Netherlands", "NL", "1991-07-08", 195, 92, "DEF", 4, 3, 1, 33, 14, 3, 0, 2970, 7.8, 25),
    P("Ibrahima Konaté", "France", "FR", "1999-05-25", 194, 89, "DEF", 5, 2, 0, 26, 10, 2, 0, 2250, 7.3, 55),
    P("Joe Gomez", "England", "GB", "1997-05-23", 188, 77, "DEF", 2, 0, 1, 20, 5, 2, 0, 1600, 6.8, 20),
    P("Jarell Quansah", "England", "GB", "2003-01-29", 190, 82, "DEF", 78, 0, 0, 12, 3, 1, 0, 900, 6.6, 15),
    P("Trent Alexander-Arnold", "England", "GB", "1998-10-07", 175, 69, "DEF", 66, 3, 12, 32, 10, 3, 0, 2800, 7.8, 80),
    P("Andrew Robertson", "Scotland", "GB", "1994-03-11", 178, 64, "DEF", 26, 1, 8, 28, 8, 4, 0, 2400, 7.2, 20, "Left"),
    P("Konstantinos Tsimikas", "Greece", "GR", "1996-05-12", 178, 72, "DEF", 21, 0, 3, 12, 2, 1, 0, 850, 6.7, 10, "Left"),
    P("Ryan Gravenberch", "Netherlands", "NL", "2002-05-16", 190, 80, "MID", 38, 4, 5, 34, 0, 4, 0, 3000, 7.6, 50),
    P("Alexis Mac Allister", "Argentina", "AR", "1998-12-24", 174, 72, "MID", 10, 6, 7, 32, 0, 5, 0, 2750, 7.7, 65),
    P("Dominik Szoboszlai", "Hungary", "HU", "2000-10-25", 186, 79, "MID", 8, 5, 6, 30, 0, 4, 0, 2500, 7.3, 55),
    P("Curtis Jones", "England", "GB", "2001-01-30", 185, 75, "MID", 17, 3, 3, 24, 0, 3, 0, 1800, 7.0, 20),
    P("Harvey Elliott", "England", "GB", "2003-04-04", 170, 60, "MID", 19, 3, 5, 22, 0, 2, 0, 1500, 7.0, 25),
    P("Wataru Endo", "Japan", "JP", "1993-02-09", 178, 76, "MID", 3, 1, 1, 14, 0, 3, 0, 1000, 6.6, 10),
    P("Mohamed Salah", "Egypt", "EG", "1992-06-15", 175, 71, "FWD", 11, 24, 13, 34, 0, 1, 0, 3000, 8.7, 80, "Left"),
    P("Luis Díaz", "Colombia", "CO", "1997-01-13", 178, 67, "FWD", 7, 10, 5, 30, 0, 3, 0, 2400, 7.4, 55, "Left"),
    P("Cody Gakpo", "Netherlands", "NL", "1999-05-07", 189, 73, "FWD", 18, 12, 6, 32, 0, 2, 0, 2500, 7.5, 50, "Left"),
    P("Darwin Núñez", "Uruguay", "UY", "1999-06-24", 187, 81, "FWD", 9, 11, 4, 28, 0, 4, 1, 2100, 7.1, 55, "Left"),
    P("Diogo Jota", "Portugal", "PT", "1996-12-04", 178, 68, "FWD", 20, 8, 4, 22, 0, 2, 0, 1500, 7.2, 40, "Left"),
    P("Federico Chiesa", "Italy", "IT", "1997-10-25", 175, 70, "FWD", 14, 3, 2, 14, 0, 1, 0, 850, 6.7, 20),
  ],
  MCI: [
    P("Ederson", "Brazil", "BR", "1993-08-17", 188, 86, "GK", 31, 0, 0, 32, 12, 1, 0, 2880, 7.3, 30),
    P("Stefan Ortega", "Germany", "DE", "1992-11-06", 185, 80, "GK", 18, 0, 0, 4, 1, 0, 0, 360, 6.5, 5),
    P("Rúben Dias", "Portugal", "PT", "1997-05-14", 187, 85, "DEF", 3, 1, 0, 30, 12, 3, 0, 2650, 7.3, 65),
    P("John Stones", "England", "GB", "1994-05-28", 188, 80, "DEF", 5, 1, 1, 24, 8, 2, 0, 2000, 7.1, 25),
    P("Manuel Akanji", "Switzerland", "CH", "1995-07-19", 188, 85, "DEF", 25, 1, 0, 28, 10, 3, 0, 2400, 7.0, 30),
    P("Nathan Aké", "Netherlands", "NL", "1995-02-18", 180, 75, "DEF", 6, 1, 1, 22, 6, 2, 0, 1800, 6.9, 25, "Left"),
    P("Joško Gvardiol", "Croatia", "HR", "2002-01-23", 185, 82, "DEF", 24, 4, 3, 32, 10, 3, 0, 2800, 7.4, 70, "Left"),
    P("Kyle Walker", "England", "GB", "1990-05-28", 178, 80, "DEF", 2, 0, 2, 20, 4, 3, 0, 1600, 6.6, 8),
    P("Rico Lewis", "England", "GB", "2004-11-21", 169, 62, "DEF", 82, 2, 4, 28, 5, 2, 0, 2200, 7.2, 30),
    P("Rodri", "Spain", "ES", "1996-06-22", 191, 82, "MID", 16, 0, 0, 0, 0, 0, 0, 0, 0, 100),
    P("Kevin De Bruyne", "Belgium", "BE", "1991-06-28", 181, 76, "MID", 17, 6, 14, 24, 0, 2, 0, 1900, 8.2, 40),
    P("Bernardo Silva", "Portugal", "PT", "1994-08-10", 173, 64, "MID", 20, 7, 10, 34, 0, 3, 0, 2950, 8.0, 70),
    P("Phil Foden", "England", "GB", "2000-05-28", 171, 69, "MID", 47, 12, 8, 30, 0, 2, 0, 2400, 7.9, 110, "Left"),
    P("Mateo Kovačić", "Croatia", "HR", "1994-05-06", 176, 78, "MID", 8, 3, 4, 28, 0, 4, 0, 2300, 7.1, 20),
    P("Matheus Nunes", "Portugal", "PT", "1998-08-27", 182, 72, "MID", 27, 2, 3, 24, 0, 3, 0, 1800, 6.9, 20),
    P("James McAtee", "England", "GB", "2002-10-18", 175, 65, "MID", 87, 2, 2, 14, 0, 1, 0, 900, 6.7, 15),
    P("Erling Haaland", "Norway", "NO", "2000-07-21", 194, 88, "FWD", 9, 32, 5, 33, 0, 3, 0, 2900, 8.7, 180),
    P("Jack Grealish", "England", "GB", "1995-09-10", 180, 68, "FWD", 10, 3, 5, 22, 0, 2, 0, 1500, 6.8, 35, "Left"),
    P("Jérémy Doku", "Belgium", "BE", "2002-05-27", 173, 67, "FWD", 11, 4, 8, 28, 0, 2, 0, 2100, 7.2, 55),
    P("Savinho", "Brazil", "BR", "2004-04-10", 176, 65, "FWD", 26, 5, 7, 26, 0, 1, 0, 1900, 7.3, 40),
    P("Oscar Bobb", "Norway", "NO", "2003-08-12", 174, 64, "FWD", 52, 2, 2, 12, 0, 0, 0, 700, 6.7, 15),
  ],
  MUN: [
    P("André Onana", "Cameroon", "CM", "1996-04-02", 190, 90, "GK", 24, 0, 0, 34, 8, 1, 0, 3060, 6.9, 25),
    P("Altay Bayındır", "Turkey", "TR", "1998-04-14", 196, 88, "GK", 1, 0, 0, 2, 0, 0, 0, 180, 6.0, 5),
    P("Harry Maguire", "England", "GB", "1993-03-05", 194, 100, "DEF", 5, 2, 0, 24, 4, 5, 0, 2000, 6.7, 8),
    P("Lisandro Martínez", "Argentina", "AR", "1998-01-18", 175, 77, "DEF", 6, 1, 1, 22, 5, 5, 0, 1800, 7.1, 40, "Left"),
    P("Matthijs de Ligt", "Netherlands", "NL", "1999-08-12", 189, 89, "DEF", 4, 1, 0, 24, 5, 3, 0, 2000, 6.9, 30),
    P("Luke Shaw", "England", "GB", "1995-07-12", 185, 75, "DEF", 23, 0, 3, 14, 2, 1, 0, 1050, 6.8, 12, "Left"),
    P("Diogo Dalot", "Portugal", "PT", "1999-03-18", 183, 60, "DEF", 20, 2, 5, 34, 5, 5, 0, 3000, 7.1, 30),
    P("Noussair Mazraoui", "Morocco", "MA", "1997-11-14", 183, 73, "DEF", 3, 1, 3, 26, 4, 3, 0, 2100, 7.0, 20),
    P("Tyrell Malacia", "Netherlands", "NL", "1999-08-17", 169, 60, "DEF", 12, 0, 0, 4, 0, 0, 0, 300, 6.0, 8, "Left"),
    P("Leny Yoro", "France", "FR", "2005-11-13", 190, 78, "DEF", 15, 0, 0, 10, 2, 1, 0, 750, 6.7, 35),
    P("Casemiro", "Brazil", "BR", "1992-02-23", 185, 84, "MID", 18, 2, 2, 22, 0, 6, 0, 1700, 6.6, 8),
    P("Bruno Fernandes", "Portugal", "PT", "1994-09-08", 179, 69, "MID", 8, 10, 10, 34, 0, 7, 0, 3000, 7.5, 55),
    P("Kobbie Mainoo", "England", "GB", "2005-04-19", 180, 70, "MID", 37, 4, 5, 30, 0, 3, 0, 2500, 7.3, 50),
    P("Manuel Ugarte", "Uruguay", "UY", "2001-04-11", 182, 72, "MID", 25, 1, 2, 26, 0, 6, 0, 2100, 7.0, 40),
    P("Christian Eriksen", "Denmark", "DK", "1992-02-14", 182, 76, "MID", 14, 2, 3, 18, 0, 2, 0, 1200, 6.6, 5),
    P("Mason Mount", "England", "GB", "1999-01-10", 181, 73, "MID", 7, 2, 2, 14, 0, 1, 0, 900, 6.5, 15),
    P("Marcus Rashford", "England", "GB", "1997-10-31", 180, 70, "FWD", 10, 7, 3, 24, 0, 3, 0, 1800, 6.8, 45, "Left"),
    P("Alejandro Garnacho", "Argentina", "AR", "2004-07-01", 180, 72, "FWD", 17, 8, 5, 30, 0, 4, 0, 2200, 7.2, 40, "Left"),
    P("Rasmus Højlund", "Denmark", "DK", "2003-02-04", 191, 85, "FWD", 9, 10, 3, 28, 0, 2, 0, 2100, 7.1, 45),
    P("Joshua Zirkzee", "Netherlands", "NL", "2001-05-22", 193, 80, "FWD", 11, 4, 3, 22, 0, 2, 0, 1400, 6.7, 25),
    P("Amad Diallo", "Ivory Coast", "CI", "2002-07-11", 173, 62, "FWD", 16, 9, 6, 30, 0, 2, 0, 2300, 7.4, 35),
    P("Antony", "Brazil", "BR", "2000-02-24", 176, 64, "FWD", 21, 2, 2, 16, 0, 1, 0, 1000, 6.3, 15),
  ],
  NEW: [
    P("Nick Pope", "England", "GB", "1992-04-19", 191, 87, "GK", 22, 0, 0, 20, 8, 0, 0, 1800, 7.0, 12),
    P("Martin Dúbravka", "Slovakia", "SK", "1989-01-15", 191, 87, "GK", 1, 0, 0, 14, 3, 0, 0, 1260, 6.6, 3),
    P("Sven Botman", "Netherlands", "NL", "2000-01-12", 195, 90, "DEF", 4, 1, 0, 18, 5, 2, 0, 1500, 7.0, 40),
    P("Fabian Schär", "Switzerland", "CH", "1991-12-20", 186, 85, "DEF", 5, 2, 1, 28, 7, 4, 0, 2400, 7.0, 5),
    P("Dan Burn", "England", "GB", "1992-05-09", 198, 88, "DEF", 33, 1, 0, 30, 7, 4, 0, 2600, 6.8, 5, "Left"),
    P("Kieran Trippier", "England", "GB", "1990-09-19", 178, 71, "DEF", 2, 1, 5, 24, 4, 3, 0, 1950, 7.0, 8),
    P("Lewis Hall", "England", "GB", "2004-09-08", 178, 70, "DEF", 20, 1, 3, 28, 4, 2, 0, 2300, 6.9, 18, "Left"),
    P("Tino Livramento", "England", "GB", "2002-11-12", 177, 72, "DEF", 21, 1, 2, 26, 4, 3, 0, 2150, 6.9, 20),
    P("Lloyd Kelly", "England", "GB", "1998-10-06", 190, 80, "DEF", 6, 0, 0, 12, 2, 1, 0, 900, 6.5, 8),
    P("Bruno Guimarães", "Brazil", "BR", "1997-11-16", 182, 73, "MID", 39, 7, 6, 33, 0, 5, 0, 2900, 7.7, 80),
    P("Joelinton", "Brazil", "BR", "1996-08-14", 186, 82, "MID", 7, 5, 4, 30, 0, 6, 0, 2500, 7.1, 25),
    P("Sean Longstaff", "England", "GB", "1997-10-30", 183, 73, "MID", 36, 2, 2, 24, 0, 4, 0, 1800, 6.7, 10),
    P("Joe Willock", "England", "GB", "1999-08-20", 186, 73, "MID", 28, 3, 2, 20, 0, 3, 0, 1500, 6.7, 15),
    P("Sandro Tonali", "Italy", "IT", "2000-05-08", 181, 70, "MID", 8, 3, 4, 26, 0, 4, 0, 2100, 7.2, 50),
    P("Alexander Isak", "Sweden", "SE", "1999-09-21", 192, 78, "FWD", 14, 20, 5, 32, 0, 2, 0, 2750, 8.1, 85),
    P("Anthony Gordon", "England", "GB", "2001-02-24", 183, 69, "FWD", 10, 10, 8, 33, 0, 3, 0, 2800, 7.6, 55, "Left"),
    P("Harvey Barnes", "England", "GB", "1997-12-09", 180, 74, "FWD", 11, 6, 3, 24, 0, 2, 0, 1700, 7.0, 20, "Left"),
    P("Jacob Murphy", "England", "GB", "1995-02-24", 175, 68, "FWD", 23, 4, 5, 26, 0, 2, 0, 1800, 6.9, 8),
    P("Miguel Almirón", "Paraguay", "PY", "1994-02-10", 174, 63, "FWD", 24, 2, 3, 18, 0, 1, 0, 1100, 6.5, 8),
    P("Callum Wilson", "England", "GB", "1992-02-27", 180, 66, "FWD", 9, 3, 1, 10, 0, 1, 0, 600, 6.5, 5),
  ],
  NFO: [
    P("Matz Sels", "Belgium", "BE", "1992-02-26", 188, 82, "GK", 1, 0, 0, 34, 10, 1, 0, 3060, 7.2, 10),
    P("Matt Turner", "USA", "US", "1994-06-24", 190, 82, "GK", 30, 0, 0, 2, 0, 0, 0, 180, 6.0, 3),
    P("Murillo", "Brazil", "BR", "2002-04-18", 181, 75, "DEF", 23, 1, 0, 30, 8, 4, 0, 2600, 7.1, 25),
    P("Nikola Milenković", "Serbia", "RS", "1997-10-12", 195, 89, "DEF", 4, 2, 0, 28, 7, 5, 0, 2400, 7.0, 15),
    P("Willy Boly", "Ivory Coast", "CI", "1991-02-03", 194, 91, "DEF", 13, 0, 0, 12, 2, 2, 0, 900, 6.3, 2),
    P("Neco Williams", "Wales", "GB", "2001-04-13", 178, 69, "DEF", 7, 1, 4, 26, 4, 3, 0, 2100, 7.0, 15),
    P("Ola Aina", "Nigeria", "NG", "1996-10-08", 178, 73, "DEF", 43, 1, 3, 30, 5, 4, 0, 2600, 7.0, 10),
    P("Alex Moreno", "Spain", "ES", "1993-06-08", 171, 68, "DEF", 15, 0, 2, 18, 3, 2, 0, 1400, 6.6, 5, "Left"),
    P("Ryan Yates", "England", "GB", "1997-11-21", 188, 82, "MID", 22, 3, 2, 28, 0, 6, 0, 2300, 6.9, 8),
    P("Ibrahim Sangaré", "Ivory Coast", "CI", "1997-10-02", 192, 82, "MID", 6, 1, 1, 22, 0, 4, 0, 1700, 6.7, 15),
    P("Danilo", "Brazil", "BR", "2001-04-29", 175, 70, "MID", 14, 2, 3, 26, 0, 3, 0, 2100, 7.0, 20),
    P("Morgan Gibbs-White", "England", "GB", "2000-01-27", 172, 65, "MID", 10, 6, 8, 33, 0, 5, 0, 2800, 7.5, 30),
    P("Elliot Anderson", "England", "GB", "2002-11-06", 175, 66, "MID", 32, 2, 3, 22, 0, 2, 0, 1600, 6.9, 15),
    P("Nicolas Domínguez", "Argentina", "AR", "1998-06-28", 178, 74, "MID", 8, 2, 3, 24, 0, 4, 0, 1900, 7.0, 12),
    P("Anthony Elanga", "Sweden", "SE", "2002-04-27", 178, 68, "FWD", 21, 5, 5, 30, 0, 2, 0, 2300, 7.0, 18, "Left"),
    P("Callum Hudson-Odoi", "England", "GB", "2000-11-07", 177, 72, "FWD", 11, 6, 5, 28, 0, 2, 0, 2100, 7.1, 18),
    P("Chris Wood", "New Zealand", "NZ", "1991-12-07", 191, 78, "FWD", 9, 14, 2, 32, 0, 3, 0, 2600, 7.4, 8),
    P("Taiwo Awoniyi", "Nigeria", "NG", "1997-08-12", 183, 81, "FWD", 17, 4, 1, 16, 0, 2, 0, 1000, 6.5, 10),
    P("Ramón Sosa", "Paraguay", "PY", "2000-01-14", 175, 66, "FWD", 7, 3, 4, 20, 0, 1, 0, 1400, 6.8, 12, "Left"),
    P("Jota Silva", "Portugal", "PT", "1999-03-09", 180, 70, "FWD", 18, 4, 3, 22, 0, 2, 0, 1500, 6.9, 12),
  ],
  SOU: [
    P("Aaron Ramsdale", "England", "GB", "1998-05-14", 190, 77, "GK", 1, 0, 0, 28, 4, 1, 0, 2520, 6.5, 15),
    P("Alex McCarthy", "England", "GB", "1989-12-03", 193, 84, "GK", 1, 0, 0, 6, 0, 0, 0, 540, 6.0, 1),
    P("Jan Bednarek", "Poland", "PL", "1996-04-12", 189, 82, "DEF", 35, 1, 0, 28, 3, 5, 0, 2400, 6.5, 8),
    P("Jack Stephens", "England", "GB", "1994-01-27", 185, 78, "DEF", 5, 0, 0, 18, 2, 4, 0, 1400, 6.3, 2),
    P("Taylor Harwood-Bellis", "England", "GB", "2002-01-30", 185, 78, "DEF", 26, 1, 0, 26, 3, 4, 0, 2200, 6.7, 12),
    P("Kyle Walker-Peters", "England", "GB", "1997-04-13", 174, 63, "DEF", 2, 0, 3, 28, 3, 2, 0, 2400, 6.7, 12),
    P("Ryan Manning", "Ireland", "IE", "1996-06-14", 180, 73, "DEF", 20, 0, 2, 22, 2, 3, 0, 1700, 6.4, 3, "Left"),
    P("Yukinari Sugawara", "Japan", "JP", "2000-06-28", 178, 72, "DEF", 27, 1, 3, 30, 3, 3, 0, 2550, 6.8, 8),
    P("Flynn Downes", "England", "GB", "1999-01-20", 178, 70, "MID", 23, 0, 2, 26, 0, 5, 0, 2100, 6.5, 5),
    P("Joe Aribo", "Nigeria", "NG", "1996-07-21", 183, 76, "MID", 7, 2, 2, 22, 0, 3, 0, 1600, 6.5, 5),
    P("Mateus Fernandes", "Portugal", "PT", "2004-07-22", 178, 68, "MID", 8, 2, 3, 24, 0, 2, 0, 1800, 6.8, 10),
    P("Will Smallbone", "Ireland", "IE", "2000-02-21", 183, 72, "MID", 16, 2, 4, 26, 0, 3, 0, 2000, 6.7, 5),
    P("Carlos Alcaraz", "Argentina", "AR", "2002-11-30", 185, 78, "MID", 14, 1, 2, 18, 0, 4, 0, 1200, 6.4, 10),
    P("Tyler Dibling", "England", "GB", "2006-02-09", 175, 66, "FWD", 11, 4, 3, 24, 0, 2, 0, 1700, 6.9, 15),
    P("Cameron Archer", "England", "GB", "2001-12-09", 180, 73, "FWD", 18, 4, 1, 20, 0, 1, 0, 1300, 6.5, 8),
    P("Adam Armstrong", "England", "GB", "1997-02-10", 175, 62, "FWD", 9, 5, 3, 24, 0, 2, 0, 1700, 6.7, 5),
    P("Ben Brereton Díaz", "Chile", "CL", "1999-04-18", 187, 80, "FWD", 22, 2, 1, 14, 0, 1, 0, 800, 6.2, 5),
    P("Paul Onuachu", "Nigeria", "NG", "1994-05-28", 201, 90, "FWD", 10, 3, 0, 16, 0, 2, 0, 950, 6.4, 5),
  ],
  TOT: [
    P("Guglielmo Vicario", "Italy", "IT", "1996-10-07", 194, 89, "GK", 1, 0, 0, 28, 8, 1, 0, 2520, 7.1, 30),
    P("Fraser Forster", "England", "GB", "1988-03-17", 201, 93, "GK", 20, 0, 0, 6, 1, 0, 0, 540, 6.2, 1),
    P("Cristian Romero", "Argentina", "AR", "1998-04-27", 185, 79, "DEF", 17, 2, 1, 28, 7, 6, 0, 2400, 7.2, 45),
    P("Micky van de Ven", "Netherlands", "NL", "2001-04-19", 193, 83, "DEF", 37, 1, 1, 24, 6, 2, 0, 2050, 7.3, 45, "Left"),
    P("Radu Drăgușin", "Romania", "RO", "2002-02-03", 193, 82, "DEF", 6, 0, 0, 18, 3, 3, 0, 1400, 6.7, 18),
    P("Ben Davies", "Wales", "GB", "1993-04-24", 181, 73, "DEF", 33, 0, 1, 14, 2, 2, 0, 1050, 6.4, 3, "Left"),
    P("Destiny Udogie", "Italy", "IT", "2002-11-28", 186, 72, "DEF", 13, 2, 4, 30, 5, 4, 0, 2600, 7.1, 35, "Left"),
    P("Pedro Porro", "Spain", "ES", "1999-09-13", 173, 65, "DEF", 23, 3, 5, 32, 5, 5, 0, 2750, 7.2, 35),
    P("Djed Spence", "England", "GB", "2000-08-09", 178, 70, "DEF", 19, 0, 1, 8, 1, 1, 0, 550, 6.3, 5),
    P("Yves Bissouma", "Mali", "ML", "1996-08-30", 182, 76, "MID", 38, 2, 2, 28, 0, 5, 0, 2300, 7.0, 22),
    P("James Maddison", "England", "GB", "1996-11-23", 175, 73, "MID", 10, 8, 10, 30, 0, 3, 0, 2500, 7.5, 40),
    P("Rodrigo Bentancur", "Uruguay", "UY", "1997-06-25", 187, 78, "MID", 30, 2, 3, 22, 0, 4, 0, 1700, 6.9, 18),
    P("Pape Matar Sarr", "Senegal", "SN", "2002-09-14", 184, 73, "MID", 29, 3, 4, 26, 0, 3, 0, 2100, 7.1, 30),
    P("Dejan Kulusevski", "Sweden", "SE", "2000-04-25", 186, 76, "MID", 21, 7, 8, 32, 0, 3, 0, 2700, 7.5, 45),
    P("Heung-min Son", "South Korea", "KR", "1992-07-08", 183, 78, "FWD", 7, 14, 8, 32, 0, 2, 0, 2600, 7.7, 35, "Left"),
    P("Richarlison", "Brazil", "BR", "1997-05-10", 184, 83, "FWD", 9, 5, 2, 18, 0, 3, 0, 1200, 6.6, 25),
    P("Brennan Johnson", "Wales", "GB", "2001-05-23", 180, 73, "FWD", 22, 8, 4, 30, 0, 2, 0, 2200, 7.2, 30),
    P("Timo Werner", "Germany", "DE", "1996-03-06", 180, 75, "FWD", 16, 3, 3, 18, 0, 1, 0, 1100, 6.5, 15, "Left"),
    P("Wilson Odobert", "France", "FR", "2004-11-25", 178, 68, "FWD", 28, 2, 2, 12, 0, 1, 0, 750, 6.5, 15, "Left"),
    P("Manor Solomon", "Israel", "IL", "1999-07-24", 175, 67, "FWD", 14, 1, 2, 10, 0, 0, 0, 600, 6.3, 8, "Left"),
  ],
  WHU: [
    P("Alphonse Areola", "France", "FR", "1993-02-27", 195, 93, "GK", 1, 0, 0, 18, 3, 0, 0, 1620, 6.6, 5),
    P("Łukasz Fabiański", "Poland", "PL", "1985-04-18", 190, 86, "GK", 24, 0, 0, 16, 2, 0, 0, 1440, 6.5, 1),
    P("Max Kilman", "England", "GB", "1997-05-23", 188, 82, "DEF", 15, 1, 0, 30, 5, 3, 0, 2600, 6.9, 18),
    P("Konstantinos Mavropanos", "Greece", "GR", "1997-12-11", 194, 85, "DEF", 4, 1, 0, 24, 4, 4, 0, 2000, 6.7, 12),
    P("Jean-Clair Todibo", "France", "FR", "1999-12-30", 190, 82, "DEF", 25, 0, 0, 22, 3, 3, 0, 1800, 6.7, 20),
    P("Aaron Wan-Bissaka", "England", "GB", "1997-11-26", 183, 72, "DEF", 27, 0, 2, 26, 3, 3, 0, 2200, 6.7, 10),
    P("Emerson Palmieri", "Brazil", "BR", "1994-08-03", 176, 73, "DEF", 33, 0, 3, 28, 4, 3, 0, 2300, 6.7, 5, "Left"),
    P("Aaron Cresswell", "England", "GB", "1989-12-15", 170, 66, "DEF", 3, 0, 1, 12, 1, 2, 0, 850, 6.3, 1, "Left"),
    P("Vladimír Coufal", "Czech Republic", "CZ", "1992-08-22", 179, 73, "DEF", 5, 0, 2, 18, 2, 2, 0, 1400, 6.5, 3),
    P("Tomáš Souček", "Czech Republic", "CZ", "1995-02-27", 192, 86, "MID", 28, 5, 3, 34, 0, 5, 0, 2950, 7.0, 20),
    P("Lucas Paquetá", "Brazil", "BR", "1997-08-27", 180, 72, "MID", 11, 6, 5, 28, 0, 4, 0, 2300, 7.1, 35),
    P("Edson Álvarez", "Mexico", "MX", "1997-10-24", 187, 79, "MID", 19, 2, 1, 20, 0, 5, 0, 1600, 6.8, 18),
    P("James Ward-Prowse", "England", "GB", "1994-11-01", 178, 70, "MID", 7, 3, 5, 26, 0, 3, 0, 2050, 6.9, 10),
    P("Guido Rodríguez", "Argentina", "AR", "1994-04-12", 185, 80, "MID", 14, 1, 1, 18, 0, 3, 0, 1300, 6.5, 5),
    P("Mohammed Kudus", "Ghana", "GH", "2000-08-02", 177, 70, "FWD", 14, 9, 5, 30, 0, 4, 1, 2400, 7.3, 45),
    P("Jarrod Bowen", "England", "GB", "1996-12-20", 175, 70, "FWD", 20, 8, 7, 32, 0, 3, 0, 2700, 7.2, 35),
    P("Michail Antonio", "Jamaica", "JM", "1990-03-28", 180, 82, "FWD", 9, 3, 2, 14, 0, 2, 0, 900, 6.4, 3),
    P("Danny Ings", "England", "GB", "1992-07-23", 178, 73, "FWD", 18, 3, 1, 18, 0, 2, 0, 1100, 6.3, 3),
    P("Crysencio Summerville", "Netherlands", "NL", "2001-10-30", 173, 66, "FWD", 7, 6, 5, 26, 0, 2, 0, 1900, 7.1, 25, "Left"),
    P("Niclas Füllkrug", "Germany", "DE", "1993-02-09", 189, 85, "FWD", 11, 4, 2, 14, 0, 1, 0, 850, 6.6, 12),
  ],
  WOL: [
    P("José Sá", "Portugal", "PT", "1993-01-17", 192, 87, "GK", 1, 0, 0, 30, 5, 1, 0, 2700, 6.7, 8),
    P("Daniel Bentley", "England", "GB", "1993-07-13", 191, 85, "GK", 20, 0, 0, 4, 0, 0, 0, 360, 6.0, 1),
    P("Craig Dawson", "England", "GB", "1990-05-06", 188, 82, "DEF", 15, 1, 0, 22, 3, 4, 0, 1800, 6.5, 2),
    P("Santiago Bueno", "Uruguay", "UY", "1999-03-08", 190, 82, "DEF", 4, 0, 0, 20, 2, 3, 0, 1600, 6.4, 5),
    P("Toti Gomes", "Portugal", "PT", "1999-01-17", 188, 80, "DEF", 24, 0, 0, 18, 2, 3, 0, 1400, 6.4, 3),
    P("Rayan Aït-Nouri", "Algeria", "DZ", "2001-06-06", 178, 73, "DEF", 3, 3, 5, 32, 4, 3, 0, 2750, 7.3, 35, "Left"),
    P("Nélson Semedo", "Portugal", "PT", "1993-11-16", 177, 65, "DEF", 22, 0, 2, 24, 3, 3, 0, 1950, 6.5, 5),
    P("Matt Doherty", "Ireland", "IE", "1992-01-16", 183, 79, "DEF", 2, 0, 1, 14, 1, 2, 0, 1000, 6.3, 2),
    P("Hugo Bueno", "Spain", "ES", "2002-09-18", 178, 68, "DEF", 17, 0, 2, 16, 2, 1, 0, 1200, 6.5, 5, "Left"),
    P("João Gomes", "Brazil", "BR", "2001-02-12", 181, 73, "MID", 35, 2, 2, 30, 0, 8, 0, 2600, 6.9, 25),
    P("Mario Lemina", "Gabon", "GA", "1993-09-01", 184, 79, "MID", 5, 2, 3, 28, 0, 6, 0, 2300, 6.9, 8),
    P("Tommy Doyle", "England", "GB", "2001-10-17", 180, 72, "MID", 14, 1, 2, 18, 0, 2, 0, 1300, 6.5, 5),
    P("Boubacar Traoré", "Mali", "ML", "2001-03-20", 178, 72, "MID", 6, 0, 1, 12, 0, 2, 0, 800, 6.3, 5),
    P("Jean-Ricner Bellegarde", "France", "FR", "1998-06-27", 183, 75, "MID", 8, 1, 2, 22, 0, 3, 0, 1600, 6.6, 8),
    P("Matheus Cunha", "Brazil", "BR", "1999-05-27", 184, 77, "FWD", 10, 12, 7, 32, 0, 5, 0, 2700, 7.5, 40),
    P("Hwang Hee-chan", "South Korea", "KR", "1996-01-26", 177, 73, "FWD", 11, 7, 3, 26, 0, 2, 0, 1900, 7.0, 15),
    P("Pablo Sarabia", "Spain", "ES", "1992-05-11", 174, 70, "FWD", 21, 3, 4, 22, 0, 2, 0, 1500, 6.6, 5, "Left"),
    P("Gonçalo Guedes", "Portugal", "PT", "1996-11-29", 179, 71, "FWD", 7, 2, 2, 18, 0, 1, 0, 1100, 6.4, 5, "Left"),
    P("Carlos Forbs", "Portugal", "PT", "2004-04-16", 178, 68, "FWD", 18, 2, 3, 20, 0, 1, 0, 1300, 6.7, 10),
    P("Enso González", "Argentina", "AR", "2005-04-10", 172, 64, "MID", 28, 1, 2, 14, 0, 1, 0, 900, 6.5, 8, "Left"),
  ],
};

// ============ LIVE MATCHES ============
const liveMatchesData = [
  { home: "ARS", away: "LIV", hs: 2, as: 1, status: "live", minute: 67, stadium: "Emirates Stadium", lat: 51.5549, lng: -0.1084 },
  { home: "MCI", away: "CHE", hs: 1, as: 1, status: "ht", minute: 45, stadium: "Etihad Stadium", lat: 53.4831, lng: -2.2004 },
  { home: "NEW", away: "TOT", hs: 0, as: 0, status: "live", minute: 23, stadium: "St James' Park", lat: 54.9756, lng: -1.6216 },
  { home: "MUN", away: "AVL", hs: 3, as: 2, status: "ft", minute: 90, stadium: "Old Trafford", lat: 53.4631, lng: -2.2913 },
  { home: "BHA", away: "EVE", hs: 2, as: 0, status: "ft", minute: 90, stadium: "Amex Stadium", lat: 50.8616, lng: -0.0834 },
  { home: "WHU", away: "WOL", hs: 0, as: 0, status: "upcoming", minute: null, stadium: "London Stadium", lat: 51.5387, lng: -0.0166 },
  { home: "BRE", away: "CRY", hs: 0, as: 0, status: "upcoming", minute: null, stadium: "Gtech Community Stadium", lat: 51.4907, lng: -0.2886 },
  { home: "FUL", away: "BOU", hs: 1, as: 3, status: "ft", minute: 90, stadium: "Craven Cottage", lat: 51.4750, lng: -0.2217 },
  { home: "NFO", away: "LEI", hs: 2, as: 1, status: "ft", minute: 90, stadium: "The City Ground", lat: 52.9400, lng: -1.1325 },
  { home: "SOU", away: "IPS", hs: 0, as: 0, status: "upcoming", minute: null, stadium: "St Mary's Stadium", lat: 50.9058, lng: -1.3910 },
];

// ============ SEED ============
async function seed() {
  console.log("Seeding clubs...");
  const { data: insertedClubs, error: clubErr } = await supabase
    .from("clubs")
    .upsert(clubs, { onConflict: "code" })
    .select();

  if (clubErr) {
    console.error("Club insert error:", clubErr);
    // Try inserting one by one
    const insertedClubs2 = [];
    for (const club of clubs) {
      const { data, error } = await supabase.from("clubs").insert(club).select().single();
      if (error) console.error(`  Failed: ${club.code}`, error.message);
      else insertedClubs2.push(data);
    }
    if (insertedClubs2.length === 0) {
      console.error("Failed to insert any clubs. Aborting.");
      return;
    }
    return seedPlayers(insertedClubs2);
  }

  console.log(`Inserted ${insertedClubs.length} clubs`);
  await seedPlayers(insertedClubs);
}

async function seedPlayers(clubRows) {
  const clubMap = {};
  for (const c of clubRows) {
    clubMap[c.code] = c.id;
  }

  let totalPlayers = 0;

  for (const [code, players] of Object.entries(playersByClub)) {
    const clubId = clubMap[code];
    if (!clubId) {
      console.warn(`No club found for code ${code}`);
      continue;
    }

    const rows = players.map((p) => ({
      ...p,
      club_id: clubId,
      photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&size=256&background=10B981&color=fff&bold=true`,
    }));

    // Insert in batches of 25
    for (let i = 0; i < rows.length; i += 25) {
      const batch = rows.slice(i, i + 25);
      const { error } = await supabase.from("players").insert(batch);
      if (error) {
        console.error(`  Error inserting ${code} players batch ${i}:`, error.message);
      }
    }

    totalPlayers += players.length;
    console.log(`  ${code}: ${players.length} players`);
  }

  console.log(`Total players inserted: ${totalPlayers}`);

  // Seed live matches
  console.log("Seeding live matches...");
  const clubCodeMap = {};
  for (const c of clubRows) {
    clubCodeMap[c.code] = c.id;
  }

  const matchRows = liveMatchesData.map((m) => ({
    home_club_id: clubCodeMap[m.home],
    away_club_id: clubCodeMap[m.away],
    home_score: m.hs,
    away_score: m.as,
    status: m.status,
    minute: m.minute,
    tournament: "Premier League",
    match_date: new Date().toISOString(),
    stadium: m.stadium,
    stadium_lat: m.lat,
    stadium_lng: m.lng,
  }));

  const { error: matchErr } = await supabase.from("live_matches").insert(matchRows);
  if (matchErr) console.error("Match insert error:", matchErr.message);
  else console.log(`Inserted ${matchRows.length} matches`);

  console.log("Seed complete!");
}

// Run
async function main() {
  console.log("=== Atlas Football Database Seed ===\n");

  console.log("Step 1: Schema — appliquer scripts/schema.sql via SQL Editor Supabase si nécessaire.");

  const resp = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    headers: { apikey: SERVICE_ROLE_KEY, Authorization: `Bearer ${SERVICE_ROLE_KEY}` },
  });

  if (resp.ok) {
    console.log("Supabase connection OK");
  } else {
    console.error("Cannot connect to Supabase:", resp.status);
    return;
  }

  // We'll need to run the schema via the SQL editor or psql
  // For now, let's just try inserting data (tables may already exist)
  console.log("\nStep 2: Seeding data...");
  await seed();
}

main().catch(console.error);
