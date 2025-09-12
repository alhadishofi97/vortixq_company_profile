"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import LiquidEther from "../../../components/animations/LiquidEther";

const ConsultingServiceView = () => {
  const [selectedService, setSelectedService] = useState(0);

  const mainServices = [
    {
      id: 0,
      title: "Cyber Security Advisory (CSA)",
      description: "Comprehensive cybersecurity advisory services to help organizations build robust security frameworks and maintain compliance with industry standards.",
      icon: "✓",
      isSelected: true
    },
    {
      id: 1,
      title: "Cyber Defense and Operation (CDO)",
      description: "Advanced cyber defense strategies and operational security services to protect against evolving threats.",
      icon: "🛡️",
      isSelected: false
    },
    {
      id: 2,
      title: "AI Security Advisory (AISA)",
      description: "Specialized AI security consulting to ensure safe and secure implementation of artificial intelligence systems.",
      icon: "🏢",
      isSelected: false
    }
  ];

  const subServices = [
    {
      id: 1,
      title: "Cyber Maturity Assessment (CMA)",
      description: "A cybersecurity maturity assessment is a systematic evaluation of an organization's cybersecurity posture.",
      color: "bg-green-500",
      icon: "⚡"
    },
    {
      id: 2,
      title: "ISMS Advisory (ISO 27001)",
      description: "Guiding organizations through ISO 27001 certification via gap analysis, policy development, and risk assessment.",
      color: "bg-purple-500",
      icon: "⭐"
    },
    {
      id: 3,
      title: "Enterprise Security",
      description: "Comprehensive enterprise security solutions tailored to large-scale organizational needs.",
      color: "bg-orange-500",
      icon: "🛡️"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* LiquidEther Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <LiquidEther
          colors={['#2B0B00', '#6B1D00', '#B23A00', '#FF6B00', '#FFD36E']}
          mouseForce={33}
          cursorSize={100}
          isViscous={true}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={false}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
          style={{ opacity: 1, zIndex: 0 }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-[90%] pt-20 pb-24">
        <AnimatedSection animation="fadeInUp">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Consulting Service
            </h1>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {mainServices.map((service) => (
              <motion.button
                key={service.id}
                className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-300 ${
                  selectedService === service.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700/50 text-white hover:bg-gray-600/50'
                }`}
                onClick={() => setSelectedService(service.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{service.icon}</span>
                <span className="font-medium">{service.title}</span>
                {selectedService === service.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Main Service Card */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
            key={selectedService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {mainServices[selectedService].title}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              {mainServices[selectedService].description}
            </p>
          </motion.div>

          {/* Sub Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {subServices.map((service, index) => (
              <motion.div
                key={service.id}
                className={`${service.color} rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-sm font-medium">0{service.id}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm opacity-90 mb-4">{service.description}</p>
                <div className="flex justify-end">
                  <span className="text-white/70">↓</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((dot, index) => (
                <div
                  key={dot}
                  className={`w-2 h-2 rounded-full ${
                    index < 2 ? 'bg-orange-500' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm">Swipe to navigate</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ConsultingServiceView;
