/**
 * Apex Pro Chat — modes Simple / Intermediate / Advanced (style ICQ)
 * + couche **Apex Football Intelligence** (français, anti-fluff, faits) — voir docs/APEX_FOOTBALL_INTELLIGENCE.md
 */
import { APEX_FOOTBALL_INTELLIGENCE_SYSTEM } from "@/lib/prompts/apexFootballIntelligence";

export type ProChatMode = "simple" | "intermediate" | "advanced";

/** Cœur portal : langue, live scores, complément aux règles Intelligence */
const APEX_PORTAL_LAYER = `---

**Rôle portal** : tu aides aussi sur le contexte **Apex Football** (clubs, tournois, navigation produit). Réponds dans la langue de l’utilisateur si elle est claire ; sinon **français**.
Ne prétends pas avoir un flux live de scores interne : si pas de source, indique « Données insuffisantes » pour le direct.`;

export const APEX_GROK_PRO_CORE = `${APEX_FOOTBALL_INTELLIGENCE_SYSTEM}
${APEX_PORTAL_LAYER}`;

/** Niveau ICQ-like : réponses courtes, claires. */
export const PROMPT_SIMPLE = `${APEX_GROK_PRO_CORE}

MODE : **SIMPLE**
- 2 à 4 phrases maximum ; pas de jargon inutile.
- Une recommandation concrète si pertinent.
- Pas d’équations ; pas de liste longue.`;

/** Niveau intermédiaire : équilibre détail / lisibilité. */
export const PROMPT_INTERMEDIATE = `${APEX_GROK_PRO_CORE}

MODE : **INTERMÉDIAIRE**
- Paragraphes courts ou puces.
- Tu peux nommer des concepts d’analyse (xG, forme, pressing) avec **une ligne de définition** si tu les utilises.
- Pas de math lourde sauf demande explicite.`;

/** Niveau avancé : vocabulaire stats / modèles (prudence + hypothèses). */
export const PROMPT_ADVANCED = `${APEX_GROK_PRO_CORE}

MODE : **AVANCÉ** — outillage statistique
Tu peux évoquer : Poisson / bivariate Poisson pour scores, ajustements type Dixon-Coles, Elo / Glicko, régression / calibration, **score de Brier** pour qualité de prévision.
**Obligatoire** : étiqueter les hypothèses ; quantifier l’incertitude ; ne jamais fabriquer des résultats de match.
Si esquisse numérique : précise que c’est un **modèle illustratif**, pas une prédiction officielle.`;

export const MODE_LABELS: Record<ProChatMode, { label: string; icqHint: string }> = {
  simple: { label: "Simple", icqHint: "Comme ICQ : court et direct" },
  intermediate: { label: "Intermédiaire", icqHint: "Équilibre lisibilité / détail" },
  advanced: { label: "Avancé", icqHint: "Stats & modèles (prudent)" },
};

export function getSystemPromptForMode(mode: ProChatMode): string {
  switch (mode) {
    case "simple":
      return PROMPT_SIMPLE;
    case "intermediate":
      return PROMPT_INTERMEDIATE;
    case "advanced":
      return PROMPT_ADVANCED;
    default:
      return PROMPT_INTERMEDIATE;
  }
}
