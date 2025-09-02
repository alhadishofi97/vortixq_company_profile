"use client";
import React from "react";
import { motion } from "framer-motion";
import MagicBento from "@/app/util/reactBits/MagicBento";

const About = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      {/* About Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Us</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Our Mission */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Our Mission</h3>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                We are dedicated to empowering organizations through strategic AI integration and comprehensive cybersecurity solutions. Our expertise bridges the gap between cutting-edge technology and practical business applications.
              </p>
              <p>
                With a team of industry experts, we deliver tailored consulting services that drive innovation, enhance security posture, and create sustainable competitive advantages for our clients.
              </p>
            </div>
          </div>

          {/* Our Approach */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">Our Approach</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Data-Driven */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Data-Driven</h4>
                <p className="text-slate-300 text-sm">We leverage analytics and metrics to inform strategic decisions and measure success.</p>
              </motion.div>

              {/* Client-Focused */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Client-Focused</h4>
                <p className="text-slate-300 text-sm">We prioritize your unique business needs and challenges to deliver customized solutions.</p>
              </motion.div>

              {/* Future-Ready */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Future-Ready</h4>
                <p className="text-slate-300 text-sm">We implement scalable solutions designed to evolve with emerging technologies.</p>
              </motion.div>

              {/* Security-First */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Security-First</h4>
                <p className="text-slate-300 text-sm">We integrate robust security principles into every aspect of our consulting services.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - MagicBento */}
        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <MagicBento 
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={15}
              glowColor="129, 134, 105"
            />
          </div>
        </motion.div> */}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
          <div className="text-slate-300">Projects Completed</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">99%</div>
          <div className="text-slate-300">Client Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
          <div className="text-slate-300">Support Available</div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;