"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface WaveLinesProps {
  className?: string;
  color?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
  opacity?: number;
}

const WaveLines: React.FC<WaveLinesProps> = ({
  className = "",
  color = "#FF6B35",
  speed = 1,
  amplitude = 20,
  frequency = 0.02,
  opacity = 0.3
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen ${className}`}>
      {/* Wave 1 - Bottom wave */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-56"
        viewBox="0 0 1200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: -1200 }}
        animate={{ x: 0 }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path
          d={`M0,${200 - amplitude} Q300,${200 - amplitude * 1.5} 600,${200 - amplitude} T1200,${200 - amplitude} L1200,200 L0,200 Z`}
          fill={color}
          fillOpacity={opacity}
          stroke={color}
          strokeOpacity={Math.min(1, opacity + 0.25)}
          strokeWidth={2}
        />
      </motion.svg>

      {/* Wave 2 - Middle wave */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-64"
        viewBox="0 0 1200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: 0 }}
        animate={{ x: -1200 }}
        transition={{
          duration: 25 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path
          d={`M0,${200 - amplitude * 0.5} Q300,${200 - amplitude * 1.2} 600,${200 - amplitude * 0.5} T1200,${200 - amplitude * 0.5} L1200,200 L0,200 Z`}
          fill={color}
          fillOpacity={opacity * 0.8}
          stroke={color}
          strokeOpacity={Math.min(1, opacity + 0.2)}
          strokeWidth={1.5}
        />
      </motion.svg>

      {/* Wave 3 - Top wave */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-72"
        viewBox="0 0 1200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: -600 }}
        animate={{ x: 600 }}
        transition={{
          duration: 30 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path
          d={`M0,${200 - amplitude * 0.8} Q300,${200 - amplitude * 1.8} 600,${200 - amplitude * 0.8} T1200,${200 - amplitude * 0.8} L1200,200 L0,200 Z`}
          fill={color}
          fillOpacity={opacity * 0.6}
          stroke={color}
          strokeOpacity={Math.min(1, opacity + 0.15)}
          strokeWidth={1.25}
        />
      </motion.svg>

      {/* Additional floating wave elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-28"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
          opacity: opacity * 0.4
        }}
        animate={{
          x: [-100, 100],
          opacity: [opacity * 0.2, opacity * 0.6, opacity * 0.2]
        }}
        transition={{
          duration: 8 / speed,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            opacity: opacity * 0.8
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.5, 1],
            opacity: [opacity * 0.4, opacity * 1, opacity * 0.4]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3
          }}
        />
      ))}
    </div>
  );
};

export default WaveLines;
