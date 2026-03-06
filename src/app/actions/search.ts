"use server";

import { BarikoiPlace, BarikoiSearchResponse } from "@/types/barikoi";

export async function searchPlaces(query: string): Promise<BarikoiPlace[]> {
  const apiKey = process.env.BARIKOI_API_KEY;

  if (!apiKey) {
    console.error("BARIKOI_API_KEY is not defined");
    return [];
  }

  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://barikoi.xyz/v1/api/search/autocomplete/${apiKey}/place?q=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error(`Barikoi API error: ${response.statusText}`);
    }

    const data: BarikoiSearchResponse = await response.json();

    return data.places || [];
  } catch (error) {
    console.error("Error fetching places from Barikoi:", error);
    return [];
  }
}
