/**
 * Méthodes statistiques « open curriculum » (niveau MIT 18.05 / Harvard STAT110).
 * Implémentations pédagogiques — pas du code propriétaire importé.
 * Utilisées en mode Advanced du chat Pro et pour enrichir GoldenEye.
 */

/** Moyenne arithmétique */
export function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** Variance population (div n) */
export function variance(xs: number[]): number {
  if (xs.length === 0) return 0;
  const m = mean(xs);
  return xs.reduce((s, x) => s + (x - m) ** 2, 0) / xs.length;
}

/** Régression linéaire simple y ~ a + b x (Moindres carrés, style MIT 18.06 / STATS101) */
export function olsSimpleLinearRegression(xs: number[], ys: number[]): {
  intercept: number;
  slope: number;
  rSquared: number;
} {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return { intercept: 0, slope: 0, rSquared: 0 };
  const x = xs.slice(0, n);
  const y = ys.slice(0, n);
  const mx = mean(x);
  const my = mean(y);
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - mx) * (y[i] - my);
    den += (x[i] - mx) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = my - slope * mx;
  const ssTot = y.reduce((s, yi) => s + (yi - my) ** 2, 0);
  const ssRes = y.reduce((s, yi, i) => s + (yi - (intercept + slope * x[i])) ** 2, 0);
  const rSquared = ssTot === 0 ? 0 : 1 - ssRes / ssTot;
  return { intercept, slope, rSquared };
}

/** Log-vraisemblance Poisson (Harvard STAT110 — modèles GLM intro) */
export function poissonLogLikelihood(lambda: number, counts: number[]): number {
  if (lambda <= 0) return -Infinity;
  let ll = 0;
  for (const k of counts) {
    let logKf = 0;
    for (let i = 2; i <= k; i++) logKf += Math.log(i);
    ll += k * Math.log(lambda) - lambda - logKf;
  }
  return ll;
}

/** Probabilité P(X=k) pour X ~ Poisson(lambda) */
export function poissonPmf(lambda: number, k: number): number {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  return (Math.exp(k * Math.log(lambda) - lambda - logFactorial(k)));
}

function logFactorial(n: number): number {
  if (n <= 1) return 0;
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
}

/** Score de Brier pour probabilités binaires (calibration) */
export function brierScore(predictedProbs: number[], outcomes: (0 | 1)[]): number {
  const n = Math.min(predictedProbs.length, outcomes.length);
  if (n === 0) return 0;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const p = Math.min(1, Math.max(0, predictedProbs[i]));
    s += (p - outcomes[i]) ** 2;
  }
  return s / n;
}

/** Résumé texte pour injection contexte chat Advanced */
export function instituteStatsSummary(): string {
  return [
    "Available helpers: mean, variance, OLS simple linear regression, Poisson PMF & log-likelihood, Brier score.",
    "Pedagogical implementations aligned with standard undergraduate probability & statistics curricula.",
  ].join(" ");
}
