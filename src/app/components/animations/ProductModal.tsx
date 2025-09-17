"use client";
import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

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
          <div className="absolute inset-0 bg-black/80" onClick={onClose} />

          {/* Modal content - Flowbite Card structure */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow dark:bg-gray-800">
            {/* Close button */}
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            {/* Card with Image - Flowbite structure */}
            <div className="flex flex-col md:flex-row">
              {/* Image section */}
              <div className="relative w-full md:w-1/2">
                <Image
                  src={product.dashboardImage}
                  alt={`${product.title} Dashboard`}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg md:rounded-l-lg md:rounded-t-none"></div>
                <div className="absolute bottom-4 right-4 text-orange-400">
                  {product.icon}
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 p-6">
                {/* Header */}
                <h3 id="modal-title" className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>

                {/* Features & Capabilities */}
                <div id="modal-description" className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Key Features & Capabilities:</h4>
                  <ul className="space-y-2">
                    {product.details.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                    {product.details.capabilities.map((capability, index) => (
                      <li key={`cap-${index}`} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
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
                  >
                    Book a Demo
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </button>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalTree, document.body);
};

export default ProductModal;