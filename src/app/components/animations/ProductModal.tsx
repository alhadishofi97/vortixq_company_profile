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

  // Mengikuti struktur yang Anda berikan: wrapper fixed + container + content
  const modalTree = (
    <AnimatePresence>
      {/* Wrapper mengacu ke struktur:
         id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      */}
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden={!isOpen}
        className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-[100000] w-full h-screen`}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        aria-modal="true"
      >
        {/* Backdrop klik untuk menutup */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        {/* Dialog fixed center agar selalu berada di tengah viewport */}
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100001] w-[calc(100%-1rem)] sm:w-auto max-w-2xl">
          {/* Panel konten */}
          <div className="relative bg-neutral-900/90 sm:rounded-lg shadow-sm border border-white/15 backdrop-blur-md flex flex-col max-h-[90svh] sm:max-h-[85vh]">
            {/* Header: mempertahankan konten judul yang ada */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-5 border-b sm:rounded-t border-gray-200/10 bg-neutral-900/90 backdrop-blur-md">
              <h3 id="modal-title" className="text-xl font-semibold text-white">
                {product.title}
              </h3>
              <button
                type="button"
                className="text-gray-300 bg-transparent hover:bg-white/10 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Close"
                onClick={onClose}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>

            {/* Body: mempertahankan isi konten sebelumnya (gambar + fitur & kapabilitas) */}
            <div id="modal-description" className="p-4 md:p-5 space-y-4 flex-1 overflow-y-auto">
              {/* Dashboard Image */}
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={product.dashboardImage}
                  alt={`${product.title} Dashboard`}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg object-contain sm:object-cover"
                  style={{ maxHeight: "40svh" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 text-orange-400">
                  {product.icon}
                </div>
              </div>

              {/* Features & Capabilities */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Key Features &amp; Capabilities:</h3>
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
            </div>

            {/* Footer: tombol Book a Demo di paling bawah */}
            <div className="flex items-center justify-end p-4 md:p-5 border-t border-white/10 sm:rounded-b bg-neutral-900/95 backdrop-blur">
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
                className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalTree, document.body);
};

export default ProductModal;