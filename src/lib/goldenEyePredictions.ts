/**
 * GoldenEye™ — suite IA pronostics Apex Football (mode orbital / espace).
 * Modèles déterministes seedés par match + codes clubs (réplicables).
 * À titre informatif uniquement — pas un conseil de pari.
 */

export type GoldenEyeVerdict = "1" | "X" | "2";

export interface GoldenEyeReport {
  matchId: number;
  homeCode: string;
  awayCode: string;
  tournament: string;
  orbitalFormHome: number;
  orbitalFormAway: number;
  stellarMomentumHome: number;
  stellarMomentumAway: number;
  nebulaDefenseHome: number;
  nebulaDefenseAway: number;
  cosmicLambdaHome: number;
  cosmicLambdaAway: number;
  probHomeWin: number;
  probDraw: number;
  probAwayWin: number;
  mostLikelyScore: string;
  mostLikelyScoreProb: number;
  confidenceTier: 1 | 2 | 3 | 4 | 5;
  singularityUpsetIndex: number;
  apexGoldenVerdict: GoldenEyeVerdict;
  verdictConfidencePct: number;
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/** Graine stable multi-champs (FNV-1a simplifié) */
export function createOrbitalSeed(...parts: (string | number)[]): number {
  let h = 2166136261;
  for (const p of parts) {
    const s = String(p);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
  }
  return Math.abs(h) || 1;
}

/** Générateur pseudo-aléatoire déterministe (orbite) */
export function spacePrng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    return s / 0xffffffff;
  };
}

/** Indice de forme orbital (0.35–1.0) */
export function computeOrbitalFormIndex(
  clubCode: string,
  matchId: number,
  tournament: string
): number {
  const rnd = spacePrng(createOrbitalSeed("FORM", clubCode, matchId, tournament));
  return 0.35 + rnd() * 0.55 + rnd() * 0.1;
}

/** Vecteur momentum stellaire (boost domicile / extérieur) */
export function computeStellarMomentum(
  clubCode: string,
  side: "home" | "away",
  matchId: number
): number {
  const rnd = spacePrng(createOrbitalSeed("MOM", clubCode, side, matchId));
  const base = 0.85 + rnd() * 0.35;
  return side === "home" ? base * (1.08 + rnd() * 0.06) : base;
}

/** Voile défensif nébuleuse (réduit λ adverse attendu) */
export function computeNebulaDefenseShroud(
  tournament: string,
  clubCode: string,
  matchId: number
): number {
  const rnd = spacePrng(createOrbitalSeed("NEB", tournament, clubCode, matchId));
  return 0.72 + rnd() * 0.28;
}

/** λ attaque cosmique (espérance de buts Poisson) */
export function computeCosmicLambda(
  form: number,
  momentum: number,
  opponentDefenseShroud: number,
  leagueBaseline: number
): number {
  const raw = leagueBaseline * form * momentum * opponentDefenseShroud;
  return Math.max(0.35, Math.min(3.8, raw));
}

export function leagueOrbitalBaseline(tournament: string): number {
  const t = tournament.toLowerCase();
  if (t.includes("champions") || t.includes("ucl")) return 1.45;
  if (t.includes("premier") || t.includes("laliga") || t.includes("serie")) return 1.38;
  if (t.includes("botola") || t.includes("maroc")) return 1.12;
  return 1.28;
}

export function poissonPMF(lambda: number, k: number): number {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

/** Matrice jointe buts domicile × extérieur (indépendance Poisson — couche « espace ») */
export function buildApexPoissonMatrix(
  lambdaHome: number,
  lambdaAway: number,
  maxGoals = 5
): { matrix: number[][]; scorelines: Map<string, number> } {
  const matrix: number[][] = [];
  const scorelines = new Map<string, number>();
  for (let i = 0; i <= maxGoals; i++) {
    matrix[i] = [];
    for (let j = 0; j <= maxGoals; j++) {
      const p = poissonPMF(lambdaHome, i) * poissonPMF(lambdaAway, j);
      matrix[i][j] = p;
      const key = `${i}-${j}`;
      scorelines.set(key, p);
    }
  }
  return { matrix, scorelines };
}

export function derive1X2FromMatrix(matrix: number[][]): {
  home: number;
  draw: number;
  away: number;
} {
  let home = 0,
    draw = 0,
    away = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const p = matrix[i][j];
      if (i > j) home += p;
      else if (i === j) draw += p;
      else away += p;
    }
  }
  const sum = home + draw + away;
  return {
    home: home / sum,
    draw: draw / sum,
    away: away / sum,
  };
}

export function pickMostLikelyScoreline(
  scorelines: Map<string, number>
): { label: string; prob: number } {
  let best = { label: "1-1", prob: 0 };
  scorelines.forEach((prob, key) => {
    if (prob > best.prob) {
      const [a, b] = key.split("-");
      best = { label: `${a}-${b}`, prob };
    }
  });
  return best;
}

/** Confiance « constellation » (1–5 étoiles) selon dispersion 1X2 */
export function computeConstellationConfidenceTier(
  pH: number,
  pD: number,
  pA: number
): 1 | 2 | 3 | 4 | 5 {
  const max = Math.max(pH, pD, pA);
  const entropy = -(pH * Math.log(pH + 1e-9) + pD * Math.log(pD + 1e-9) + pA * Math.log(pA + 1e-9));
  const norm = entropy / Math.log(3);
  if (max >= 0.55 && norm < 0.82) return 5;
  if (max >= 0.48 && norm < 0.9) return 4;
  if (max >= 0.4) return 3;
  if (max >= 0.35) return 2;
  return 1;
}

/** Indice de surprise singularity (0–100) */
export function computeSingularityUpsetIndex(pFav: number, pDog: number): number {
  const gap = Math.abs(pFav - pDog);
  return Math.round(Math.max(0, 100 - gap * 180 - pDog * 40));
}

export function fuseGoldenEyeVerdict(
  pH: number,
  pD: number,
  pA: number
): { verdict: GoldenEyeVerdict; confidencePct: number } {
  const max = Math.max(pH, pD, pA);
  let verdict: GoldenEyeVerdict = "X";
  if (max === pH) verdict = "1";
  else if (max === pA) verdict = "2";
  return { verdict, confidencePct: Math.round(max * 100) };
}

/** Δ elo orbital fictif (écart de force seedé) */
export function computeApexOrbitalEloDelta(
  codeA: string,
  codeB: string,
  matchId: number
): number {
  const rnd = spacePrng(createOrbitalSeed("ELO", codeA, codeB, matchId));
  const base = (rnd() - 0.5) * 120;
  const hashSkew =
    (createOrbitalSeed(codeA) % 97) / 97 - (createOrbitalSeed(codeB) % 97) / 97;
  return Math.round(base + hashSkew * 40);
}

/** Analyse complète GoldenEye pour un match (toutes couches fusionnées) */
export function goldenEyeFullAnalysis(input: {
  matchId: number;
  homeCode: string;
  awayCode: string;
  tournament: string;
}): GoldenEyeReport {
  const { matchId, homeCode, awayCode, tournament } = input;
  const baseline = leagueOrbitalBaseline(tournament);

  const orbitalFormHome = computeOrbitalFormIndex(homeCode, matchId, tournament);
  const orbitalFormAway = computeOrbitalFormIndex(awayCode, matchId, tournament);
  const stellarMomentumHome = computeStellarMomentum(homeCode, "home", matchId);
  const stellarMomentumAway = computeStellarMomentum(awayCode, "away", matchId);
  const nebulaDefenseHome = computeNebulaDefenseShroud(tournament, homeCode, matchId);
  const nebulaDefenseAway = computeNebulaDefenseShroud(tournament, awayCode, matchId);

  const cosmicLambdaHome = computeCosmicLambda(
    orbitalFormHome,
    stellarMomentumHome,
    nebulaDefenseAway,
    baseline
  );
  const cosmicLambdaAway = computeCosmicLambda(
    orbitalFormAway,
    stellarMomentumAway,
    nebulaDefenseHome,
    baseline
  );

  const { matrix, scorelines } = buildApexPoissonMatrix(cosmicLambdaHome, cosmicLambdaAway);
  const { home, draw, away } = derive1X2FromMatrix(matrix);
  const { label: mostLikelyScore, prob: mostLikelyScoreProb } = pickMostLikelyScoreline(scorelines);
  const confidenceTier = computeConstellationConfidenceTier(home, draw, away);
  const sorted = [home, draw, away].sort((a, b) => b - a);
  const upset = computeSingularityUpsetIndex(sorted[0], sorted[2]);
  const { verdict: apexGoldenVerdict, confidencePct: verdictConfidencePct } =
    fuseGoldenEyeVerdict(home, draw, away);

  return {
    matchId,
    homeCode,
    awayCode,
    tournament,
    orbitalFormHome,
    orbitalFormAway,
    stellarMomentumHome,
    stellarMomentumAway,
    nebulaDefenseHome,
    nebulaDefenseAway,
    cosmicLambdaHome,
    cosmicLambdaAway,
    probHomeWin: home,
    probDraw: draw,
    probAwayWin: away,
    mostLikelyScore,
    mostLikelyScoreProb,
    confidenceTier,
    singularityUpsetIndex: upset,
    apexGoldenVerdict,
    verdictConfidencePct,
  };
}

/** Alias exportés « IA espace » (toutes les fonctions utilisables isolément) */
export const goldenEyeExports = {
  createOrbitalSeed,
  spacePrng,
  computeOrbitalFormIndex,
  computeStellarMomentum,
  computeNebulaDefenseShroud,
  computeCosmicLambda,
  leagueOrbitalBaseline,
  poissonPMF,
  buildApexPoissonMatrix,
  derive1X2FromMatrix,
  pickMostLikelyScoreline,
  computeConstellationConfidenceTier,
  computeSingularityUpsetIndex,
  fuseGoldenEyeVerdict,
  computeApexOrbitalEloDelta,
  goldenEyeFullAnalysis,
};
