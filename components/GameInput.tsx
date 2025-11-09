/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useState, useMemo, useEffect } from "react";
import Select, { type StylesConfig } from "react-select";
import { countries } from "@/lib/countries";
import { useGameStore } from "@/lib/useGameStore";

type Option = { value: string; label: string };

const selectStyles: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    borderColor: "hsl(210, 16%, 82%)",
    boxShadow: "none",
    "&:hover": { borderColor: "hsl(210, 16%, 72%)" },
    borderRadius: "0.75rem",
    minHeight: "3rem",
    paddingLeft: "0.25rem",
    paddingRight: "0.25rem"
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 20,
    borderRadius: "0.75rem",
    overflow: "hidden"
  })
};

export function GameInput() {
  const addGuess = useGameStore((state) => state.addGuess);
  const status = useGameStore((state) => state.status);
  const guessCount = useGameStore((state) => state.guesses.length);
  const [message, setMessage] = useState<string | null>(null);

  const options = useMemo(
    () =>
      countries.map((country) => ({
        value: country.name,
        label: country.name
      })),
    []
  );

  useEffect(() => {
    if (guessCount === 0) {
      setMessage(null);
    }
  }, [guessCount]);

  return (
    <div className="space-y-3">
      <Select<Option, false>
        isDisabled={status === "won"}
        options={options}
        styles={selectStyles}
        placeholder="Type a country name..."
        classNamePrefix="country-select"
        onChange={(selected) => {
          if (!selected) return;
          const guess = addGuess(selected.value);
          if (!guess) {
            setMessage("Invalid or duplicate country. Try another guess.");
          } else if (guess.distanceKm === 0) {
            setMessage(`You found it! ${guess.country.name} is the target.`);
          } else {
            setMessage(
              `${guess.country.name} is ${Math.round(guess.distanceKm)} km away.`
            );
          }
        }}
        isClearable
      />
      {message ? (
        <p className="text-center text-sm text-slate-500">{message}</p>
      ) : null}
    </div>
  );
}
