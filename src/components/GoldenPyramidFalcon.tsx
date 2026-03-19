"use client";

import { useId } from "react";

/** Pyramide dorée animée + faucon au sommet (symbole Apex / vision). */
export default function GoldenPyramidFalcon() {
  const uid = useId().replace(/:/g, "");
  const gold = `pyrGold-${uid}`;

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="relative w-[min(100%,280px)] aspect-[4/3] flex items-end justify-center">
        <svg viewBox="0 0 200 160" className="w-full h-auto overflow-visible" aria-hidden>
          <defs>
            <linearGradient id={gold} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B6914" />
              <stop offset="35%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#FFF8DC" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
            <filter id={`glow-${uid}`}>
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Pyramide */}
          <path
            fill={`url(#${gold})`}
            className="apex-pyramid-shimmer"
            d="M100 120 L40 120 L100 40 L160 120 Z"
            filter={`url(#glow-${uid})`}
          />
          <path fill="#5D4E37" opacity={0.35} d="M40 120 L100 40 L100 120 Z" />
          <path fill="#C9A227" opacity={0.25} d="M100 40 L160 120 L100 120 Z" />
          {/* Apex pulsant */}
          <circle className="apex-apex-pulse" cx="100" cy="40" r="6" fill="#FFFACD" opacity={0.95} />
          {/* Faucon stylisé */}
          <g transform="translate(100, 22)">
            <g className="apex-falcon-float">
            <path
              d="M-12 2 Q-6 -8 0 -10 Q8 -6 12 2 Q6 6 0 8 Q-8 6 -12 2 Z"
              fill="#1a1a1a"
              stroke="#D4AF37"
              strokeWidth={0.6}
            />
            <path d="M8 0 L18 -2 L14 4 Z" fill="#2a2a2a" />
            <circle cx="-4" cy="-2" r="1.8" fill="#FFD700" />
            </g>
          </g>
        </svg>
      </div>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#B8860B] text-center">
        Golden Apex · Vision
      </p>
    </div>
  );
}
