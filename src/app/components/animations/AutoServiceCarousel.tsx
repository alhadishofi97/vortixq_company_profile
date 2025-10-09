"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableServiceCard from "../../modules/services/views/ExpandableServiceCard";

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  fullDescription: string;
  className: string;
}

interface AutoServiceCarouselProps {
  services: ServiceItem[];
  className?: string;
  autoSlideInterval?: number;
  pauseOnHover?: boolean;
}

const AutoServiceCarousel: React.FC<AutoServiceCarouselProps> = ({ 
  services, 
  className = "",
  autoSlideInterval = 4000,
  pauseOnHover = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(400);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const newCardWidth = Math.min(400, containerWidth - 40);
        setCardWidth(newCardWidth);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (!isPaused && services.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, autoSlideInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, services.length, autoSlideInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset auto slide timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused && services.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, autoSlideInterval);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
    // Reset auto slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused && services.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, autoSlideInterval);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    // Reset auto slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused && services.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, autoSlideInterval);
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div 
      className={`relative w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl"
        style={{ height: '500px' }}
      >
        <motion.div
          className="flex h-full"
          animate={{ x: -currentIndex * cardWidth }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.6
          }}
          style={{ width: `${services.length * cardWidth}px` }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="flex-shrink-0 px-2"
              style={{ width: cardWidth }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-full">
                <ExpandableServiceCard
                  icon={service.icon}
                  title={service.title}
                  shortDescription={service.shortDescription}
                  fullDescription={service.fullDescription}
                  className={service.className}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-110"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:scale-110"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-brand-highlight1 scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Auto Slide Indicator */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2 text-white/60 text-sm">
          <motion.div
            className="w-2 h-2 bg-brand-highlight1 rounded-full"
            animate={{
              scale: isPaused ? [1, 1.2, 1] : [1, 1.2, 1],
              opacity: isPaused ? [0.5, 1, 0.5] : [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span>
            {isPaused ? 'Paused' : 'Auto-sliding'} • {autoSlideInterval / 1000}s interval
          </span>
          <motion.div
            className="w-2 h-2 bg-brand-highlight1 rounded-full"
            animate={{
              scale: isPaused ? [1, 1.2, 1] : [1, 1.2, 1],
              opacity: isPaused ? [0.5, 1, 0.5] : [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 w-full bg-white/10 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-highlight1 to-brand-secondary rounded-full"
          animate={{
            width: isPaused ? "0%" : "100%"
          }}
          transition={{
            duration: autoSlideInterval / 1000,
            ease: "linear",
            repeat: isPaused ? 0 : Infinity
          }}
        />
      </div>
    </div>
  );
};

export default AutoServiceCarousel;
