import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CountrySubdomainProvider } from "@/context/CountrySubdomainContext";
import { resolveCountrySubdomain } from "@/lib/apex-subdomain";
import PortalProChat from "@/components/PortalProChat";
import YoutubePlaylistPlayer from "@/components/YoutubePlaylistPlayer";
import InstagramGlobalDock from "@/components/InstagramGlobalDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Football — 24/7 Live Football",
  description:
    "Track every Premier League player, every match, every tournament. Live scores, full squad databases, interactive match maps, and more. Available in English, French, and Arabic.",
  keywords: [
    "football", "soccer", "Premier League", "live scores", "player stats",
    "tournaments", "Champions League", "كرة القدم", "أبكس فوتبول",
  ],
  openGraph: {
    title: "Apex Football — 24/7 Live Football",
    description: "Track every Premier League player, every match, every tournament.",
    type: "website",
    url: "https://apex.football",
    siteName: "Apex Football",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const rawSub = h.get("x-apex-subdomain") ?? "";
  const countrySite = rawSub ? resolveCountrySubdomain(rawSub) : null;

  return (
    <html lang="en" dir="ltr" data-theme="babolat" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CountrySubdomainProvider value={countrySite}>
          <ThemeProvider>
            <LanguageProvider>
              <FavoritesProvider>
                {children}
                <YoutubePlaylistPlayer />
                <InstagramGlobalDock />
                <PortalProChat />
              </FavoritesProvider>
            </LanguageProvider>
          </ThemeProvider>
        </CountrySubdomainProvider>
      </body>
    </html>
  );
}
