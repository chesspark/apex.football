"use client";

import { useId } from "react";

/** Hommage style messagerie instantanée (fleur jaune / centre clair) — artwork original Apex, pas le fichier logo ICQ™. */
export function ICQFlowerLogo({ size = 28 }: { size?: number }) {
  const uid = useId().replace(/:/g, "");
  const g = `icqPetals-${uid}`;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <defs>
        <radialGradient id={g} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="45%" stopColor="#FFEB3B" />
          <stop offset="100%" stopColor="#F9A825" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="#2E7D32" opacity={0.25} />
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse
          key={i}
          cx="16"
          cy="10"
          rx="5"
          ry="8"
          fill={`url(#${g})`}
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="5" fill="#FFFDE7" stroke="#F9A825" strokeWidth={0.5} />
    </svg>
  );
}
