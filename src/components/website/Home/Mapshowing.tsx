"use client";

import React from "react";
import MapContainer from "@/features/map/components/MapContainer";
import {
  ChevronLeft,
  Search,
  MapPin,
  Star,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    user: "Susie Bridges",
    avatar: "https://i.pravatar.cc/150?u=susie",
    rating: 5.0,
    text: "Great food I like this place, I think best place of Colarodo. Chilling with Friends :)",
    images: [
      "/images/home/restaurant_burger.png",
      "/images/home/restaurant_pasta.png",
      "/images/home/restaurant_bakery.png",
      "/images/home/restaurant_halal.png",
    ],
  },
  {
    id: 2,
    user: "Rodney Miller",
    avatar: "https://i.pravatar.cc/150?u=rodney",
    rating: 4.8,
    text: "One of the best and so much good food corner in Colarodo. Specially the burger, Lemonade.",
    images: [],
  },
  {
    id: 3,
    user: "Larry Bowers",
    avatar: "https://i.pravatar.cc/150?u=larry",
    rating: 5.0,
    text: "Great food I like this place, I think best place of Colarodo. Chilling with Friends :)",
    images: [],
  },
];

const Mapshowing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-24 relative">
      {/* Map Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <MapContainer />

        {/* Overlays on Map */}
        <div className="absolute top-6 left-6 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="absolute top-6 right-6 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Attribution / Location Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-black/5 flex items-center gap-2 z-20">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
            Live View
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-6 py-8 space-y-8">
        {/* Location Info */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-primary shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-black text-gray-950">
              Hay Street, Perth
            </p>
            <p className="text-xs font-bold text-gray-400">
              Western Australia, 6000
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Reviews Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">
            Ratings & Reviews
          </h2>
          <button className="text-sm font-black text-orange-500 hover:text-orange-600 transition-colors">
            See all
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-8 py-1">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-gray-100">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-gray-950">{review.user}</p>
                </div>
                <div className="bg-orange-400 px-2 py-1 rounded-lg flex items-center gap-1 group">
                  <span className="text-xs font-black text-white">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <p className="text-sm font-bold text-gray-600 leading-relaxed">
                {review.text}
              </p>

              {review.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {review.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm transition-transform hover:scale-105"
                    >
                      <Image
                        src={img}
                        alt="review"
                        fill
                        className="object-cover"
                      />
                      {idx === 3 && review.images.length > 4 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-black text-xs">
                          +{review.images.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 border border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {/* <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100/50 flex gap-4 z-50">
        <Button className="flex-1 h-14 bg-orange-400 hover:bg-orange-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-200 transition-all hover:scale-[1.02] active:scale-95">
          BROWSE FOOD
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 rounded-2xl border-gray-100 bg-white/50 text-gray-400 hover:text-primary transition-colors"
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </div> */}
    </div>
  );
};

export default Mapshowing;
