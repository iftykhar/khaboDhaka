"use client";

import React from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 to-white pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="space-y-6"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-orange-500 font-bold tracking-[0.3em] uppercase text-xs"
          >
            Premium Food Delivery
          </motion.span>

          <h1 className="text-6xl md:text-8xl font-black text-gray-950 tracking-tighter leading-none">
            Khabo <span className="text-orange-500">Dhaka</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Geospatial precision meets culinary excellence. Discover the best
            flavors in your neighborhood with real-time accuracy.
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-orange-500 to-transparent"
      />
    </section>
  );
};
