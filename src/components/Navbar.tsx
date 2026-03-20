"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, Search } from "lucide-react";
import ApexLogoMark from "./ApexLogoMark";
import { useLanguage } from "@/context/LanguageContext";
import { Locale, localeNames, locales } from "@/lib/i18n";
import ThemeSwitcher from "./ThemeSwitcher";
import AuthNav from "./AuthNav";
import { useCountrySubdomain } from "@/context/CountrySubdomainContext";
import { APEX_INSTAGRAM_URL } from "@/lib/instagram";
import { APEX_MOTTO } from "@/lib/brand";

function InstagramNavIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function Navbar() {
  const country = useCountrySubdomain();
  const { t, locale, setLocale, isRtl } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.about", href: "/about" },
    { key: "nav.countries", href: "/countries" },
    { key: "nav.players", href: "/#players" },
    { key: "nav.tournaments", href: "/#tournaments" },
    { label: "Teams", href: "/#teams" },
    { label: "Shop", href: "/#shop" },
    { label: "🇲🇦 Maroc", href: "/morocco" },
    { key: "nav.live", href: "/#live" },
    { label: "GoldenEye", href: "/#golden-eye" },
    { label: "Ambassadeur", href: "/apply" },
    { label: "Mastodontes", href: "/mastodontes" },
    { label: "Profil", href: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border-clr)]">
      {/* Weather/time bar */}
      <div className="border-b border-[var(--border-clr)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0" title={APEX_MOTTO}>
            <ApexLogoMark size={20} className="rounded-md" />
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[var(--foreground)] truncate">
              24/7 live tracking of your 1000+ football teams and players around the globe.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={APEX_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[#E1306C] hover:bg-[var(--surface)] transition-colors"
              aria-label={t("instagram.openProfile")}
            >
              <InstagramNavIcon className="w-5 h-5" />
            </a>
            <AuthNav />
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Apex Football — accueil"
            title={APEX_MOTTO}
          >
            <ApexLogoMark size={36} className="transition-transform group-hover:scale-110" />
            <span className="text-[var(--foreground)] font-black text-xl tracking-tight uppercase">
              Apex<span className="text-[#D4AF37]">.</span>Football
            </span>
            {country && (
              <span
                className="ml-2 px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/35 max-w-[140px] sm:max-w-none truncate"
                title={`${country.nameEn} (${country.iso2})`}
              >
                {country.nameEn}
              </span>
            )}
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
            <Link
              href="/#players"
              className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label={t("nav.players")}
            >
              <Search className="w-5 h-5" />
            </Link>

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
