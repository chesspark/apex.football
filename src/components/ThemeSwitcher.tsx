"use client";

import { Zap, Focus, Contrast, Palette, Shield, Sparkles } from "lucide-react";
import { useTheme, type Theme } from "@/context/ThemeContext";

const themes: { id: Theme; icon: typeof Zap; label: string }[] = [
  { id: "apex", icon: Zap, label: "Apex (default)" },
  { id: "focus", icon: Focus, label: "Focus" },
  { id: "highContrast", icon: Contrast, label: "High Contrast" },
  { id: "colorful", icon: Palette, label: "Colorful" },
  { id: "proMode", icon: Shield, label: "Pro Mode" },
  { id: "goldenEye", icon: Sparkles, label: "Golden Eye" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center bg-[var(--surface)] border border-[var(--border-clr)] rounded-full p-0.5">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          title={label}
          className={`p-1.5 rounded-full transition-all ${
            theme === id
              ? "bg-[var(--accent)] text-[var(--accent-fg)]"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}
