"use client";

import { useId } from "react";
import { APEX_MOTTO } from "@/lib/brand";

type Props = {
  size?: number;
  className?: string;
  titleText?: string;
};

/**
 * Marque Apex.Football : triangle rouge (logo final).
 */
export default function ApexLogoMark({ size = 36, className = "", titleText = APEX_MOTTO }: Props) {
  const uid = useId().replace(/:/g, "");
  const gradMain = `apexRed-${uid}`;
  const gradShade = `apexRedShade-${uid}`;

  return (
    <div
      className={`rounded-lg flex items-center justify-center overflow-hidden border border-[#ef4444]/70 bg-gradient-to-br from-[#190606] via-[#260909] to-[#110404] shadow-[inset_0_1px_0_rgba(248,113,113,0.25)] shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title={titleText}
      aria-hidden
    >
      <svg
        width={Math.round(size * 0.78)}
        height={Math.round(size * 0.78)}
        viewBox="0 0 36 36"
        fill="none"
      >
        <defs>
          <linearGradient id={gradMain} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="45%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id={gradShade} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F1D1D" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <path fill={`url(#${gradMain})`} d="M18 5 L30 28 H6 Z" />
        <path fill={`url(#${gradShade})`} opacity={0.48} d="M18 10 L25 24 H11 Z" />
        <path fill="#FEE2E2" opacity={0.9} d="M18 8.5 L20 12.2 H16 Z" />
        <text
          x="18"
          y="31"
          textAnchor="middle"
          fill="#FCA5A5"
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
