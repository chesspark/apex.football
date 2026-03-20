"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Theme =
  | "apex"
  | "focus"
  | "highContrast"
  | "colorful"
  | "proMode"
  | "goldenEye";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "apex",
  setTheme: () => {},
});

const VALID_THEMES: Theme[] = ["apex", "focus", "highContrast", "colorful", "proMode", "goldenEye"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("apex");

  useEffect(() => {
    const stored = localStorage.getItem("apex-theme");
    const migrated: Record<string, Theme> = {
      light: "apex",
      dark: "focus",
      color: "colorful",
    };
    const theme = (stored && VALID_THEMES.includes(stored as Theme))
      ? (stored as Theme)
      : migrated[stored || ""] || "apex";
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const handleSetTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("apex-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
