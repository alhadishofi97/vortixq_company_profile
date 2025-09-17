"use client";
import React from "react";
import { motion } from "framer-motion";

interface GlowingOrbProps {
  size?: number;
  color?: string;
  intensity?: number;
  className?: string;
  animate?: boolean;
}

const GlowingOrb: React.FC<GlowingOrbProps> = ({
  size = 200,
  color = "brand-highlight1",
  intensity = 0.3,
  className = "",
  animate = true
}) => {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, var(--${color})/${intensity}, transparent 100%)`,
        filter: "blur(40px)",
      }}
      animate={animate ? {
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4],
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default GlowingOrb;



