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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            role="dialog"
            aria-describedby="modal-description"
            aria-labelledby="modal-title"
            className="relative w-full max-w-sm sm:max-w-lg md:max-w-4xl lg:max-w-6xl h-auto max-h-[95vh] rounded-lg sm:rounded-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col mx-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex flex-col space-y-1.5 text-center sm:text-left p-3 sm:p-4 border-b border-white/10">
              <h2 id="modal-title" className="tracking-tight text-xl sm:text-2xl font-bold text-white">
                {product.title}
              </h2>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 p-3 sm:p-4 flex-1 overflow-y-auto">
              {/* Dashboard Image */}
              <div className="flex flex-col order-1 lg:order-1">
                <div className="relative overflow-hidden rounded-lg flex-1">
                  <Image
                    src={product.dashboardImage}
                    alt={`${product.title} Dashboard`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                    style={{ maxHeight: '50vh' }}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 right-4">
                    <div className="text-orange-400">
                      {product.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features & Capabilities */}
              <div className="flex flex-col justify-between order-2 lg:order-2 px-2 sm:px-4 pt-2 sm:pt-4 pb-2 sm:pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Key Features & Capabilities:</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {product.details.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                    {product.details.capabilities.map((capability, index) => (
                      <li key={`cap-${index}`} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed text-sm sm:text-base">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 sm:pt-6 mt-4 border-t border-white/10">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        if (window.location.pathname !== '/') {
                          window.location.href = '/#contact';
                        } else {
                          setTimeout(() => {
                            const contactSection = document.getElementById("contact");
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }, 100);
                        }
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 text-sm"
                    >
                      Book a Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4 text-white">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;