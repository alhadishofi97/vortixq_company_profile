"use client";
import React from "react";
import { motion } from "framer-motion";
import GlassMorphismBackground from "@/Components/GlassMorphismBackground/GlassMorphismBackground";

const AirisProductPage: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-100 font-sans">
      <GlassMorphismBackground />
      <div className="relative mx-auto w-[90%] py-24 bg-transparent">
        {/* Animated background blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-brand-highlight1/10 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -right-24 w-80 h-80 rounded-full bg-brand-secondary/10 blur-3xl animate-pulse-glow" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              One Platform. One Brain.<br />
              <span className="text-white/80">End-to-End Cyber Resilience</span>
            </h1>
            <div className="w-full h-px bg-gradient-to-r from-brand-highlight1 to-brand-secondary animate-gradient-x"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AirisProductPage;