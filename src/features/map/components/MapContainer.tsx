"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/store/useMapStore";
import { Loader2, MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";
import SearchOverlay from "./SearchOverlay";

const MapContainer = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const bkoiRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const { mapInstance, setMapInstance, selectedPlace } = useMapStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let map: any;

    const initMap = async () => {
      try {
        const bkoi = (await import("bkoi-gl")).default;
        bkoiRef.current = bkoi;

        if (!mapContainerRef.current) return;

        map = new bkoi.Map({
          container: mapContainerRef.current,
          center: [90.3667, 23.819],
          zoom: 15,
          // accessToken:
          //   "bkoi_639847758cab1425e36a0f28ce77f63285b70d51aebcc051978c6c7ae5354c26",
          accessToken: process.env.NEXT_PUBLIC_BARIKOI_API_KEY,
        });

        map.on("load", () => {
          mapRef.current = map;
          setMapInstance(map);
          setIsLoaded(true);
        });
      } catch (err) {
        console.error("Map initialization failed:", err);
      }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
        setMapInstance(null);
      }
    };
  }, [setMapInstance]);

  useEffect(() => {
    if (!mapRef.current || !selectedPlace) return;

    const lat = parseFloat(selectedPlace.latitude);
    const lon = parseFloat(selectedPlace.longitude);

    if (isNaN(lat) || isNaN(lon)) return;

    const map = mapRef.current;

    map.flyTo({
      center: [lon, lat],
      zoom: 17,
      duration: 2000,
      essential: true,
    });

    const el = document.createElement("div");
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

    if (markerRef.current) {
      markerRef.current.remove();
    }

    if (!bkoiRef.current) return;

    const marker = new bkoiRef.current.Marker(el)
      .setLngLat([lon, lat])
      .addTo(map);

    markerRef.current = marker;
  }, [selectedPlace]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
      <SearchOverlay />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-50 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-white font-bold text-xl">Khabo Dhaka Maps</p>
            <p className="text-slate-400 text-sm animate-pulse">
              Calibrating high-precision data...
            </p>
          </div>
        </div>
      )}

      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default MapContainer;
