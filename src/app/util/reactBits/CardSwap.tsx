"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardSwapProps {
  children: React.ReactNode[];
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
}

const CardSwap: React.FC<CardSwapProps> = ({
  children,
  cardDistance = 120,
  verticalDistance = 100,
  delay = 3000,
  pauseOnHover = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % children.length);
      }, delay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delay, children.length, isPaused]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            x: cardDistance,
            y: verticalDistance
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: 0,
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            x: -cardDistance,
            y: -verticalDistance
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CardSwap;
