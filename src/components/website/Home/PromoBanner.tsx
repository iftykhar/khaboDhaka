// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// export function PromoBanner() {
//   return (
//     <div className="mx-6 my-8 rounded-[32px] overflow-hidden bg-[#FFEBAD] relative min-h-[160px] flex items-center justify-between p-8 border border-yellow-200/50 shadow-sm">
//       <div className="space-y-3 z-10 max-w-[60%]">
//         <h2 className="text-3xl font-black text-gray-950 leading-tight">
//           Free Delivery for 1 Month!
//         </h2>
//         <p className="text-sm font-bold text-gray-700/80 leading-relaxed max-w-sm">
//           You've to order at least $10 for using free delivery for 1 month.
//         </p>
//       </div>

//       <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-[55%] h-full">
//         <Image
//           src="/images/home/promo_pizza_banner.png"
//           alt="Promo banner"
//           fill
//           className="object-contain object-right scale-110 translate-x-4 lg:scale-140 lg:translate-x-12 opacity-100"
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    // Step 1: Container must be relative to anchor the background image
    <div className="mx-6 my-8 rounded-[32px] overflow-hidden bg-[#FFEBAD] relative min-h-[160px] flex items-center p-8 border border-yellow-200/50 shadow-sm">
      {/* Step 2: Ensure text content has a higher Z-Index (z-10) so it's readable over the image */}
      <div className="space-y-3 z-10 max-w-[60%] lg:max-w-[45%]">
        <h2 className="text-3xl font-black text-gray-950 leading-tight">
          Free Delivery for 1 Month!
        </h2>
        <p className="text-sm font-bold text-gray-700/80 leading-relaxed max-w-sm">
          You&apos;ve to order at least $10 for using free delivery for 1 month.
        </p>
      </div>

      {/* Step 3: Background Image Container */}
      {/* Added `z-0` to the container and the image must fill its parent. */}
      {/* We use `object-cover` so it acts as a true background. */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/home/promo_pizza_banner.png"
          alt="Promo banner background"
          fill
          priority // Added for performance as it's a large background element
          className="object-cover object-center 
                     scale-110 
                     lg:scale-125
                     opacity-50" // You might want to lower opacity (e.g., opacity-70) for better contrast
        />
      </div>
    </div>
  );
}
