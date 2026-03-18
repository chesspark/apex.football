import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RotatingEarthBanner from "@/components/RotatingEarthBanner";
import FeaturedNews from "@/components/FeaturedNews";
import Globe3DWrapper from "@/components/Globe3DWrapper";
import PlayerGrid from "@/components/PlayerGrid";
import TeamsSection from "@/components/TeamsSection";
import TournamentsSection from "@/components/TournamentsSection";
import ResultsBoard from "@/components/ResultsBoard";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import FavoritesBar from "@/components/FavoritesBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <Hero />
      <RotatingEarthBanner />
      <FeaturedNews />
      <Globe3DWrapper />
      <PlayerGrid />
      <TeamsSection />
      <TournamentsSection />
      <ResultsBoard />
      <ShopSection />
      <Footer />
      <FavoritesBar />
    </main>
  );
}
