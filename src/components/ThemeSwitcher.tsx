"use client";

import { Briefcase, Binary, Flag } from "lucide-react";
import { useTheme, type Theme } from "@/context/ThemeContext";

const themes: { id: Theme; icon: typeof Briefcase; label: string }[] = [
  { id: "babolat", icon: Briefcase, label: "Babolat" },
  { id: "matrix", icon: Binary, label: "Matrix" },
  { id: "regional", icon: Flag, label: "Regional Flags" },
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
