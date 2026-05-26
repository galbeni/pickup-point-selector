"use client";
import { FormEvent, useState } from "react";
import { searchLocation } from "@/services/geocoding.service";
import { usePickupPointStore } from "@/stores/pickup-point.store";

export const LocationSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setMapTarget = usePickupPointStore((state) => state.setMapTarget);
  const clearMapTarget = usePickupPointStore((state) => state.clearMapTarget);

  const trimmedQuery = query.trim();
  const isQueryTooShort = trimmedQuery.length > 0 && trimmedQuery.length < 3;
  const isSearchDisabled = isSearching || trimmedQuery.length < 3;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (trimmedQuery.length < 3) {
      return;
    }

    if (!query.trim()) {
      return;
    }

    setIsSearching(true);
    setErrorMessage(null);

    try {
      const results = await searchLocation(trimmedQuery);
      const result = results[0];

      if (!result) {
        setErrorMessage("Location not found.");
        return;
      }

      setMapTarget({
        lat: Number(result.lat),
        lng: Number(result.lon),
        label: result.display_name,
      });
    } catch {
      setErrorMessage("Unable to search location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setErrorMessage(null);
    clearMapTarget();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <label
        htmlFor="location-search"
        className="text-sm font-semibold text-slate-900"
      >
        Search by city or address
      </label>
      <div className="mt-3 flex gap-2">
        <div className="relative min-w-0 flex-1">
          <input
            id="location-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Budapest, Bucharest, Berlin.."
            className="w-full rounded-xl border h-10 border-slate-300 px-4 py-2 pr-10 text-sm outline-none transition focus:border-slate-950"
          />
          <p className="mt-2 text-xs text-slate-500">
            Type at least 3 characters to search.
          </p>
          {isQueryTooShort ? (
            <p className="mt-1 text-xs text-amber-600">
              Please enter at least 3 characters.
            </p>
          ) : null}
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-2 rounded-full text-slate-400 transition hover:text-slate-700 cursor-pointer"
            >
              ×
            </button>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isSearchDisabled}
          className="rounded-xl bg-slate-950 h-10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </form>
  );
};
