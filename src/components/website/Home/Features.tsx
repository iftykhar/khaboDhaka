"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Map as MapIcon } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Search",
    description:
      "Find your favorite restaurants with zero latency using our optimized Barikoi integration.",
  },
  {
    icon: <MapIcon className="w-8 h-8" />,
    title: "Geospatial Precision",
    description:
      "Every delivery point is verified with high-resolution geospatial data for perfect accuracy.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Seamless Flow",
    description:
      "A minimal interface designed to get you from hunger to happiness in just a few taps.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-950 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
