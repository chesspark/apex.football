"use client";

import { useCallback, useEffect, useId, useState, useRef } from "react";
import { X, ExternalLink, Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  APEX_INSTAGRAM_URL,
  APEX_INSTAGRAM_HANDLE,
  getInstagramPostUrlsFromEnv,
} from "@/lib/instagram";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function InstagramGlobalDock() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const postUrls = getInstagramPostUrlsFromEnv();
  const scriptAdded = useRef(false);
  const titleId = useId();

  const loadEmbedScript = useCallback(() => {
    const process = () => window.instgrm?.Embeds.process();

    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existing) {
      scriptAdded.current = true;
      process();
      return;
    }
    if (scriptAdded.current) {
      process();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => {
      scriptAdded.current = true;
      process();
    };
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    if (!open || postUrls.length === 0) return;
    const timer = window.setTimeout(() => {
      loadEmbedScript();
      window.setTimeout(() => window.instgrm?.Embeds.process(), 400);
    }, 120);
    return () => clearTimeout(timer);
  }, [open, postUrls.length, loadEmbedScript]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="fixed bottom-5 left-4 sm:left-6 z-[58] flex flex-col items-start gap-2 safe-area-pb">
        <button
          type="button"
          id="instagram-dock-trigger"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full border-2 border-transparent bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] p-[2px] shadow-xl shadow-black/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="instagram-dock-panel"
        >
          <span className="flex items-center gap-2 rounded-full bg-[var(--background)] px-3 py-2.5 sm:px-4 sm:py-3">
            <InstagramGlyph className="w-5 h-5 text-[#E1306C]" />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-[var(--foreground)] max-w-[140px] truncate">
              {APEX_INSTAGRAM_HANDLE}
            </span>
          </span>
        </button>
        <span className="hidden sm:block text-[10px] font-medium text-[var(--muted)] max-w-[200px] leading-tight pl-1">
          {t("instagram.dockHint")}
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label={t("instagram.close")}
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            id="instagram-dock-panel"
            className="relative z-10 w-full sm:max-w-lg max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl border border-[var(--border-clr)] bg-[var(--background)] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border-clr)] bg-[var(--surface)]/50">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p id={titleId} className="text-sm font-black text-[var(--foreground)] truncate">
                    {t("instagram.panelTitle")}
                  </p>
                  <p className="text-xs text-[var(--muted)] truncate">{APEX_INSTAGRAM_HANDLE}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={APEX_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[#E1306C] hover:bg-white/5 transition-colors"
                  aria-label={t("instagram.openProfile")}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors"
                  aria-label={t("instagram.close")}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-4 py-4 space-y-4">
              <p className="text-sm text-[var(--muted)] leading-relaxed">{t("instagram.featureFeed")}</p>

              {postUrls.length > 0 ? (
                <div className="space-y-4 flex flex-col items-center">
                  {postUrls.map((url) => (
                    <blockquote
                      key={url}
                      className="instagram-media"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                      style={{
                        background: "var(--background)",
                        border: "1px solid var(--border-clr)",
                        borderRadius: "12px",
                        maxWidth: "540px",
                        minWidth: "260px",
                        width: "100%",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--border-clr)] bg-[var(--surface)]/30 p-5 text-center">
                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{t("instagram.embedHint")}</p>
                  <ul className="text-left text-sm text-[var(--foreground)] space-y-2 mb-4 list-disc list-inside">
                    <li>{t("instagram.bulletPosts")}</li>
                    <li>{t("instagram.bulletStories")}</li>
                    <li>{t("instagram.bulletReels")}</li>
                  </ul>
                </div>
              )}

              <a
                href={APEX_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] px-4 py-3 text-sm font-bold text-white shadow-lg hover:opacity-95 transition-opacity"
              >
                <InstagramGlyph className="w-5 h-5" />
                {t("instagram.openInApp")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
