"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, PanInfo } from "framer-motion";
import ExpandableServiceCard from "../../modules/services/views/ExpandableServiceCard";

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  fullDescription: string;
  className: string;
}

interface SwipeServiceCarouselProps {
  services: ServiceItem[];
  className?: string;
  autoSlideInterval?: number;
  pauseOnHover?: boolean;
}

const SwipeServiceCarousel: React.FC<SwipeServiceCarouselProps> = ({ 
  services, 
  className = "",
  autoSlideInterval = 5000,
  pauseOnHover = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(400);
  const [visibleCards, setVisibleCards] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        let newCardWidth;
        let newVisibleCards;
        
        if (containerWidth < 640) { // Mobile
          newVisibleCards = 1;
          newCardWidth = containerWidth - 16;
        } else if (containerWidth < 768) { // Small tablet
          newVisibleCards = 1;
          newCardWidth = containerWidth - 32;
        } else if (containerWidth < 1024) { // Tablet
          newVisibleCards = 1;
          newCardWidth = containerWidth - 48;
        } else if (containerWidth < 1280) { // Small desktop
          newVisibleCards = 2;
          newCardWidth = (containerWidth - 48) / 2;
        } else { // Large desktop
          newVisibleCards = 3;
          newCardWidth = (containerWidth - 64) / 3;
        }
        
        setCardWidth(newCardWidth);
        setVisibleCards(newVisibleCards);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (!isPaused && !isDragging && services.length > visibleCards) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, services.length - visibleCards);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoSlideInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, services.length, autoSlideInterval, isDragging, visibleCards]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    // Reset auto slide timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused && !isDragging && services.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, autoSlideInterval);
    }
  }, [isPaused, isDragging, services.length, autoSlideInterval]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, services.length - visibleCards);
      return prev >= maxIndex ? 0 : prev + 1;
    });
    resetAutoSlide();
  }, [services.length, visibleCards]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, services.length - visibleCards);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    resetAutoSlide();
  }, [services.length, visibleCards]);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused && !isDragging && services.length > visibleCards) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, services.length - visibleCards);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoSlideInterval);
    }
  }, [isPaused, isDragging, services.length, autoSlideInterval, visibleCards]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // Memoize the dots to prevent unnecessary re-renders
  const dotsIndicator = useMemo(() => {
    const maxSlides = Math.max(1, services.length - visibleCards + 1);
    return (
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: maxSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg shadow-white/50'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    );
  }, [services.length, currentIndex, goToSlide, visibleCards]);

  // Handle drag events
  const handleDragStart = useCallback((event: any, info: PanInfo) => {
    setDragStart(info.point.x);
    setIsDragging(true);
    setIsPaused(true);
  }, []);

  const handleDrag = useCallback((event: any, info: PanInfo) => {
    setDragX(info.point.x - dragStart);
  }, [dragStart]);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    const dragDistance = info.point.x - dragStart;
    const threshold = 50; // Minimum drag distance to trigger slide change
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        // Swiped right - go to previous slide
        prevSlide();
      } else {
        // Swiped left - go to next slide
        nextSlide();
      }
    }
    
    setIsDragging(false);
    setIsPaused(false);
    setDragX(0);
  }, [dragStart, prevSlide, nextSlide]);

  return (
    <div 
      className={`relative w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl mx-auto"
        style={{ 
          width: '100%'
        }}
      >
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          animate={{ 
            x: isDragging ? -currentIndex * cardWidth + dragX : -currentIndex * cardWidth 
          }}
          transition={{ 
            type: "tween", 
            duration: isDragging ? 0 : 0.4,
            ease: "easeOut"
          }}
          style={{ 
            width: `${services.length * cardWidth}px`,
            willChange: isDragging ? 'transform' : 'auto'
          }}
          drag="x"
          dragConstraints={{ 
            left: -Math.max(0, services.length - visibleCards) * cardWidth, 
            right: 0 
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          dragElastic={0.05}
          dragMomentum={false}
          dragPropagation={false}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex-shrink-0"
              style={{ 
                width: cardWidth,
                transform: 'translateZ(0)', // Hardware acceleration
                backfaceVisibility: 'hidden',
                paddingLeft: index === 0 ? '0px' : '2px',
                paddingRight: index === services.length - 1 ? '0px' : '2px'
              }}
            >
              <ExpandableServiceCard
                icon={service.icon}
                title={service.title}
                shortDescription={service.shortDescription}
                fullDescription={service.fullDescription}
                className={service.className}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {dotsIndicator}

      {/* Swipe Indicator */}
      <div className="flex justify-center mt-2">
        <div className="flex items-center space-x-2 text-white/60 text-sm">
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span>Swipe to navigate</span>
        </div>
      </div>
    </div>
  );
};

export default SwipeServiceCarousel;
