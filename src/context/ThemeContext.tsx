"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useCountrySubdomain } from "@/context/CountrySubdomainContext";

export type Theme = "babolat" | "matrix" | "regional";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "babolat",
  setTheme: () => {},
});

const VALID_THEMES: Theme[] = ["babolat", "matrix", "regional"];

const FLAG_THEME_OVERRIDES: Record<string, { primary: string; secondary: string; accent: string }> = {
  FR: { primary: "#1E3A8A", secondary: "#F9FAFB", accent: "#DC2626" },
  US: { primary: "#1E3A8A", secondary: "#F9FAFB", accent: "#B91C1C" },
  GB: { primary: "#1D4ED8", secondary: "#F8FAFC", accent: "#B91C1C" },
  DE: { primary: "#111827", secondary: "#F9FAFB", accent: "#B91C1C" },
  BR: { primary: "#166534", secondary: "#FACC15", accent: "#1D4ED8" },
  MA: { primary: "#B91C1C", secondary: "#F9FAFB", accent: "#166534" },
  ES: { primary: "#B91C1C", secondary: "#FACC15", accent: "#1D4ED8" },
  IT: { primary: "#166534", secondary: "#F9FAFB", accent: "#B91C1C" },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("babolat");
  const country = useCountrySubdomain();

  useEffect(() => {
    const stored = localStorage.getItem("apex-theme");
    const migrated: Record<string, Theme> = {
      light: "babolat",
      dark: "matrix",
      color: "regional",
    };
    const theme = (stored && VALID_THEMES.includes(stored as Theme))
      ? (stored as Theme)
      : migrated[stored || ""] || "babolat";
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const iso2 = country?.iso2?.toUpperCase() || "";
    const palette = FLAG_THEME_OVERRIDES[iso2] || {
      primary: "#1E40AF",
      secondary: "#F8FAFC",
      accent: "#DC2626",
    };
    html.style.setProperty("--regional-primary", palette.primary);
    html.style.setProperty("--regional-secondary", palette.secondary);
    html.style.setProperty("--regional-accent", palette.accent);
  }, [country]);

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
