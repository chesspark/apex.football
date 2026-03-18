"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/WorldMap"), { ssr: false });

export default function WorldMapWrapper() {
  return <WorldMap />;
}
