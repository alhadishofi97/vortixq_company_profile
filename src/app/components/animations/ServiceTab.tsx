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
      className={`relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${
          isActive 
            ? "bg-gradient-to-r from-brand-highlight1/20 to-brand-secondary/20 border border-brand-highlight1/30" 
            : "bg-white/5 border border-white/10 hover:bg-white/10"
        }`}
        layoutId="serviceTab"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Glow Effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-highlight1/10 to-brand-secondary/10"
          animate={{
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        {icon && (
          <motion.div
            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        )}
        <span className={`${isActive ? "text-white" : "text-white/70"}`}>
          {label}
        </span>
        
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="w-2 h-2 bg-brand-highlight1 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
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
