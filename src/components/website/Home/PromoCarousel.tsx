"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const promos = [
  {
    id: 1,
    image: "/images/home/promo_ramen.png",
    title: "Fresh Japanese Ramen",
    subtitle: "25% Off Today!",
  },
  {
    id: 2,
    image: "/images/home/promo_pizza_banner.png",
    title: "Free Delivery",
    subtitle: "For 1 Month!",
  },
];

export function PromoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-video md:aspect-21/9 overflow-hidden rounded-3xl mx-6 my-6 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={promos[current].image}
            alt={promos[current].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent flex flex-col justify-center px-12 text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-2 leading-tight max-w-lg">
              {promos[current].title}
            </h2>
            <p className="text-xl md:text-2xl font-bold text-orange-400">
              {promos[current].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {promos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
