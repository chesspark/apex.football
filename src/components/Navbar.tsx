"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, Search } from "lucide-react";
import ApexLogoMark from "./ApexLogoMark";
import { useLanguage } from "@/context/LanguageContext";
import { Locale, localeNames, locales } from "@/lib/i18n";
import ThemeSwitcher from "./ThemeSwitcher";
import WeatherTime from "./WeatherTime";

export default function Navbar() {
  const { t, locale, setLocale, isRtl } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.players", href: "/#players" },
    { key: "nav.tournaments", href: "/#tournaments" },
    { label: "Teams", href: "/#teams" },
    { label: "Shop", href: "/#shop" },
    { label: "🇲🇦 Maroc", href: "/morocco" },
    { key: "nav.live", href: "/#live" },
    { label: "GoldenEye", href: "/#golden-eye" },
    { label: "Ambassadeur", href: "/apply" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border-clr)]">
      {/* Weather/time bar */}
      <div className="border-b border-[var(--border-clr)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between">
          <WeatherTime />
          <ThemeSwitcher />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Apex Football — accueil"
          >
            <ApexLogoMark size={36} className="transition-transform group-hover:scale-110" />
            <span className="text-[var(--foreground)] font-black text-xl tracking-tight uppercase">
              Apex<span className="text-[#D4AF37]">.</span>Football
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href + (link.key || link.label)}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)] transition-colors relative group"
              >
                {link.key ? t(link.key) : link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors border border-[var(--border-clr)] rounded-full"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{localeNames[locale]}</span>
              </button>
              {langOpen && (
                <div className={`absolute top-full mt-2 ${isRtl ? "left-0" : "right-0"} bg-[var(--background)] border border-[var(--border-clr)] rounded-xl overflow-hidden shadow-2xl min-w-[160px] max-h-[320px] overflow-y-auto`}>
                  {locales.map((l: Locale) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLocale(l);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        locale === l
                          ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                          : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--background)] border-t border-[var(--border-clr)]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href + (link.key || link.label)}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] rounded-lg transition-colors"
              >
                {link.key ? t(link.key) : link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
