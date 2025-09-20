"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, PanInfo } from "framer-motion";
import ProductCard from "./ProductCard";

interface ProductItem {
  id: string;
  title: string;
  description: string;
  dashboardImage: string;
  icon: string;
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
        
        // Jika hanya ada 1 produk, posisikan di tengah
        if (products.length === 1) {
          newVisibleCards = 1;
          newCardWidth = Math.min(containerWidth * 0.8, 600); // 80% dari container width, max 600px
        } else {
          if (containerWidth < 640) { // Mobile
            newVisibleCards = 1;
            newCardWidth = Math.min(containerWidth - 16, 400);
          } else if (containerWidth < 768) { // Small tablet
            newVisibleCards = 1;
            newCardWidth = Math.min(containerWidth - 32, 450);
          } else if (containerWidth < 1024) { // Tablet
            newVisibleCards = 1;
            newCardWidth = Math.min(containerWidth - 48, 500);
          } else if (containerWidth < 1280) { // Small desktop
            newVisibleCards = 1;
            newCardWidth = Math.min(containerWidth - 48, 600);
          } else { // Large desktop
            newVisibleCards = 2;
            newCardWidth = Math.min((containerWidth - 64) / 2, 500);
          }
        }
        
        setCardWidth(newCardWidth);
        setVisibleCards(newVisibleCards);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, [products.length]);

  // Auto slide functionality - tidak berjalan jika hanya ada 1 produk
  useEffect(() => {
    if (!isPaused && !isDragging && products.length > visibleCards && products.length > 1) {
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
    if (!isPaused && !isDragging && products.length > visibleCards && products.length > 1) {
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
      <div className="flex justify-center mt-4 sm:mt-6">
        <div className="flex items-center gap-2">
          {Array.from({ length: maxSlides }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-orange-500' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }, [products.length, currentIndex, visibleCards]);

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
    const threshold = 30; // Reduced threshold for more responsive swipe
    const velocity = Math.abs(info.velocity.x);
    
    // More responsive: check distance OR velocity
    if (Math.abs(dragDistance) > threshold || velocity > 0.5) {
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
        className="relative rounded-2xl mx-auto"
        style={{ width: '100%' }}
      >
        <motion.div
          className={`flex cursor-grab active:cursor-grabbing ${products.length === 1 ? 'justify-center' : ''}`}
          animate={{ 
            x: products.length === 1 
              ? 0 // Untuk 1 produk, posisikan di tengah (x = 0)
              : isDragging ? -currentIndex * cardWidth + dragX : -currentIndex * cardWidth 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 30,
            mass: 0.8,
            duration: isDragging ? 0 : 0.6
          }}
          style={{ 
            width: products.length === 1 ? '100%' : `${products.length * cardWidth}px`,
            willChange: isDragging ? 'transform' : 'auto'
          }}
          drag={products.length > 1 ? "x" : false} // Disable drag untuk 1 produk
          dragConstraints={{ 
            left: -Math.max(0, products.length - visibleCards) * cardWidth, 
            right: 0 
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          dragElastic={0.1}
          dragMomentum={false}
          dragPropagation={false}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ 
                width: cardWidth,
                maxWidth: cardWidth,
                minWidth: cardWidth
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

      {/* No dots indicator needed for 1 page layout */}
    </div>
  );
};

export default ProductCarousel;
