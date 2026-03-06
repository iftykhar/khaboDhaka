"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/store/useMapStore";
import { Loader2 } from "lucide-react";

// bkoi-gl might not have type definitions, we declare it to avoid TS errors
// In a real project, we would install @types/mapbox-gl if it's compatible or create a d.ts file
declare global {
  interface Window {
    bkoi: any;
  }
}

const MapContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { mapInstance, setMapInstance, selectedPlace } = useMapStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initMap = async () => {
      try {
        // @ts-ignore - bkoi-gl might not be installed yet or lacks types
        const bkoi = (await import("bkoi-gl")).default;

        if (!mapContainerRef.current) return;

        const map = new bkoi.Map({
          container: mapContainerRef.current,
          center: [90.3667, 23.819], // Mirpur 11.5
          zoom: 15,
          accessToken:
            "bkoi_639847758cab1425e36a0f28ce77f63285b70d51aebcc051978c6c7ae5354c26", // Provided API key
        });

        map.on("load", () => {
          setMapInstance(map);
          setIsLoaded(true);
        });

        // Cleanup on unmount
        return () => {
          if (map) {
            map.remove();
            setMapInstance(null);
          }
        };
      } catch (error) {
        console.error("Failed to initialize Barikoi map:", error);
      }
    };

    const cleanupPromise = initMap();

    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [setMapInstance]);

  // Sync map with selectedPlace
  useEffect(() => {
    if (mapInstance && selectedPlace) {
      const lat = parseFloat(selectedPlace.latitude);
      const lon = parseFloat(selectedPlace.longitude);

      if (!isNaN(lat) && !isNaN(lon)) {
        mapInstance.flyTo({
          center: [lon, lat],
          zoom: 17,
          essential: true,
          duration: 2000,
        });
      }
    }
  }, [mapInstance, selectedPlace]);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-border bg-muted">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        id="barikoi-map-container"
      />

      {/* bkoi-gl usually needs its CSS. We can inject it here or in layout */}
      <link
        href="https://cdn.jsdelivr.net/gh/barikoi/bkoi-gl-js/dist/bkoi-gl.css"
        rel="stylesheet"
      />
    </div>
  );
};

export default MapContainer;
