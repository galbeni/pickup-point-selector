import type { GeocodingResult } from "@/types/geocoding-result.type";

export const searchLocation = async (query: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search location");
  }

  return response.json() as Promise<GeocodingResult[]>;
};
