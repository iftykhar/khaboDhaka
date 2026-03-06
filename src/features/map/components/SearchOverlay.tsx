"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Navigation, Loader2 } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { searchFood } from "@/app/actions/search";
import { BarikoiPlace } from "@/types/barikoi";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce"; // I'll check if this exists or create it

const SearchOverlay = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BarikoiPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { selectPlace, mapInstance } = useMapStore();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsSearching(true);
      try {
        const data = await searchFood(debouncedQuery);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place: BarikoiPlace) => {
    selectPlace(place);
    setIsOpen(false);
    setQuery("");
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapInstance) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapInstance.flyTo({
          center: [longitude, latitude],
          zoom: 16,
          essential: true,
          duration: 2000,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
    );
  };

  return (
    <>
      {/* Search Bar Overlay */}
      <div
        ref={searchRef}
        className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-full md:max-w-md z-20 px-4 md:px-0"
      >
        <div className="relative group">
          {/* Glassmorphism Container */}
          <div className="flex items-center bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:bg-white/95">
            <div className="flex items-center justify-center w-10 h-10 text-muted-foreground transition-colors group-focus-within:text-primary">
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>
            <input
              type="text"
              placeholder="Search food, restaurants, or locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium placeholder:text-muted-foreground/60 h-10"
              onFocus={() => query.length >= 2 && setIsOpen(true)}
            />
          </div>

          {/* Results Dropdown */}
          <AnimatePresence>
            {isOpen && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl overflow-hidden z-30"
              >
                <div className="max-h-[60vh] overflow-y-auto py-2 custom-scrollbar">
                  {results.map((place) => (
                    <button
                      key={place.id}
                      onClick={() => handleSelect(place)}
                      className="w-full flex items-start gap-4 px-4 py-3 hover:bg-primary/5 transition-all text-left group"
                    >
                      <div className="mt-1 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                          {place.address}
                        </p>
                        <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                          {place.area}, {place.city}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-1.5 self-center text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-primary/10 px-2 py-1 rounded-md">
                        Fly to <Navigation className="w-3 h-3 rotate-45" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Locate Me Button */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={handleLocateMe}
          className="w-14 h-14 bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl flex items-center justify-center text-primary transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 group"
          title="Locate Me"
        >
          <Navigation className="w-6 h-6 transition-transform group-hover:rotate-12" />
        </button>
      </div>
    </>
  );
};

export default SearchOverlay;
