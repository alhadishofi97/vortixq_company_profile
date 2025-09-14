"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scale" | "parallax" | "stagger";
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  staggerChildren = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const getAnimationProps = () => {
    switch (animation) {
      case "fadeInUp":
        return {
          initial: { opacity: 0, y: 40 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
          transition: { 
            duration, 
            delay, 
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            type: "spring" as const,
            stiffness: 100,
            damping: 15
          }
        };
      case "fadeInLeft":
        return {
          initial: { opacity: 0, x: -40 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 },
          transition: { 
            duration, 
            delay, 
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            type: "spring" as const,
            stiffness: 100,
            damping: 15
          }
        };
      case "fadeInRight":
        return {
          initial: { opacity: 0, x: 40 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 },
          transition: { 
            duration, 
            delay, 
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            type: "spring" as const,
            stiffness: 100,
            damping: 15
          }
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
          transition: { 
            duration, 
            delay, 
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            type: "spring" as const,
            stiffness: 120,
            damping: 18
          }
        };
      default:
        return {
          initial: { opacity: 0, y: 40 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
          transition: { 
            duration, 
            delay, 
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            type: "spring" as const,
            stiffness: 100,
            damping: 15
          }
        };
    }
  };

  if (animation === "parallax") {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ y, opacity }}
      >
        {children}
      </motion.div>
    );
  }

  if (animation === "stagger") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: staggerChildren
            }
          }
        }}
      >
        {children}
      </motion.div>
    );
  }

  const animationProps = getAnimationProps();

  return (
    <motion.div
      ref={ref}
      className={className}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
