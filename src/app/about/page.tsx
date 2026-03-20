import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APEX_INSTAGRAM_URL } from "@/lib/instagram";
import { Target, Sparkles, Zap, Eye, Heart, Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Apex.Football — Mission, Founder & Vision",
  description:
    "Apex.Football is a modern football platform built for clarity, not clutter. Founded by Aldric Laure: fast coverage, intelligent analysis, and a fan-first experience on apex.football.",
  openGraph: {
    title: "About Apex.Football",
    description:
      "Football intelligence for the modern fan. Built by a fan, for fans — speed, clarity, and independence.",
    type: "website",
    url: "https://apex.football/about",
    siteName: "Apex Football",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.35em] mb-4">Apex.Football</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
          Football intelligence for the modern fan
        </h1>
        <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
          Apex.Football is a next-generation football platform for fans who want{" "}
          <strong className="text-[var(--foreground)]">more than recycled headlines</strong>. We combine fast
          updates, sharp context, and a clean experience — so you spend time on the game, not on noise.
        </p>

        <section className="mt-16 space-y-8">
          <h2 className="text-xl font-black uppercase tracking-wide flex items-center gap-2">
            <Target className="w-6 h-6 text-[#D4AF37]" aria-hidden />
            Mission &amp; vision
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border-clr)] bg-[var(--surface)]/40 p-6">
              <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Mission</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Deliver fast, intelligent, and beautifully simple football coverage that respects your time and
                your passion.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-clr)] bg-[var(--surface)]/40 p-6">
              <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Vision</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Become the most trusted independent football platform — the place fans go for{" "}
                <strong className="text-[var(--foreground)]">clarity, insight, and a modern experience</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-black uppercase tracking-wide flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" aria-hidden />
            Core values
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Zap, title: "Speed", text: "Information when you need it — matchday or transfer window." },
              { icon: Eye, title: "Clarity", text: "No clutter. No dark patterns. Just the signal." },
              { icon: Target, title: "Insight", text: "Analysis that teaches, not repeats." },
              { icon: Heart, title: "Authenticity", text: "Built by people who actually watch the game." },
              { icon: Shield, title: "Independence", text: "A fan-first voice — not a corporate filter." },
            ].map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-xl border border-[var(--border-clr)]/80 bg-[var(--surface)]/20 p-4"
              >
                <item.icon className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-bold text-[var(--foreground)]">{item.title}</p>
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-[var(--surface)]/60 to-transparent p-8 sm:p-10">
          <h2 className="text-xl font-black uppercase tracking-wide mb-4">Founder</h2>
          <p className="text-[var(--muted)] leading-relaxed text-sm sm:text-base">
            <strong className="text-[var(--foreground)]">Aldric Laure</strong> is a digital entrepreneur and
            football enthusiast who founded Apex.Football with a clear mission: create a{" "}
            <strong className="text-[var(--foreground)]">clean, fast, and insightful</strong> platform for fans
            who want clarity, not clutter. With a background in web development and a passion for the global
            game, Aldric designed Apex.Football to deliver match updates, news, and analysis with{" "}
            <strong className="text-[var(--foreground)]">precision and personality</strong> — challenging
            bloated, ad-heavy football sites with a product that feels crafted, not automated.
          </p>
          <p className="mt-4 text-[var(--muted)] leading-relaxed text-sm sm:text-base">
            His work spans football storytelling, tactical analysis, and digital products that elevate the fan
            experience — part of a new wave of independent builders shaping the future of sports media.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-black uppercase tracking-wide mb-4">What makes us different</h2>
          <ul className="space-y-3 text-[var(--muted)] text-sm sm:text-base leading-relaxed list-disc list-inside">
            <li>Lightning-fast match coverage and a minimalist, distraction-free UI</li>
            <li>Smart analysis that respects your intelligence</li>
            <li>Community-driven features — profiles, fan identity, and room to grow</li>
            <li>
              Focus on the world&apos;s biggest clubs (&quot;mastodontes&quot;) with data-driven storytelling —
              scaling toward a full global encyclopedia of pro football
            </li>
          </ul>
        </section>

        <section className="mt-16 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between rounded-2xl border border-[var(--border-clr)] p-6 bg-[var(--surface)]/30">
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">Join the platform</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Sign in with Google or Apple — then build your public fan profile on apex.football
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:brightness-110 transition-all"
            >
              Connexion
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={APEX_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-clr)] text-sm font-semibold text-[var(--foreground)] hover:border-[#D4AF37]/50 transition-colors"
            >
              Instagram
            </a>
          </div>
        </section>

        <p className="mt-12 text-xs text-[var(--muted)] text-center max-w-2xl mx-auto leading-relaxed">
          Positioning: &ldquo;Football intelligence for the modern fan&rdquo; · &ldquo;Built by a fan, for
          fans&rdquo; · &ldquo;A platform that respects your time and your passion&rdquo;.
        </p>
      </div>
      <Footer />
    </main>
  );
}
