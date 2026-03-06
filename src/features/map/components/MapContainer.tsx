"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/store/useMapStore";
import { Loader2, MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";

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
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted group">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10 backdrop-blur-md">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm font-medium animate-pulse">
              Initializing Dhaka Maps...
            </p>
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
        }
      `}</style>
    </div>
  );
};

export default MapContainer;
