"use client";

import { useEffect } from "react";
import { X, MapPin, Calendar, ExternalLink, Globe } from "lucide-react";
import type { TeamInfo } from "@/lib/worldTeams";
import { teamDetails } from "@/lib/teamDetails";

function ShirtIcon({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
      <path
        d="M12 6L8 10L5 8V20L10 22V36H30V22L35 20V8L32 10L28 6H12Z"
        fill={primary}
        stroke={secondary}
        strokeWidth="1.5"
      />
      <path d="M16 6C16 6 18 10 20 10C22 10 24 6 24 6" stroke={secondary} strokeWidth="1" />
      <rect x="17" y="18" width="6" height="8" rx="1" fill={secondary} opacity="0.3" />
    </svg>
  );
}

interface TeamModalProps {
  team: TeamInfo;
  country: string;
  flag: string;
  onClose: () => void;
}

export default function TeamModal({ team, country, flag, onClose }: TeamModalProps) {
  const detail = teamDetails[team.name];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[var(--background)] border border-[var(--border-clr)] rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="h-24"
          style={{ background: `linear-gradient(135deg, ${team.primary}, ${team.secondary})` }}
        />
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex items-end gap-4 mb-4">
            <div className="p-2 bg-[var(--background)] rounded-xl border border-[var(--border-clr)]">
              <ShirtIcon primary={team.primary} secondary={team.secondary} />
            </div>
            <div>
              <h3 className="text-xl font-black text-[var(--foreground)]">{team.name}</h3>
              <p className="text-sm text-[var(--muted)]">
                {flag} {country}
              </p>
            </div>
          </div>

          {detail ? (
            <div className="space-y-4">
              {detail.description && (
                <p className="text-sm text-[var(--muted)] leading-relaxed">{detail.description}</p>
              )}
              <div className="space-y-2">
                {detail.stadium && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>{detail.stadium}</span>
                    {detail.city && <span className="text-[var(--muted)]">• {detail.city}</span>}
                  </div>
                )}
                {detail.founded && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Fondé en {detail.founded}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {detail.website && (
                  <a
                    href={detail.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--surface)] border border-[var(--border-clr)] rounded-lg text-sm text-[var(--accent)] hover:border-[var(--accent)]/50 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Site officiel
                  </a>
                )}
                {detail.wikipedia && (
                  <a
                    href={detail.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--surface)] border border-[var(--border-clr)] rounded-lg text-sm text-[var(--accent)] hover:border-[var(--accent)]/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Wikipedia
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              Plus d&apos;informations à venir pour ce club.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
