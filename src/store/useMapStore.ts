import { create } from "zustand";
import { BarikoiPlace } from "@/types/barikoi";

interface MapState {
  mapInstance: any;
  searchResults: BarikoiPlace[];
  selectedPlace: BarikoiPlace | null;
  setMapInstance: (map: any) => void;
  setResults: (results: BarikoiPlace[]) => void;
  selectPlace: (place: BarikoiPlace | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  mapInstance: null,
  searchResults: [],
  selectedPlace: null,
  setMapInstance: (map) => set({ mapInstance: map }),
  setResults: (results) => set({ searchResults: results }),
  selectPlace: (place) => set({ selectedPlace: place }),
}));
