"use client";

import { useCallback, useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { buildInstagramCaption, buildTelegramShareUrl, buildWhatsAppShareUrl } from "@/lib/social/share-links";

type Props = {
  /** URL absolue du profil ou page à partager */
  profileUrl: string;
  title: string;
  description: string;
  /** Bio optionnelle — intégrée dans la légende Instagram */
  bio?: string | null;
  className?: string;
};

export default function SocialShareBar({ profileUrl, title, description, bio, className = "" }: Props) {
  const [copied, setCopied] = useState<"link" | "ig" | null>(null);

  const shareText = `${title}\n${description}\n${profileUrl}`.trim();

  const onNativeShare = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({
        title,
        text: description,
        url: profileUrl,
      });
    } catch {
      /* annulé */
    }
  }, [title, description, profileUrl]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied("link");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }, [profileUrl]);

  const copyInstagramCaption = useCallback(async () => {
    const caption = buildInstagramCaption({ title, profileUrl, bio });
    try {
      await navigator.clipboard.writeText(caption);
      setCopied("ig");
      setTimeout(() => setCopied(null), 2500);
    } catch {
      /* ignore */
    }
  }, [title, profileUrl, bio]);

  const wa = buildWhatsAppShareUrl(shareText);
  const tg = buildTelegramShareUrl(profileUrl, title);

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Partager</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:opacity-95 transition-opacity"
          aria-label="Partager sur WhatsApp"
        >
          <span className="text-base leading-none" aria-hidden>
            💬
          </span>
          WhatsApp
        </a>
        <a
          href={tg}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0088cc] text-white hover:opacity-95 transition-opacity"
          aria-label="Partager sur Telegram"
        >
          <span className="text-base leading-none" aria-hidden>
            ✈️
          </span>
          Telegram
        </a>
        <button
          type="button"
          onClick={copyInstagramCaption}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white hover:opacity-95 transition-opacity"
          aria-label="Copier une légende pour Instagram"
        >
          {copied === "ig" ? <Check className="w-3.5 h-3.5" /> : <span aria-hidden>📸</span>}
          {copied === "ig" ? "Copié" : "Instagram"}
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[var(--border-clr)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--accent)]/40"
          aria-label="Copier le lien"
        >
          {copied === "link" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          Lien
        </button>
        {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <button
            type="button"
            onClick={onNativeShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10"
          >
            <Share2 className="w-3.5 h-3.5" />
            Partager…
          </button>
        )}
      </div>
      <p className="text-[10px] text-[var(--muted)] leading-relaxed max-w-md">
        <strong className="text-[var(--foreground)]">Instagram</strong> : pas de bouton web officiel — on copie une{" "}
        <strong>légende + lien</strong> à coller en story ou en bio. WhatsApp et Telegram ouvrent une conversation
        préremplie.
      </p>
    </div>
  );
}
