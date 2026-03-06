"use server";

import { BarikoiPlace, BarikoiSearchResponse } from "@/types/barikoi";

export async function searchFood(query: string): Promise<BarikoiPlace[]> {
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

    // Clean and validate the data to ensure it matches BarikoiPlace interface
    const places: BarikoiPlace[] = (data.places || []).map((place: any) => ({
      id: place.id,
      address: place.address,
      area: place.area,
      city: place.city,
      latitude: place.latitude,
      longitude: place.longitude,
      pcode: place.pcode,
      uCode: place.uCode,
      type: place.type,
    }));

    return places;
  } catch (error) {
    console.error("Error fetching places from Barikoi:", error);
    return [];
  }
}
