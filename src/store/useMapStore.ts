import { create } from "zustand";
import { BarikoiPlace } from "@/types/barikoi";

interface MapState {
  mapInstance: any; // Using any for now as bkoi-gl types are not available
  searchResults: BarikoiPlace[];
  selectedPlace: BarikoiPlace | null;
  setMapInstance: (map: any) => void;
  setSearchResults: (results: BarikoiPlace[]) => void;
  setSelectedPlace: (place: BarikoiPlace | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  mapInstance: null,
  searchResults: [],
  selectedPlace: null,
  setMapInstance: (map) => set({ mapInstance: map }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));
