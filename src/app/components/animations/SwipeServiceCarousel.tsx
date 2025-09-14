"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const GAP = 12;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(400);
  const [visibleCards, setVisibleCards] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const currentContainerWidth = carouselRef.current.offsetWidth;
        setContainerWidth(currentContainerWidth);
        const isMobile = currentContainerWidth < 768;
        const newVisibleCards = currentContainerWidth >= 1280 ? 2 : 1;
        
        if (isMobile) {
          // Mobile: card dengan margin yang cukup untuk mencegah penumpukan
          const mobileMargin = 24; // 12px * 2 (px-2 = 8px + extra margin)
          setCardWidth(currentContainerWidth - mobileMargin);
        } else {
          // Desktop: card dengan padding dan gap
          const totalGaps = (newVisibleCards - 1) * GAP;
          const padding = 32; // Account for container padding (16px * 2)
          const availableWidth = currentContainerWidth - padding;
          const computedCardWidth = Math.floor((availableWidth - totalGaps) / newVisibleCards);
          
          // Ensure minimum card width for readability
          const minCardWidth = 280;
          const maxCardWidth = 500;
          const responsiveCardWidth = Math.max(minCardWidth, Math.min(computedCardWidth, maxCardWidth));
          
          setCardWidth(responsiveCardWidth);
        }
        
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
  }, [services.length, visibleCards, resetAutoSlide]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, services.length - visibleCards);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    resetAutoSlide();
  }, [services.length, visibleCards, resetAutoSlide]);

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

  const handleServiceSelect = useCallback((serviceId: string) => {
    setSelectedServiceId(selectedServiceId === serviceId ? null : serviceId);
  }, [selectedServiceId]);


  // Handle drag events
  const handleDragStart = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragStart(info.point.x);
    setIsDragging(true);
    setIsPaused(true);
  }, []);

  const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragX(info.point.x - dragStart);
  }, [dragStart]);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
        className="relative rounded-2xl mx-auto overflow-hidden"
        style={{ 
          width: '100%',
          padding: '0',
          isolation: 'isolate'
        }}
      >
        <motion.div
          className="flex cursor-grab active:cursor-grabbing relative"
          animate={{ 
            x: containerWidth < 768 
              ? isDragging ? -currentIndex * cardWidth + dragX : -currentIndex * cardWidth
              : isDragging ? -currentIndex * (cardWidth + GAP) + dragX : -currentIndex * (cardWidth + GAP)
          }}
          transition={{ 
            type: "spring", 
            stiffness: 250,
            damping: 35,
            mass: 0.6,
            duration: isDragging ? 0 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{ 
            width: containerWidth < 768 ? `${services.length * cardWidth}px` : `${services.length * cardWidth + (services.length - 1) * GAP}px`,
            willChange: isDragging ? 'transform' : 'auto'
          }}
          drag="x"
          dragConstraints={{ 
            left: containerWidth < 768 
              ? -Math.max(0, services.length - visibleCards) * cardWidth
              : -Math.max(0, services.length - visibleCards) * (cardWidth + GAP), 
            right: 0 
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          dragElastic={0.1}
          dragMomentum={true}
          dragPropagation={false}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex-shrink-0 relative"
              style={{ 
                width: cardWidth,
                transform: 'translateZ(0)', // Hardware acceleration
                backfaceVisibility: 'hidden',
                paddingLeft: containerWidth < 768 ? '0px' : (index === 0 ? '0px' : `${GAP}px`),
                paddingRight: containerWidth < 768 ? '0px' : (index === services.length - 1 ? '0px' : `${GAP}px`),
                marginRight: containerWidth < 768 ? '0px' : (index === services.length - 1 ? '0px' : `${GAP}px`),
                zIndex: index === currentIndex ? 10 : 1
              }}
            >
              <ExpandableServiceCard
                icon={service.icon}
                title={service.title}
                shortDescription={service.shortDescription}
                fullDescription={service.fullDescription}
                className={service.className}
                isSelected={selectedServiceId === service.id}
                onSelect={() => handleServiceSelect(service.id)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Navigation Arrows */}
      {services.length > 1 && (
        <div className="flex justify-center items-center gap-8 mt-6 sm:hidden">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <svg 
              className="w-6 h-6 text-orange-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= Math.max(0, services.length - visibleCards)}
          >
            <svg 
              className="w-6 h-6 text-orange-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Desktop/Tablet Dots Indicator */}
      {services.length > 1 && (
        <div className="hidden sm:flex justify-center mt-4 sm:mt-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: Math.max(1, services.length - visibleCards + 1) }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-out ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50'
                    : 'bg-orange-500/40 hover:bg-orange-500/60 active:bg-orange-500/80'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Swipe Indicator */}
      {services.length > 1 && (
        <div className="flex justify-center mt-3 sm:mt-4">
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-white/50 sm:text-white/60 text-xs sm:text-sm">
            <motion.div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="hidden xs:inline">Swipe to navigate</span>
            <span className="xs:hidden">Swipe</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeServiceCarousel;
