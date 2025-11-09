import { type Guess } from "@/lib/useGameStore";

function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) return `${distanceKm.toFixed(2)} km`;
  if (distanceKm < 1000) return `${distanceKm.toFixed(0)} km`;
  return `${(distanceKm / 1000).toFixed(2)} Mm`;
}

function getHeatColor(distanceKm: number): string {
  const maxDistance = 20000;
  const ratio = Math.min(distanceKm / maxDistance, 1);
  const hue = 120 - ratio * 120; // 120 (green) to 0 (red)
  return `hsl(${hue}, 80%, 55%)`;
}

export function GuessList({ guesses }: { guesses: Guess[] }) {
  if (!guesses.length) {
    return (
      <p className="text-center text-sm text-slate-500">
        Start guessing to see your progress.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {guesses.map((guess) => (
        <li
          key={guess.country.code}
          className="flex items-center justify-between rounded-lg border border-border bg-surface p-3 shadow-sm"
        >
          <div className="space-y-1">
            <p className="text-lg font-semibold">{guess.country.name}</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {guess.country.code}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm font-medium text-slate-600">
                {formatDistance(guess.distanceKm)}
              </span>
              <span
                className="inline-block h-4 w-4 rounded-full"
                style={{ backgroundColor: getHeatColor(guess.distanceKm) }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
