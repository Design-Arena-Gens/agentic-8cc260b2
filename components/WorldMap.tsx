"use client";
import { memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { type Guess } from "@/lib/useGameStore";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MAX_DISTANCE = 20000;

type GeoShape = {
  rsmKey: string;
  properties: {
    ISO_A3?: string;
  };
};

function distanceToColor(distanceKm: number): string {
  const ratio = Math.min(distanceKm / MAX_DISTANCE, 1);
  const hue = 15 + (1 - ratio) * 200; // warm red to cool teal
  return `hsl(${hue}, 80%, ${45 + (1 - ratio) * 15}%)`;
}

function WorldMapComponent({
  guesses,
  status,
  targetCode
}: {
  guesses: Guess[];
  status: "playing" | "won";
  targetCode: string;
}) {
  const guessLookup = useMemo(() => {
    const map = new Map<string, Guess>();
    for (const guess of guesses) {
      map.set(guess.country.code, guess);
    }
    return map;
  }, [guesses]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-md">
      <ComposableMap projectionConfig={{ scale: 150 }}>
        <ZoomableGroup translateExtent={[[0, 0], [1000, 600]]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: GeoShape[] }) =>
              geographies.map((geo) => {
                const isoCode = (geo.properties.ISO_A3 ?? "").toUpperCase();
                if (!isoCode) return null;
                const guess = guessLookup.get(isoCode);
                const isTarget = status === "won" && isoCode === targetCode;
                const fill = isTarget
                  ? "hsl(142, 76%, 38%)"
                  : guess
                  ? distanceToColor(guess.distanceKm)
                  : "hsl(210, 20%, 88%)";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="hsl(210, 20%, 65%)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", filter: "brightness(1.1)" },
                      pressed: { outline: "none" }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export const WorldMap = memo(WorldMapComponent);
