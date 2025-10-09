"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  showIndicator?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  showIndicator = true
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-brand-highlight1 to-brand-secondary text-white border-0",
    secondary: "bg-gradient-to-r from-brand-secondary to-brand-highlight1 text-white border-0",
    outline: "border border-white/20 text-white bg-transparent hover:bg-white/10",
    ghost: "text-white bg-transparent hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const baseClasses = "relative overflow-hidden rounded-xl font-semibold transition-all duration-300 cursor-pointer group";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Button Indicator */}
      {showIndicator && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-brand-highlight1 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.div
          className="w-2 h-2 bg-current rounded-full"
          animate={{
            x: [0, 4, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </span>
    </motion.button>
  );
};

export default AnimatedButton;
