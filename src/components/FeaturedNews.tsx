"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Clock, TrendingUp, Newspaper, ArrowUpRight } from "lucide-react";

interface Spark {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
  delay: number;
}

function Fireworks() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    function burst() {
      const cx = 20 + Math.random() * 60;
      const cy = 10 + Math.random() * 40;
      const colors = ["#FFD700", "#FF4500", "#FF0000", "#A8D8A8", "#00FF00", "#FFFFFF", "#FF69B4"];
      const newSparks: Spark[] = [];

      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const dist = 40 + Math.random() * 80;
        newSparks.push({
          id: counter.current++,
          x: cx,
          y: cy,
          tx: cx + Math.cos(angle) * dist,
          ty: cy + Math.sin(angle) * dist,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 3,
          delay: Math.random() * 0.3,
        });
      }
      setSparks((prev) => [...prev.slice(-60), ...newSparks]);
    }

    burst();
    const id = setInterval(burst, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="firework-container">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="firework-spark"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 6px ${s.color}`,
            animationDelay: `${s.delay}s`,
            animationDuration: "1.5s",
            "--tx": `${s.tx - s.x}vw`,
            "--ty": `${s.ty - s.y}vh`,
            animation: `spark 1.5s ${s.delay}s ease-out forwards`,
            transform: `translate(0, 0)`,
          } as React.CSSProperties}
          onAnimationEnd={() =>
            setSparks((prev) => prev.filter((p) => p.id !== s.id))
          }
        />
      ))}
    </div>
  );
}

const liveNews = [
  {
    id: "ln1",
    title: "Premier League title race heats up as Arsenal close gap",
    titleFr: "La course au titre de Premier League s'intensifie",
    titleAr: "سباق لقب الدوري الإنجليزي يشتعل",
    category: "Premier League",
    time: "30 min ago",
    live: true,
  },
  {
    id: "ln2",
    title: "Champions League semi-final draw: Real Madrid vs PSG",
    titleFr: "Tirage demi-finales LDC : Real Madrid vs PSG",
    titleAr: "قرعة نصف نهائي دوري الأبطال: ريال مدريد ضد باريس",
    category: "UCL",
    time: "1h ago",
    live: true,
  },
  {
    id: "ln3",
    title: "Haaland scores 40th league goal — new record",
    titleFr: "Haaland marque son 40e but en championnat — nouveau record",
    titleAr: "هالاند يسجل هدفه الأربعين في الدوري — رقم قياسي جديد",
    category: "Premier League",
    time: "2h ago",
    live: false,
  },
  {
    id: "ln4",
    title: "Mbappé masterclass: 2 goals, 1 assist in El Clásico",
    titleFr: "Masterclass de Mbappé : 2 buts et 1 passe dans El Clásico",
    titleAr: "مبابي يتألق: هدفان وتمريرة حاسمة في الكلاسيكو",
    category: "La Liga",
    time: "4h ago",
    live: false,
  },
  {
    id: "ln5",
    title: "Wydad AC crowned Botola champions for 2025/26",
    titleFr: "Le Wydad AC sacré champion de la Botola 2025/26",
    titleAr: "الوداد يتوج بطلاً للبطولة الاحترافية 2025/26",
    category: "Botola Pro",
    time: "5h ago",
    live: false,
  },
  {
    id: "ln6",
    title: "Al-Hilal beat Al-Nassr in thrilling Saudi derby",
    titleFr: "Al-Hilal bat Al-Nassr dans un derby saoudien palpitant",
    titleAr: "الهلال يتفوق على النصر في ديربي سعودي مثير",
    category: "Saudi Pro League",
    time: "8h ago",
    live: false,
  },
];

export default function FeaturedNews() {
  return (
    <section className="relative py-24 bg-[var(--background)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── FEATURED: Morocco CAN Cup ── */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-[var(--accent)]/20">
          <Fireworks />

          <div className="relative z-10 bg-gradient-to-br from-[#C1272D] via-[#8B0000] to-[#C1272D] p-8 sm:p-12">
            {/* Moroccan zellige-inspired pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle, #FFD700 1px, transparent 1px), radial-gradient(circle, #FFD700 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0, 12px 12px",
              }}
            />

            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-[#FFD700]" />
                <span className="px-3 py-1 bg-[#FFD700] text-[#8B0000] text-xs font-black uppercase tracking-widest rounded-full animate-pulse">
                  Brea<span className="text-[#006233]">k</span>ing News
                </span>
                <Trophy className="w-8 h-8 text-[#FFD700]" />
              </div>

              <div className="text-6xl sm:text-8xl mb-6">🇲🇦</div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                <span className="text-[#A8D8A8]">Morocco Wins the</span><br />
                <span className="text-[#FFD700]">Africa Cup of Nations!</span>
              </h2>

              <p className="mt-4 text-lg text-[#A8D8A8]/90 max-w-2xl">
                The Atlas Lions have conquered Africa! In a stunning final held in Morocco, the national team
                lifted the CAN trophy for the first time in decades, sending the entire nation into celebration.
                A historic moment for Moroccan football. <span className="text-[#FFD700] font-bold">K</span>oudos to the <span className="text-[#FFD700] font-bold">K</span>ing&apos;s team!
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#FFD700]">2 - 0</div>
                  <div className="text-xs text-[#A8D8A8]/60 uppercase tracking-wider">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#FFD700]">🏆</div>
                  <div className="text-xs text-[#A8D8A8]/60 uppercase tracking-wider">Champions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#A8D8A8]">2026</div>
                  <div className="text-xs text-[#A8D8A8]/60 uppercase tracking-wider">CAN Edition</div>
                </div>
              </div>

              {/* K wink easter egg */}
              <div className="mt-6 text-xs text-[#FFD700]/40 tracking-[0.5em] uppercase">
                ✦ K ✦ I ✦ N ✦ G ✦ S ✦
              </div>
            </div>
          </div>
        </div>

        {/* ── LIVE NEWS SECTION ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-[var(--accent)]" />
            <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
              Latest News
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent)]/20 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">
            Live Feed
          </h2>
        </div>

        <div className="space-y-3">
          {liveNews.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group flex items-center justify-between p-5 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl hover:border-[var(--accent)]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {item.live ? (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-red-500/20">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                    Live
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-[var(--surface-hover)] text-[var(--muted)] text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {item.category}
                  </span>
                )}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-[var(--surface)] border border-[var(--border-clr)] rounded-full text-sm font-bold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/20 transition-all">
            <TrendingUp className="w-4 h-4 inline mr-2" />
            View All News
          </button>
        </div>
      </div>
    </section>
  );
}
