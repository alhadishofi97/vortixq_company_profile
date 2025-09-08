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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
          initial: { opacity: 0, y: 60 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
          transition: { duration, delay }
        };
      case "fadeInLeft":
        return {
          initial: { opacity: 0, x: -60 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 },
          transition: { duration, delay }
        };
      case "fadeInRight":
        return {
          initial: { opacity: 0, x: 60 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 },
          transition: { duration, delay }
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
          transition: { duration, delay }
        };
      default:
        return {
          initial: { opacity: 0, y: 60 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
          transition: { duration, delay }
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
