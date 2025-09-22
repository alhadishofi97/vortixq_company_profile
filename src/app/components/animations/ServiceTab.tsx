"use client";
import React from "react";
import { motion } from "framer-motion";

interface ServiceTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const ServiceTab: React.FC<ServiceTabProps> = ({
  label,
  isActive,
  onClick,
  icon,
  className = ""
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 min-w-[180px] sm:min-w-[220px] md:min-w-[280px] lg:min-w-[320px] ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        boxShadow: isActive ? "0 0 20px rgba(255, 107, 53, 0.3)" : "none"
      }}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 ${
          isActive 
            ? "border-white bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/30" 
            : "border-orange-500/30 bg-black hover:bg-black/80"
        }`}
      />
      
      {/* Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/30 to-orange-400/30" />
      )}

      {/* Ripple Effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl border-2 border-orange-500" />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3 justify-center">
        {icon && (
          <motion.div
            className="flex-shrink-0"
            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
              {icon}
            </div>
          </motion.div>
        )}
        <span className={`${isActive ? "text-white font-bold drop-shadow-lg" : "text-white/70"} text-center flex-1 text-xs sm:text-sm md:text-base lg:text-lg leading-tight`}>
          {label}
        </span>
        
        {/* Active Indicator */}
        {isActive && (
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-lg shadow-white/50 flex-shrink-0" />
        )}
      </div>
    </motion.button>
  );
};

export default ServiceTab;
