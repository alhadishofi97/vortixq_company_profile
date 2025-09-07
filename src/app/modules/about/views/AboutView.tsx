"use client";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    "Data Driven",
    "Future Ready", 
    "Client-Focused",
    "Security-First"
  ];

  return (
    <div className="relative mx-auto w-[90%] py-24 bg-transparent">
      {/* Animated Background Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 right-1/4 w-64 h-64 rounded-full bg-brand-highlight1/10 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-80 rounded-full bg-brand-secondary/10 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-10 w-48 h-48 rounded-full bg-brand-highlight1/5 blur-2xl animate-pulse-glow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        {/* Left Section - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          {/* About Us Button */}
          {/* <div className="mb-6">
            <button className="px-4 py-2 border border-white/20 text-white text-sm rounded-lg hover:bg-white/10 transition-all duration-200">
              About Us
            </button>
          </div> */}

          {/* Main Heading */}
          <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            <span className="text-white">About Our</span><br />
            <span className="text-white/80">AI Solutions</span>
          </h2>

          {/* Description */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-1xl text-left justify-center">
            We are dedicated to empowering organizations through strategic AI integration and comprehensive cybersecurity solutions. Our expertise bridges the gap between cutting-edge technology and practical business applications. With a team of industry experts, we deliver tailored consulting services that drive innovation, enhance security posture, and create sustainable competitive advantages for our clients.
          </p>
          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              let icon;
              switch (feature) {
                case "Data Driven":
                  icon = (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                      <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                      <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                      <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                    </svg>
                  );
                  break;
                case "Future Ready":
                  icon = (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                  );
                  break;
                case "Client-Focused":
                  icon = (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                  );
                  break;
                case "Security-First":
                  icon = (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                  );
                  break;
                default:
                  icon = (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  );
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-highlight1 to-brand-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-white">
                      {icon}
                    </div>
                  </div>
                  <span className="text-white text-sm xs:text-base font-medium">{feature}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Section - Video Background with Glassmorphism Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              width={200}
              height={200}
              preload="auto"
              onLoadStart={() => console.log('Video load started')}
              onLoadedData={() => console.log('Video data loaded')}
              onError={(e) => console.log('Video error:', e)}
            >
              <source src="/videos/brain.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
