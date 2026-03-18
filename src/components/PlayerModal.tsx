"use client";

import { X, Heart, Ruler, Weight, Calendar, Shirt, Star, Target, Footprints } from "lucide-react";
import type { Player, Club } from "@/lib/types";
import { useFavorites } from "@/context/FavoritesContext";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  player: Player & { club?: Club };
  onClose: () => void;
}

export default function PlayerModal({ player, onClose }: Props) {
  const { isFavorite, toggleFavorite, canAddMore } = useFavorites();
  const { t } = useLanguage();
  const fav = isFavorite(player.id);

  const statItems = [
    { icon: Target, label: t("player.goals"), value: player.goals, color: "text-[var(--accent)]" },
    { icon: Star, label: t("player.assists"), value: player.assists, color: "text-blue-400" },
    { icon: Shirt, label: t("player.matches"), value: player.appearances, color: "text-[var(--accent)]" },
    { icon: Star, label: t("player.rating"), value: player.rating, color: "text-[var(--accent)]" },
  ];

  const detailItems = [
    { icon: Calendar, label: "Age", value: player.age || "—" },
    { icon: Ruler, label: "Height", value: player.height_cm ? `${player.height_cm} cm` : "—" },
    { icon: Weight, label: "Weight", value: player.weight_kg ? `${player.weight_kg} kg` : "—" },
    { icon: Footprints, label: "Foot", value: player.preferred_foot },
    { icon: Shirt, label: "Number", value: player.shirt_number ? `#${player.shirt_number}` : "—" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[var(--background)] border border-[var(--border-clr)] rounded-3xl overflow-hidden animate-fade-in-up">
        <div
          className="relative h-48 flex items-end p-6"
          style={{
            background: `linear-gradient(135deg, ${player.club?.primary_color || "var(--accent)"}40, ${player.club?.secondary_color || "#000"}20)`,
          }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleFavorite(player.id)}
            disabled={!fav && !canAddMore}
            className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-md transition-all ${fav ? "bg-red-500/20 text-red-400" : canAddMore ? "bg-black/40 text-white/50 hover:text-red-400" : "bg-black/40 text-white/20 cursor-not-allowed"}`}
          >
            <Heart className="w-5 h-5" fill={fav ? "currentColor" : "none"} />
          </button>
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[var(--surface)] border-2 border-[var(--border-clr)] shrink-0">
              {player.photo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={player.photo_url} alt={player.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div>
              <div className="text-sm font-semibold text-white/60">{player.position}</div>
              <h2 className="text-2xl font-black text-white">{player.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase" style={{ backgroundColor: player.club?.primary_color + "30", color: player.club?.primary_color }}>{player.club?.short_name}</span>
                <span className="text-xs text-[var(--muted)]">{player.nationality}</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-16 text-7xl font-black text-white/5">{player.shirt_number}</div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {statItems.map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-[var(--surface)] rounded-xl">
                <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                <div className="text-xl font-black text-[var(--foreground)]">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            {detailItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-[var(--border-clr)]">
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]"><item.icon className="w-4 h-4" />{item.label}</div>
                <div className="text-sm font-semibold text-[var(--foreground)]">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 bg-[var(--surface)] rounded-lg">
              <div className="text-lg font-bold text-[var(--foreground)]">{player.minutes_played}</div>
              <div className="text-[9px] uppercase tracking-wider text-[var(--muted)]">Minutes</div>
            </div>
            <div className="text-center p-2 bg-[var(--surface)] rounded-lg">
              <div className="text-lg font-bold text-[var(--accent)]">{player.yellow_cards}</div>
              <div className="text-[9px] uppercase tracking-wider text-[var(--muted)]">Yellows</div>
            </div>
            <div className="text-center p-2 bg-[var(--surface)] rounded-lg">
              <div className="text-lg font-bold text-red-400">{player.red_cards}</div>
              <div className="text-[9px] uppercase tracking-wider text-[var(--muted)]">Reds</div>
            </div>
          </div>

          <div className="mt-4 text-center py-3 bg-[var(--accent)]/5 border border-[var(--accent)]/10 rounded-xl">
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">Est. Market Value</div>
            <div className="text-2xl font-black text-[var(--accent)] mt-1">€{player.market_value_millions}M</div>
          </div>
        </div>
      </div>
    </div>
  );
}
