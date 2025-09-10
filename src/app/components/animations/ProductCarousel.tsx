"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, PanInfo } from "framer-motion";
import ProductCard from "./ProductCard";

interface ProductItem {
  id: string;
  title: string;
  description: string;
  dashboardImage: string;
  icon: React.ReactNode;
  details: {
    features: string[];
    capabilities: string[];
  };
}

interface ProductCarouselProps {
  products: ProductItem[];
  onProductClick: (product: ProductItem) => void;
  className?: string;
  autoSlideInterval?: number;
  pauseOnHover?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  products, 
  onProductClick,
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
          newCardWidth = Math.min(containerWidth - 16, 320);
        } else if (containerWidth < 768) { // Small tablet
          newVisibleCards = 1;
          newCardWidth = Math.min(containerWidth - 32, 400);
        } else if (containerWidth < 1024) { // Tablet
          newVisibleCards = 1;
          newCardWidth = Math.min(containerWidth - 48, 500);
        } else if (containerWidth < 1280) { // Small desktop
          newVisibleCards = 2;
          newCardWidth = Math.min((containerWidth - 48) / 2, 350);
        } else { // Large desktop
          newVisibleCards = 3;
          newCardWidth = Math.min((containerWidth - 64) / 3, 320);
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
    if (!isPaused && !isDragging && products.length > visibleCards) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, products.length - visibleCards);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoSlideInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, products.length, autoSlideInterval, isDragging, visibleCards]);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused && !isDragging && products.length > visibleCards) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, products.length - visibleCards);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoSlideInterval);
    }
  }, [isPaused, isDragging, products.length, autoSlideInterval, visibleCards]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    resetAutoSlide();
  }, [resetAutoSlide]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - visibleCards);
      return prev >= maxIndex ? 0 : prev + 1;
    });
    resetAutoSlide();
  }, [products.length, visibleCards, resetAutoSlide]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - visibleCards);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    resetAutoSlide();
  }, [products.length, visibleCards, resetAutoSlide]);

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
    const maxSlides = Math.max(1, products.length - visibleCards + 1);
    return (
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2">
          {Array.from({ length: maxSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50'
                  : 'bg-white/40 hover:bg-orange-500/60'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }, [products.length, currentIndex, goToSlide, visibleCards]);

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
    const threshold = 50;
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
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
        className="relative overflow-visible rounded-2xl mx-auto"
        style={{ width: '100%' }}
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
            width: `${products.length * cardWidth}px`,
            willChange: isDragging ? 'transform' : 'auto'
          }}
          drag="x"
          dragConstraints={{ 
            left: -Math.max(0, products.length - visibleCards) * cardWidth, 
            right: 0 
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          dragElastic={0.05}
          dragMomentum={false}
          dragPropagation={false}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ 
                width: cardWidth,
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                paddingLeft: index === 0 ? '0px' : '8px',
                paddingRight: index === products.length - 1 ? '0px' : '8px'
              }}
            >
              <ProductCard
                title={product.title}
                description={product.description}
                dashboardImage={product.dashboardImage}
                icon={product.icon}
                onLearnMore={() => onProductClick(product)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {dotsIndicator}

      {/* Swipe Indicator */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2 text-white/60 text-sm">
          <motion.div
            className="w-2 h-2 bg-orange-500 rounded-full"
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

export default ProductCarousel;
