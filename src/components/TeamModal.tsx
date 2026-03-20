"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { X, MapPin, Calendar, ExternalLink, Globe } from "lucide-react";
import type { TeamInfo } from "@/lib/worldTeams";
import { teamDetails } from "@/lib/teamDetails";

function ShirtIcon({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none" aria-hidden>
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
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = prev;
    };
  }, [handleEscape]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg bg-[var(--background)] border border-[var(--border-clr)] rounded-2xl shadow-2xl overflow-hidden animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="Fermer la fiche club"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="h-28 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${team.primary}, ${team.secondary})` }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 8px,
                rgba(255,255,255,0.06) 8px,
                rgba(255,255,255,0.06) 10px
              )`,
            }}
          />
        </div>
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex items-end gap-4 mb-4">
            <div className="p-2 bg-[var(--background)] rounded-xl border border-[var(--border-clr)] shadow-lg ring-1 ring-black/5">
              <ShirtIcon primary={team.primary} secondary={team.secondary} />
            </div>
            <div className="min-w-0">
              <h3 id={titleId} className="text-xl font-black text-[var(--foreground)] truncate">
                {team.name}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                <span aria-hidden>{flag}</span> {country}
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
                    <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden />
                    <span>{detail.stadium}</span>
                    {detail.city && <span className="text-[var(--muted)]">• {detail.city}</span>}
                  </div>
                )}
                {detail.founded && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden />
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--surface)] border border-[var(--border-clr)] rounded-lg text-sm text-[var(--accent)] hover:border-[var(--accent)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    <Globe className="w-4 h-4" aria-hidden />
                    Site officiel
                  </a>
                )}
                {detail.wikipedia && (
                  <a
                    href={detail.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--surface)] border border-[var(--border-clr)] rounded-lg text-sm text-[var(--accent)] hover:border-[var(--accent)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden />
                    Wikipedia
                  </a>
                )}
                <Link
                  href="/mastodontes"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 text-[var(--foreground)] hover:border-[#D4AF37]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  Voir les mastodontes →
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-[var(--muted)]">Plus d&apos;informations à venir pour ce club.</p>
              <Link
                href="/mastodontes"
                className="inline-flex text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-2"
              >
                Explorer le classement mastodontes
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
