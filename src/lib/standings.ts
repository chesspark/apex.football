export interface StandingRow {
  rank: number;
  team: string;
  teamCode: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export interface LeagueStandings {
  league: string;
  leagueLogo: string;
  season: string;
  rows: StandingRow[];
}

export const sampleStandings: LeagueStandings[] = [
  {
    league: "Premier League",
    leagueLogo: "🦁",
    season: "2025-26",
    rows: [
      { rank: 1, team: "Manchester City", teamCode: "MCI", played: 30, won: 22, drawn: 5, lost: 3, goalsFor: 68, goalsAgainst: 22, goalDiff: 46, points: 71 },
      { rank: 2, team: "Arsenal", teamCode: "ARS", played: 30, won: 21, drawn: 6, lost: 3, goalsFor: 72, goalsAgainst: 28, goalDiff: 44, points: 69 },
      { rank: 3, team: "Liverpool", teamCode: "LIV", played: 30, won: 20, drawn: 6, lost: 4, goalsFor: 65, goalsAgainst: 30, goalDiff: 35, points: 66 },
      { rank: 4, team: "Aston Villa", teamCode: "AVL", played: 30, won: 18, drawn: 6, lost: 6, goalsFor: 58, goalsAgainst: 38, goalDiff: 20, points: 60 },
      { rank: 5, team: "Tottenham", teamCode: "TOT", played: 30, won: 16, drawn: 7, lost: 7, goalsFor: 55, goalsAgainst: 42, goalDiff: 13, points: 55 },
      { rank: 6, team: "Manchester United", teamCode: "MUN", played: 30, won: 15, drawn: 6, lost: 9, goalsFor: 48, goalsAgainst: 40, goalDiff: 8, points: 51 },
      { rank: 7, team: "Newcastle United", teamCode: "NEW", played: 30, won: 14, drawn: 7, lost: 9, goalsFor: 52, goalsAgainst: 45, goalDiff: 7, points: 49 },
      { rank: 8, team: "Chelsea", teamCode: "CHE", played: 30, won: 13, drawn: 8, lost: 9, goalsFor: 50, goalsAgainst: 44, goalDiff: 6, points: 47 },
      { rank: 9, team: "West Ham", teamCode: "WHU", played: 30, won: 12, drawn: 7, lost: 11, goalsFor: 45, goalsAgainst: 48, goalDiff: -3, points: 43 },
      { rank: 10, team: "Brighton", teamCode: "BHA", played: 30, won: 11, drawn: 8, lost: 11, goalsFor: 42, goalsAgainst: 44, goalDiff: -2, points: 41 },
    ],
  },
  {
    league: "Botola Pro",
    leagueLogo: "🇲🇦",
    season: "2024-25",
    rows: [
      { rank: 1, team: "RS Berkane", teamCode: "RSB", played: 30, won: 21, drawn: 7, lost: 2, goalsFor: 49, goalsAgainst: 14, goalDiff: 35, points: 70 },
      { rank: 2, team: "AS FAR", teamCode: "FAR", played: 30, won: 16, drawn: 9, lost: 5, goalsFor: 48, goalsAgainst: 24, goalDiff: 24, points: 57 },
      { rank: 3, team: "Wydad AC", teamCode: "WAC", played: 30, won: 14, drawn: 12, lost: 4, goalsFor: 45, goalsAgainst: 27, goalDiff: 18, points: 54 },
      { rank: 4, team: "FUS Rabat", teamCode: "FUS", played: 30, won: 14, drawn: 8, lost: 8, goalsFor: 53, goalsAgainst: 26, goalDiff: 27, points: 50 },
      { rank: 5, team: "Raja CA", teamCode: "RCA", played: 30, won: 12, drawn: 12, lost: 6, goalsFor: 38, goalsAgainst: 25, goalDiff: 13, points: 48 },
    ],
  },
];
