"use client";

import { useLanguage } from "@/context/LanguageContext";
import { news } from "@/lib/data";
import { Clock, ArrowUpRight } from "lucide-react";

export default function NewsSection() {
  const { t, locale } = useLanguage();

  const getTitle = (item: (typeof news)[0]) =>
    locale === "ar" ? item.titleAr : locale === "fr" ? item.titleFr : item.title;

  const featured = news.filter((n) => n.featured);
  const regular = news.filter((n) => !n.featured);

  return (
    <section className="relative py-24 bg-black">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
            {t("section.news")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            {t("section.news")}
          </h2>
        </div>

        {/* Featured news */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featured.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-emerald-900/20 to-zinc-900 flex items-center justify-center">
                <span className="text-6xl opacity-20">📰</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  {getTitle(item)}
                </h3>
              </div>
              <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* Regular news */}
        <div className="space-y-4">
          {regular.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group flex items-center justify-between p-5 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-zinc-400 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {getTitle(item)}
                </h3>
              </div>
              <span className="flex items-center gap-1 text-xs text-zinc-500 shrink-0 ml-4">
                <Clock className="w-3 h-3" />
                {item.time}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
