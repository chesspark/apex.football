"use client";

import { useId } from "react";

type Props = {
  size?: number;
  className?: string;
};

/**
 * Marque Apex.Football : pyramidion + sigle APEX en or (dégradé or).
 */
export default function ApexLogoMark({ size = 36, className = "" }: Props) {
  const uid = useId().replace(/:/g, "");
  const grad = `apexGold-${uid}`;
  const gradDark = `apexGoldDark-${uid}`;

  return (
    <div
      className={`rounded-lg flex items-center justify-center overflow-hidden border border-[#D4AF37]/90 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#050505] shadow-[inset_0_1px_0_rgba(255,215,0,0.15)] shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        width={Math.round(size * 0.78)}
        height={Math.round(size * 0.78)}
        viewBox="0 0 36 36"
        fill="none"
      >
        <defs>
          <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DC" />
            <stop offset="25%" stopColor="#FFD700" />
            <stop offset="70%" stopColor="#DAA520" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id={gradDark} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        {/* Pyramidion */}
        <path fill={`url(#${grad})`} d="M18 5 L27 16 L9 16 Z" />
        <path fill={`url(#${gradDark})`} opacity={0.55} d="M9 16 L18 22 L27 16 Z" />
        <path fill="#FFD700" opacity={0.35} d="M18 22 L14 16 L22 16 Z" />
        {/* Apex du pyramidion — reflet */}
        <circle cx="18" cy="9" r="1.2" fill="#FFFACD" opacity={0.9} />
        {/* APEX — micro lettrage or */}
        <text
          x="18"
          y="31"
          textAnchor="middle"
          fill={`url(#${grad})`}
          fontSize="7"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.06em"
        >
          APEX
        </text>
      </svg>
    </div>
  );
}
