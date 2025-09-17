"use client";
import React from "react";
import Image from "next/image";

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
    <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-start justify-center p-4 pt-8`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="text-orange-500">
              {product.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">
              {product.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="relative">
              <Image
                src={product.dashboardImage}
                alt={`${product.title} Dashboard`}
                width={800}
                height={600}
                className="w-full h-64 lg:h-full object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 right-4 text-orange-400">
                {product.icon}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed">
                {product.description}
              </p>

              {/* Features & Capabilities */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Key Features & Capabilities:
                </h4>
                <ul className="space-y-2">
                  {product.details.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {product.details.capabilities.map((capability, index) => (
                    <li key={`cap-${index}`} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {capability}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-700 bg-gray-900">
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
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-colors"
          >
            Book a Demo
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowbiteProductModal;
