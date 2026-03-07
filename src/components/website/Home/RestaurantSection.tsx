"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface RestaurantSectionProps {
  title: string;
  children: ReactNode;
}

export function RestaurantSection({ title, children }: RestaurantSectionProps) {
  return (
    <section className="py-6 px-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-950 tracking-tight">
          {title}
        </h2>
        <Link
          href="/restaurants"
          className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
        >
          See all
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-6 px-6">
        {children}
      </div>
    </section>
  );
}
