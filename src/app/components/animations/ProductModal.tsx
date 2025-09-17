"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetails {
  id: string;
  title: string;
  description: string;
  dashboardImage: string;
  icon: React.ReactNode;
  details: {
    features: string[];
    capabilities: string[];
  };
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetails | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = 'unset';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0'
          }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998
            }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full h-full sm:max-w-lg md:max-w-4xl lg:max-w-6xl sm:h-auto sm:max-h-[95vh] sm:rounded-lg sm:rounded-xl border border-white/20 shadow-2xl overflow-y-auto flex flex-col mx-auto"
            style={{ 
              backgroundColor: '#000000',
              position: 'relative',
              zIndex: 10000,
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%'
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                <motion.div
                  className="text-orange-400 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {product.icon}
                  </div>
                </motion.div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">{product.title}</h2>
              </div>
              <motion.button
                onClick={onClose}
                className="text-white/60 hover:text-white p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0">
              {/* Dashboard Image - Full width on mobile, 2/3 on desktop */}
              <div className="w-full lg:w-2/3 p-4 sm:p-4 flex-shrink-0">
                <motion.div
                  className="relative rounded-lg overflow-hidden border border-white/10 w-full h-fit"
                  style={{ backgroundColor: '#000000' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Image
                    src={product.dashboardImage}
                    alt={`${product.title} Dashboard`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                    style={{ 
                      maxHeight: 'calc(90vh - 200px)'
                    }}
                    priority
                  />
                </motion.div>
              </div>

              {/* Features & Capabilities - Full width on mobile, 1/3 on desktop */}
              <div className="w-full lg:w-1/3 px-4 sm:px-4 pt-4 sm:pt-4 pb-4 sm:pb-4 lg:border-l border-white/10 flex flex-col" style={{ backgroundColor: '#000000' }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex-1 overflow-y-auto lg:overflow-hidden"
                >
                  <h3 className="text-sm sm:text-lg font-bold text-orange-400 mb-2 sm:mb-3">Key Features & Capabilities:</h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h4 className="text-xs sm:text-base font-semibold text-white mb-1.5">Core Features</h4>
                      <ul className="space-y-1">
                        {product.details.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-base font-semibold text-white mb-1.5">Advanced Capabilities</h4>
                      <ul className="space-y-1">
                        {product.details.capabilities.map((capability, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{capability}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
                
                {/* Footer inside right panel */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-2 pt-2 sm:pt-4 border-t border-white/10 mt-2 sm:mt-4 flex-shrink-0">
                  
                  <motion.button
                    onClick={() => {
                      // Close modal first
                      onClose();
                      // Navigate to home page and then contact section immediately
                      // If we're not on home page, navigate to home first
                      if (window.location.pathname !== '/') {
                        window.location.href = '/#contact';
                      } else {
                        // If already on home page, just scroll to contact
                        setTimeout(() => {
                          const contactSection = document.getElementById("contact");
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }, 100);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Book a Demo</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;