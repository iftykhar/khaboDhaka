"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  image: string;
  name: string;
  location: string;
  rating: number;
  time: string;
  deliveryFee: string;
  isWide?: boolean;
}

export function RestaurantCard({
  image,
  name,
  location,
  rating,
  time,
  deliveryFee,
  isWide = false,
}: RestaurantCardProps) {
  return (
    <div
      className={`group cursor-pointer ${isWide ? "w-full" : "w-[240px] shrink-0"}`}
    >
      <div
        className={`relative mb-3 overflow-hidden rounded-2xl bg-gray-100 ${isWide ? "aspect-2/1" : "aspect-4/3"}`}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white border-none shadow-sm font-bold">
            {time}
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-gray-950 text-lg leading-tight truncate">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-orange-50 px-1.5 py-0.5 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span className="text-xs font-black text-orange-700">{rating}</span>
          </div>
        </div>

        <p className="text-sm font-medium text-gray-500 truncate">{location}</p>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
          <span>{time}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-primary">{deliveryFee}</span>
        </div>
      </div>
    </div>
  );
}
