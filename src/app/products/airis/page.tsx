"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SpotlightCard from "../../components/SpotlightCard";
import GlassMorphismBackground from "@/Components/GlassMorphismBackground/GlassMorphismBackground";

const AirisProductPage: React.FC = () => {

  const features = [
    {
      title: "AI - Red Team Simulation",
      description: "Advanced AI-powered red team exercises to identify vulnerabilities before attackers do."
    },
    {
      title: "AI - Threat Intelligence Dashboard", 
      description: "Real-time threat intelligence with AI-driven analysis and predictive insights."
    },
    {
      title: "AI - CISO Bot",
      description: "Intelligent CISO assistant providing strategic security guidance and recommendations."
    },
    {
      title: "AI - Governance, Risk and Compliance (GRC)",
      description: "Automated GRC management with AI-powered risk assessment and compliance monitoring."
    },
    {
      title: "AI - Risk Quantification",
      description: "Advanced risk quantification models to measure and prioritize security investments."
    },
    {
      title: "Real Time Executive Dashboard",
      description: "Comprehensive executive dashboard providing real-time security posture visibility."
    }
  ];

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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[70vh]">
            {/* Left Column - Features */}
            <div className="space-y-6">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <SpotlightCard 
                    className={`custom-spotlight-card border-white/10 backdrop-blur-sm p-6 ${
                      index % 2 === 0 ? 'bg-white/5' : 'bg-gradient-to-br from-brand-highlight1/10 to-brand-secondary/10'
                    }`}
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <h3 className="font-display text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs xs:text-sm text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* Center Column - Brain Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <Image
                  src="/brain2.png"
                  alt="AI Brain"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Column - Features */}
            <div className="space-y-6">
              {features.slice(3, 6).map((feature, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index + 3) * 0.1 }}
                >
                  <SpotlightCard 
                    className={`custom-spotlight-card border-white/10 backdrop-blur-sm p-6 ${
                      (index + 3) % 2 === 0 ? 'bg-white/5' : 'bg-gradient-to-br from-brand-highlight1/10 to-brand-secondary/10'
                    }`}
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <h3 className="font-display text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs xs:text-sm text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-brand-highlight1/10 to-brand-secondary/10 rounded-3xl p-8 border border-brand-highlight2/20 animate-float-slow">
              <h3 className="font-display text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
                Ready to Transform Your Security & Compliance?
              </h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-sm xs:text-base sm:text-lg leading-relaxed text-center">
                Experience the power of AI-native cybersecurity and compliance management. 
                Get started with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    const section = document.getElementById("contact");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3 border border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Request Demo
                </button>
                {/* <button className="px-8 py-3 border border-brand-highlight2/20 text-white font-semibold rounded-xl hover:bg-brand-highlight2/10 transition-all duration-200">
                  Learn More
                </button> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AirisProductPage;
