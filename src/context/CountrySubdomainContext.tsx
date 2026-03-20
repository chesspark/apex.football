"use client";

import { createContext, useContext, type ReactNode } from "react";

export type CountrySite = {
  rawSlug: string;
  iso2: string;
  canonicalSlug: string;
  nameEn: string;
} | null;

const CountrySubdomainContext = createContext<CountrySite>(null);

export function CountrySubdomainProvider({
  value,
  children,
}: {
  value: CountrySite;
  children: ReactNode;
}) {
  return (
    <CountrySubdomainContext.Provider value={value}>{children}</CountrySubdomainContext.Provider>
  );
}

export function useCountrySubdomain(): CountrySite {
  return useContext(CountrySubdomainContext);
}
