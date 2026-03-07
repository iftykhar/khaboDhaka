"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LocationHeader() {
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white sticky top-[72px] z-40 border-b border-gray-100/50 backdrop-blur-sm bg-white/80">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">
          Delivery to
        </span>
        <button className="flex items-center gap-1 group">
          <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
            HayStreet, Perth
          </span>
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
        </button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-gray-900 font-bold hover:bg-gray-100 rounded-xl px-4"
      >
        Filter
      </Button>
    </div>
  );
}
