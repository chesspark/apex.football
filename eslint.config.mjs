import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Hydratation : lecture localStorage / géoloc après premier paint (évite mismatch SSR/CSR)
  {
    files: [
      "src/context/FavoritesContext.tsx",
      "src/context/LanguageContext.tsx",
      "src/context/ThemeContext.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Helpers schema optionnels (exécution manuelle)
  {
    files: ["scripts/seed.mjs"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);

export default eslintConfig;
