/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useMemo } from "react";
import { GameInput } from "@/components/GameInput";
import { GuessList } from "@/components/GuessList";
import { WorldMap } from "@/components/WorldMap";
import { useGameStore } from "@/lib/useGameStore";

export default function HomePage() {
  const guesses = useGameStore((state) => state.guesses);
  const status = useGameStore((state) => state.status);
  const newGame = useGameStore((state) => state.newGame);
  const target = useGameStore((state) => state.target);

  useEffect(() => {
    newGame();
  }, []);

  const bestGuess = useMemo(() => guesses[0], [guesses]);

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Globle</h1>
        <p className="text-sm text-slate-600">
          Guess the mystery country in as few attempts as possible. Each guess
          reveals how far you are from the target.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Make a guess</h2>
              <button
                type="button"
                onClick={() => newGame()}
                className="rounded-full border border-slate-300 px-4 py-1 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-700"
              >
                New Game
              </button>
            </div>
            <div className="mt-4">
              <GameInput />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Guess history</h2>
              <p className="text-sm text-slate-500">
                {guesses.length} {guesses.length === 1 ? "guess" : "guesses"}
              </p>
            </div>
            <GuessList guesses={guesses} />
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-md">
            <h2 className="text-xl font-semibold">World map</h2>
            <p className="text-sm text-slate-500">
              Colors get hotter as you get closer. The target glows green when
              discovered.
            </p>
            <div className="mt-4 h-[420px]">
              <WorldMap
                guesses={guesses}
                status={status}
                targetCode={target.code}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-md">
            <h2 className="text-xl font-semibold">Progress</h2>
            {status === "won" ? (
              <p className="text-green-700">
                🎉 You found {target.name} in {guesses.length}{" "}
                {guesses.length === 1 ? "guess" : "guesses"}!
              </p>
            ) : bestGuess ? (
              <p className="text-slate-600">
                Closest so far: {bestGuess.country.name} (
                {Math.round(bestGuess.distanceKm)} km away)
              </p>
            ) : (
              <p className="text-slate-500">No guesses yet.</p>
            )}
          </div>
        </aside>
      </section>

      <footer className="pb-6 text-center text-xs text-slate-400">
        Data sourced from restcountries.com. Built with Next.js.
      </footer>
    </main>
  );
}
