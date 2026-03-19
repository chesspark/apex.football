import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import PortalProChat from "@/components/PortalProChat";

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
    url: "https://apex-football.com",
    siteName: "Apex Football",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" data-theme="apex" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <FavoritesProvider>
              {children}
              <PortalProChat />
            </FavoritesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
