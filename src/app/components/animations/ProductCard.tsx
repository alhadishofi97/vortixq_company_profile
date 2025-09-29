"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SvgRenderer from "@/app/util/svgRendered";

interface ProductCardProps {
  title: string;
  description: string;
  dashboardImage: string;
  icon: string;
  onLearnMore: () => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  dashboardImage,
  icon,
  onLearnMore,
  className = "",
}) => {
  return (
    <motion.div
      className={`relative w-full h-[32rem] bg-black/80 p-6 shadow-2xl rounded-xl border-2 border-orange-500/30 overflow-hidden group flex flex-col mx-3 my-4 ${className}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Glass overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ zIndex: 0 }}
      />

      {/* Image with fixed height - Moved to top */}
      <div className="relative z-10 mb-4 flex-shrink-0">
        <motion.div
          className="relative rounded-lg overflow-hidden bg-black/50 border border-white/10 h-60"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={dashboardImage} alt={`${title} Dashboard`} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 right-4 text-orange-500">
            <div className="h-8 w-8">
              <SvgRenderer svgString={icon} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Header with title and description - Moved below image */}
      <div className="relative z-10 mb-4 flex-shrink-0">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Button pinned to bottom */}
      <motion.button
        onClick={onLearnMore}
        className="relative z-10 w-full h-10 px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg transition-all duration-200 shadow-lg cursor-pointer relative overflow-hidden group flex items-center justify-center gap-2 mt-auto hover:bg-orange-500 hover:text-white text-sm"
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 8px 25px rgba(255, 107, 53, 0.3)"
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10">Learn more</span>
        <motion.svg className="w-3 h-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-400/20"
          initial={{ x: "100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Border highlight on hover */}
      <motion.div 
        className="absolute inset-0 border-2 border-orange-400/0 group-hover:border-orange-400/60 rounded-xl pointer-events-none" 
        transition={{ duration: 0.3 }}
        style={{ zIndex: 1 }}
      />
    </motion.div>
  );
};

export default ProductCard;
