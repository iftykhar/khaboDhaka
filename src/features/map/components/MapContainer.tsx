"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/store/useMapStore";
import { Loader2, MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";
import SearchOverlay from "./SearchOverlay";

// bkoi-gl might not have type definitions, we declare it to avoid TS errors
declare global {
  interface Window {
    bkoi: any;
  }
}

const MapContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const { mapInstance, setMapInstance, selectedPlace } = useMapStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Dynamic import to avoid SSR issues
        // @ts-ignore - bkoi-gl might not be installed yet or lacks types
        const bkoi = (await import("bkoi-gl")).default;

        if (!mapContainerRef.current) return;

        const map = new bkoi.Map({
          container: mapContainerRef.current,
          center: [90.3667, 23.819], // Mirpur 11.5
          zoom: 15,
          accessToken:
            "bkoi_639847758cab1425e36a0f28ce77f63285b70d51aebcc051978c6c7ae5354c26",
        });

        map.on("load", () => {
          setMapInstance(map);
          setIsLoaded(true);
        });

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

  // Sync map with selectedPlace and update marker
  useEffect(() => {
    if (!mapInstance || !selectedPlace) return;

    const lat = parseFloat(selectedPlace.latitude);
    const lon = parseFloat(selectedPlace.longitude);

    if (isNaN(lat) || isNaN(lon)) return;

    // Trigger flyTo animation
    mapInstance.flyTo({
      center: [lon, lat],
      zoom: 17,
      essential: true,
      duration: 2000,
    });

    // Handle Custom Marker with Lucide Icon
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = ReactDOMServer.renderToString(
      <div className="text-primary hover:scale-110 transition-transform cursor-pointer drop-shadow-md">
        <MapPin
          size={32}
          fill="currentColor"
          fillOpacity={0.2}
          strokeWidth={2.5}
        />
      </div>,
    );

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Add new marker
    import("bkoi-gl").then((bkoiModule) => {
      const bkoi = bkoiModule.default;
      const marker = new bkoi.Marker(el)
        .setLngLat([lon, lat])
        .addTo(mapInstance);
      markerRef.current = marker;
    });
  }, [mapInstance, selectedPlace]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 group">
      {/* Search Overlay & Locate Me */}
      <SearchOverlay />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-50 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <div className="absolute inset-0 w-12 h-12 animate-pulse bg-primary/20 rounded-full blur-xl" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white font-bold tracking-tight text-xl">
                Khabo Dhaka Maps
              </p>
              <p className="text-slate-400 text-sm font-medium animate-pulse">
                Calibrating high-precision data...
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        ref={mapContainerRef}
        className="w-full h-full"
        id="barikoi-map-container"
      />

      <link
        href="https://cdn.jsdelivr.net/gh/barikoi/bkoi-gl-js/dist/bkoi-gl.css"
        rel="stylesheet"
      />

      <style jsx global>{`
        .bkoi-gl-marker {
          cursor: pointer;
          z-index: 10;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default MapContainer;
