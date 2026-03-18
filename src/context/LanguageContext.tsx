"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { Locale, defaultLocale, locales, getDictionary, isRtl, t as translate } from "@/lib/i18n";

const COUNTRY_LOCALE_MAP: Record<string, Locale> = {
  // Arabic
  MA: "ar", DZ: "ar", TN: "ar", EG: "ar", SA: "ar", AE: "ar", QA: "ar",
  KW: "ar", BH: "ar", OM: "ar", IQ: "ar", JO: "ar", LB: "ar", SY: "ar",
  LY: "ar", SD: "ar", YE: "ar", PS: "ar", MR: "ar", SO: "ar", DJ: "ar",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", UY: "es", GQ: "es",
  // Portuguese
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt", CV: "pt", GW: "pt", ST: "pt",
  // French
  FR: "fr", BE: "fr", SN: "fr", CI: "fr", CM: "fr", MG: "fr", ML: "fr",
  BF: "fr", NE: "fr", TD: "fr", GN: "fr", RW: "fr", BJ: "fr", TG: "fr",
  CG: "fr", GA: "fr", CD: "fr", HT: "fr", KM: "fr", MC: "fr", LU: "fr",
  // German
  DE: "de", AT: "de", CH: "de", LI: "de",
  // Italian
  IT: "it", SM: "it",
  // Chinese
  CN: "zh", TW: "zh", HK: "zh", MO: "zh", SG: "zh",
  // Japanese
  JP: "ja",
  // Korean
  KR: "ko", KP: "ko",
  // Hindi
  IN: "hi",
  // Russian
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru", TJ: "ru",
  // Turkish
  TR: "tr", CY: "tr",
  // Dutch
  NL: "nl", SR: "nl", CW: "nl",
  // Polish
  PL: "pl",
  // Swedish
  SE: "sv",
  // Danish
  DK: "da", FO: "da",
  // Norwegian
  NO: "no",
  // Finnish
  FI: "fi",
  // Greek
  GR: "el",
  // Czech
  CZ: "cs",
  // Romanian
  RO: "ro", MD: "ro",
  // Hungarian
  HU: "hu",
  // Croatian
  HR: "hr",
  // Serbian
  RS: "sr", ME: "sr", BA: "sr",
  // Ukrainian
  UA: "uk",
  // Bulgarian
  BG: "bg",
  // Thai
  TH: "th",
  // Vietnamese
  VN: "vi",
  // Indonesian
  ID: "id",
  // Malay
  MY: "ms", BN: "ms",
  // Persian
  IR: "fa", AF: "fa",
  // Bengali
  BD: "bn",
  // Swahili
  TZ: "sw", KE: "sw", UG: "sw",
  // Irish
  IE: "ga",
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem("apex-locale") as Locale | null;
    if (saved && locales.includes(saved)) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = isRtl(saved) ? "rtl" : "ltr";
      return;
    }

    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })
      .then((r) => r.json())
      .then((data) => {
        const code: string = data?.country_code || "";
        const detected = COUNTRY_LOCALE_MAP[code];
        if (detected && locales.includes(detected)) {
          setLocaleState(detected);
          document.documentElement.lang = detected;
          document.documentElement.dir = isRtl(detected) ? "rtl" : "ltr";
        }
      })
      .catch(() => {});
  }, []);

  const dict = useMemo(() => getDictionary(locale), [locale]);
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const rtl = isRtl(locale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("apex-locale", newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = isRtl(newLocale) ? "rtl" : "ltr";
  }, []);

  const t = useCallback(
    (key: string) => translate(dict, key),
    [dict]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir, isRtl: rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
