import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoldenPyramidFalcon from "@/components/GoldenPyramidFalcon";
import RotatingWorldSpotlight from "@/components/RotatingWorldSpotlight";
import AmbassadorsSection from "@/components/AmbassadorsSection";
import RajaFeaturedSection from "@/components/RajaFeaturedSection";
import RotatingEarthBanner from "@/components/RotatingEarthBanner";
import FeaturedNews from "@/components/FeaturedNews";
import Globe3DWrapper from "@/components/Globe3DWrapper";
import PlayerGrid from "@/components/PlayerGrid";
import TeamsSection from "@/components/TeamsSection";
import TournamentsSection from "@/components/TournamentsSection";
import ResultsBoard from "@/components/ResultsBoard";
import FixturesSection from "@/components/FixturesSection";
import StandingsSection from "@/components/StandingsSection";
import ShopSection from "@/components/ShopSection";
import GoldenEyePredictions from "@/components/GoldenEyePredictions";
import Footer from "@/components/Footer";
import FavoritesBar from "@/components/FavoritesBar";
import BecomeAmbassadorSection from "@/components/BecomeAmbassadorSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <Hero />
      <div className="grid lg:grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center border-b border-[var(--border-clr)] pb-8">
        <GoldenPyramidFalcon />
        <div className="text-center lg:text-left py-6">
          <p className="text-[var(--accent)] text-xs font-bold uppercase tracking-[0.3em] mb-2">World-class portal</p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[var(--foreground)] leading-tight">
            Pyramide d&apos;or · Faucon · Données mondiales
          </h2>
          <p className="text-sm text-[var(--muted)] mt-3 max-w-md mx-auto lg:mx-0">
            Apex Football agrège clubs par pays, pronostics GoldenEye, chat Pro (Grok-ready) et couverture live.
          </p>
        </div>
      </div>
      <RotatingWorldSpotlight />
      <AmbassadorsSection />
      <RajaFeaturedSection />
      <RotatingEarthBanner />
      <FeaturedNews />
      <Globe3DWrapper />
      <PlayerGrid />
      <TeamsSection />
      <TournamentsSection />
      <ResultsBoard />
      <FixturesSection />
      <StandingsSection />
      <ShopSection />
      <GoldenEyePredictions />
      <BecomeAmbassadorSection />
      <Footer />
      <FavoritesBar />
    </main>
  );
}
