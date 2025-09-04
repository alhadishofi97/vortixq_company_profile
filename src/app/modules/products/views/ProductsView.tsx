"use client";
import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "../../../components/SpotlightCard";
import KeyFeatures from "../components/KeyFeatures";

const ProductsView: React.FC = () => {

  const valueProps = [
    "Reduce compliance costs by up to 60%",
    "Accelerate audit preparation time by 80%",
    "Improve security posture visibility by 90%",
    "Minimize manual compliance tasks by 75%"
  ];

  const technologies = [
    "Machine Learning & AI Algorithms",
    "Real-time Data Processing",
    "Cloud-native Architecture"
  ];

  return (
    <div className="relative mx-auto w-[90%] py-24 bg-transparent">
      {/* Background Video */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/videos/hacker-background.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Animated background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-brand-cyan/20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-20 -right-24 w-80 h-80 rounded-full bg-brand-purple/20 blur-3xl animate-pulse-glow" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan to-brand-purple rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Products
            </h1>
          </div>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-medium text-white mb-8 tracking-wide leading-relaxed">
            AI-NATIVE CYBERSECURITY & COMPLIANCE PLATFORM
          </h2>
          <div className="w-full h-px bg-gradient-to-r from-brand-highlight1 to-brand-secondary animate-gradient-x"></div>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-10 bg-brand-cyan/20 rounded-lg flex 
            items-center justify-center">
              <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">VISION</h3>
          </div>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-4xl mx-auto">
            To revolutionize cybersecurity and compliance management through AI-native solutions that provide 
            real-time protection, automated compliance, and intelligent risk assessment for organizations 
            of all sizes. We envision a future where security and compliance are seamlessly integrated, 
            proactive, and continuously adaptive to emerging threats.
          </p>
          <div className="w-full h-px bg-gradient-to-r from-brand-highlight1 to-brand-secondary mt-8 animate-gradient-x"></div>
        </motion.div>

        {/* Key Features Section - Now using ScrollStack */}
        <KeyFeatures />

        {/* Value Proposition Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-10 bg-brand-cyan/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">VALUE PROPOSITION</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
              >
                <SpotlightCard 
                  className="custom-spotlight-card border-white/10 bg-white/5 backdrop-blur-sm p-4" 
                  spotlightColor="rgba(124, 58, 237, 0.2)"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0"></div>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{prop}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
          <div className="w-full h-px bg-gradient-to-r from-brand-cyan to-brand-purple mt-8"></div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">TECHNOLOGY</h3>
          <div className="space-y-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
              >
                <SpotlightCard 
                  className="custom-spotlight-card border-white/10 bg-white/5 backdrop-blur-sm p-4" 
                  spotlightColor="rgba(0, 229, 255, 0.15)"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0"></div>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{tech}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className=""
        >
          <div className="bg-gradient-to-r from-brand-highlight1/10 to-brand-secondary/10 rounded-3xl p-8 border border-brand-highlight2/20 animate-float-slow">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
              Ready to Transform Your Security & Compliance?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Experience the power of AI-native cybersecurity and compliance management. 
              Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-brand-highlight1 to-brand-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-200">
                Request Demo
              </button>
              <button className="px-8 py-3 border border-brand-highlight2/20 text-white font-semibold rounded-xl hover:bg-brand-highlight2/10 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductsView;
