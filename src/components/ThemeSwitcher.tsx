"use client";

import { Sun, Moon, Palette } from "lucide-react";
import { useTheme, type Theme } from "@/context/ThemeContext";

const themes: { id: Theme; icon: typeof Sun; label: string }[] = [
  { id: "dark", icon: Moon, label: "Dark" },
  { id: "light", icon: Sun, label: "Light" },
  { id: "color", icon: Palette, label: "Color" },
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
              ? "bg-[var(--accent)] text-black"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}
