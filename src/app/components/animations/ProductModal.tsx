"use client";
import React from "react";
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
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-slate-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <motion.div
                  className="text-orange-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {product.icon}
                </motion.div>
                <h2 className="text-2xl font-bold text-white">{product.title}</h2>
              </div>
              <motion.button
                onClick={onClose}
                className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)] overflow-hidden">
              {/* Left Side - Dashboard Preview */}
              <div className="lg:w-2/3 p-6">
                <motion.div
                  className="relative rounded-lg overflow-hidden bg-black/50 border border-white/10 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <img
                    src={product.dashboardImage}
                    alt={`${product.title} Dashboard`}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>

                {/* Additional Dashboard Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                    >
                      <div className="h-20 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-orange-400 rounded-full" />
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 bg-white/20 rounded mb-1" />
                        <div className="h-2 bg-white/10 rounded w-3/4" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side - Features & Capabilities */}
              <div className="lg:w-1/3 p-6 bg-gradient-to-b from-slate-800/50 to-gray-900/50 border-l border-white/10">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-orange-400 mb-6">Key Features & Capabilities:</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Core Features</h4>
                      <ul className="space-y-2">
                        {product.details.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3 text-sm text-slate-300"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Advanced Capabilities</h4>
                      <ul className="space-y-2">
                        {product.details.capabilities.map((capability, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3 text-sm text-slate-300"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{capability}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/10 bg-gradient-to-r from-slate-800/50 to-gray-900/50">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-4 h-4 bg-orange-400 rounded-full" />
                </motion.div>
                <span className="text-sm text-slate-300">Powered by Vortiqx AI</span>
              </div>
              
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book a Demo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
