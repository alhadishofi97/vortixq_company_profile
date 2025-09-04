"use client";
import React from "react";
import { motion } from "framer-motion";

const GlassMorphismBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Bokeh Light Effect - Bottom Center */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="w-96 h-96 rounded-full bg-gradient-radial from-brand-highlight1/40 via-brand-highlight1/20 to-transparent blur-3xl" />
      </motion.div>
      
      {/* Secondary Bokeh Light - Smaller */}
      <motion.div
        className="absolute bottom-20 left-1/3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
      >
        <div className="w-64 h-64 rounded-full bg-gradient-radial from-brand-secondary/30 via-brand-secondary/15 to-transparent blur-2xl" />
      </motion.div>
      
      {/* Third Bokeh Light - Top Right */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 3, delay: 1, ease: "easeOut" }}
      >
        <div className="w-80 h-80 rounded-full bg-gradient-radial from-brand-highlight2/25 via-brand-highlight2/10 to-transparent blur-3xl" />
      </motion.div>
      
      {/* Curved Lines Pattern - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
        <motion.svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 800 400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#A59489" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C16B32" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Curved Lines */}
          <motion.path
            d="M0,350 Q200,300 400,320 T800,280"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,380 Q150,340 350,360 T700,320"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.5, delay: 2.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,400 Q100,370 300,380 T600,350"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 2.4, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>
      
      {/* Floating Glass Morphism Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-20 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 2, delay: 1 }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/3 w-24 h-16 rounded-xl backdrop-blur-md bg-white/3 border border-white/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 2.5, delay: 1.2 }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/2 w-28 h-18 rounded-2xl backdrop-blur-md bg-white/4 border border-white/8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.25, x: 0 }}
        transition={{ duration: 2.2, delay: 1.5 }}
      />
    </div>
  );
};

export default GlassMorphismBackground;
