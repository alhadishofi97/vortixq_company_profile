"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductsView: React.FC = () => {
  const router = useRouter();

  return (
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
        <div className="mb-16 text-left">
          <div className="flex items-center gap-4 mb-6 text-left">
            {/* <div className="w-12 h-12 bg-gradient-to-br from-brand-highlight1 to-brand-secondary rounded-xl flex items-center justify-center text-left">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div> */}
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight text-left">
              Our Products
            </h1>
          </div>
          {/* <h2 className="font-display text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-white mb-8 tracking-wide leading-relaxed">
            SOLUSI CYBERSECURITY TERDEPAN
          </h2> */}
          <div className="w-full h-px bg-gradient-to-r from-brand-highlight1 to-brand-secondary animate-gradient-x text-left"></div>
        </div>

        {/* AIRIS Product Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-brand-highlight1/5 to-brand-secondary/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Product Image */}
              <div className="flex justify-start">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <Image
                    src="/airis.png"
                    alt="AIRIS Platform"
                    fill
                    className="object-contain rounded-2xl"
                    priority
                  />
                </div>
              </div>
              
              {/* Product Description */}
              <div className="text-left">
                <h3 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  AIRIS Platform
                </h3>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-6 text-justify">
                  A revolutionary AI-native cybersecurity and compliance platform, AIRIS provides real-time protection, compliance automation, and intelligent risk assessment for organizations of all sizes. An integrated solution that is proactive and continuously adapts to evolving threats.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                  <button 
                    onClick={() => router.push('/products/airis')}
                    className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                    // sx={{ borderRadius: 12, px: 4, borderColor: 'rgba(193,107,50,0.5)', color: '#C16B32', '&:hover': { borderColor: 'rgba(165,148,137,0.6)', color: '#A59489' } }}
                  >
                    Learn More
                  </button>
                  {/* <button className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200">
                    Request Demo
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className=""
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
                <button className="px-8 py-3 border border-brand-highlight2/20 text-white font-semibold rounded-xl hover:bg-brand-highlight2/10 transition-all duration-200">
                  Request Demo
                </button>
                {/* <button className="px-8 py-3 border border-brand-highlight2/20 text-white font-semibold rounded-xl hover:bg-brand-highlight2/10 transition-all duration-200">
                  Learn More
                </button> */}
              </div>
            </div>
          </motion.div>

        {/* Features Preview */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="font-display text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Key Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-brand-highlight1/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-highlight1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-display text-sm xs:text-base sm:text-lg font-semibold text-white mb-2">Real-time Protection</h4>
              <p className="text-xs xs:text-sm text-text-secondary leading-relaxed">
                Deteksi dan respons ancaman secara real-time dengan teknologi AI terdepan
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-brand-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-display text-sm xs:text-base sm:text-lg font-semibold text-white mb-2">Automated Compliance</h4>
              <p className="text-xs xs:text-sm text-text-secondary leading-relaxed">
                Otomatisasi proses compliance untuk mengurangi biaya dan waktu audit hingga 80%
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-brand-highlight1/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-highlight1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-display text-sm xs:text-base sm:text-lg font-semibold text-white mb-2">Intelligent Risk Assessment</h4>
              <p className="text-xs xs:text-sm text-text-secondary leading-relaxed">
                Penilaian risiko cerdas dengan visibilitas keamanan yang meningkat hingga 90%
              </p>
            </div>
          </div>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default ProductsView;
