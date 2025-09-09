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
        boxShadow: isActive ? "0 0 20px rgba(59, 130, 246, 0.3)" : "none"
      }}
    >
      {/* Background */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${
          isActive 
            ? "bg-gradient-to-r from-brand-highlight1/40 to-brand-secondary/40 border-2 border-brand-highlight1/60 shadow-lg shadow-brand-highlight1/30" 
            : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
        }`}
        layoutId="serviceTab"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Glow Effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-highlight1/20 to-brand-secondary/20"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Ripple Effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-brand-highlight1/40"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
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
          <motion.div
            className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-highlight1 rounded-full shadow-lg shadow-brand-highlight1/50 flex-shrink-0"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.5)",
                "0 0 0 6px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </motion.button>
  );
};

export default ServiceTab;
