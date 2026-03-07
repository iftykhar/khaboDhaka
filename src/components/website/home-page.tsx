"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Hero } from "./Home/Hero";
import { Features } from "./Home/Features";
import Mapshowing from "./Home/Mapshowing";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function HomePage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white min-h-screen text-gray-950"
    >
      {/* 1. Hero Section - Animated Title */}
      <section>
        <Hero />
      </section>

      {/* 2. Map Section - Geospatial Interaction */}
      <motion.section variants={sectionVariants} className="px-6 pb-12">
        <div className="container mx-auto">
          <div className="flex flex-col space-y-4 mb-8">
            <h2 className="text-3xl font-black tracking-tighter">
              Explore <span className="text-orange-500">Nearby</span>
            </h2>
            <p className="text-gray-500 font-medium max-w-lg">
              Interact with the map to discover premium flavors and
              high-precision delivery zones.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100">
            <Mapshowing />
          </div>
        </div>
      </motion.section>

      {/* 3. Minimal Features - The Value Props */}
      <motion.section variants={sectionVariants}>
        <Features />
      </motion.section>

      {/* Subtle Footer-like space */}
      <div className="py-12 border-t border-gray-50 text-center">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2026 Khabo Dhaka • All Rights Reserved
        </p>
      </div>
    </motion.main>
  );
}
