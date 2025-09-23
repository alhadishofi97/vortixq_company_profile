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

interface FlowbiteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetails | null;
}

const FlowbiteProductModal: React.FC<FlowbiteProductModalProps> = ({ 
  isOpen, 
  onClose, 
  product 
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Modal Card */}
          <motion.div 
            className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between p-6 border-b border-gray-700 bg-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="text-orange-500"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
            >
              {product.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-white">
              {product.title}
            </h3>
          </div>
          <motion.button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </motion.div>
        
        {/* Body */}
        <motion.div 
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Section */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Image
                src={product.dashboardImage}
                alt={`${product.title} Dashboard`}
                width={800}
                height={600}
                className="w-full h-64 lg:h-full object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <motion.div 
                className="absolute bottom-4 right-4 text-orange-400"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
              >
                {product.icon}
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {/* Description */}
              <motion.p 
                className="text-gray-300 text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {product.description}
              </motion.p>

              {/* Features & Capabilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  Key Features & Capabilities:
                </h4>
                <ul className="space-y-2">
                  {product.details.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + (index * 0.1), duration: 0.3 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + (index * 0.1), duration: 0.2, type: "spring" }}
                      ></motion.div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                  {product.details.capabilities.map((capability, index) => (
                    <motion.li 
                      key={`cap-${index}`} 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + ((product.details.features.length + index) * 0.1), duration: 0.3 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + ((product.details.features.length + index) * 0.1), duration: 0.2, type: "spring" }}
                      ></motion.div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {capability}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          className="flex items-center justify-end gap-3 p-6 border-t border-gray-700 bg-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <motion.button
            onClick={() => {
              onClose();
              if (typeof window !== "undefined") {
                if (window.location.pathname !== "/") {
                  window.location.href = "/#contact";
                } else {
                  setTimeout(() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }, 100);
                }
              }
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(234, 88, 12, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.3, type: "spring" }}
          >
            Book a Demo
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.3, type: "spring" }}
          >
            Close
          </motion.button>
        </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FlowbiteProductModal;
