"use client";
import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Kunci scroll halaman belakang saat modal terbuka (termasuk iOS)
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      (document.documentElement as HTMLElement).style.overscrollBehavior = "none";
      (document.body as HTMLElement).style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      (document.documentElement as HTMLElement).style.overscrollBehavior = "";
      (document.body as HTMLElement).style.overscrollBehavior = "";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      (document.documentElement as HTMLElement).style.overscrollBehavior = "";
      (document.body as HTMLElement).style.overscrollBehavior = "";
    };
  }, [isOpen]);

  if (!product || !mounted) return null;

  // Modal menggunakan Flowbite Card with Image structure
  const modalTree = (
    <AnimatePresence>
      {isOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex={-1}
          aria-hidden="false"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal content - Flowbite Card structure */}
          <motion.div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-lg shadow"
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
            {/* Close button */}
            <motion.button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </motion.button>

            {/* Card with Image - Flowbite structure */}
            <div className="flex flex-col md:flex-row">
              {/* Image section */}
              <motion.div 
                className="relative w-full md:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Image
                  src={product.dashboardImage}
                  alt={`${product.title} Dashboard`}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg md:rounded-l-lg md:rounded-t-none"></div>
                <motion.div 
                  className="absolute bottom-4 right-4 text-orange-400"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
                >
                  {product.icon}
                </motion.div>
              </motion.div>

              {/* Content section */}
              <motion.div 
                className="flex-1 p-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {/* Header */}
                <motion.h3 
                  id="modal-title" 
                  className="mb-4 text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  {product.title}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className="mb-4 text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  {product.description}
                </motion.p>

                {/* Features & Capabilities */}
                <motion.div 
                  id="modal-description" 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <h4 className="mb-3 text-lg font-semibold text-white">Key Features & Capabilities:</h4>
                  <ul className="space-y-2">
                    {product.details.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.9 + (index * 0.1), duration: 0.2, type: "spring" }}
                        ></motion.div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                    {product.details.capabilities.map((capability, index) => (
                      <motion.li 
                        key={`cap-${index}`} 
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + ((product.details.features.length + index) * 0.1), duration: 0.3 }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.9 + ((product.details.features.length + index) * 0.1), duration: 0.2, type: "spring" }}
                        ></motion.div>
                        <span className="text-gray-300 text-sm">{capability}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Action buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
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
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(234, 88, 12, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.3, type: "spring" }}
                  >
                    Book a Demo
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.3, type: "spring" }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalTree, document.body);
};

export default ProductModal;