"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FlowbiteProductModal from "../../components/animations/FlowbiteProductModal";
import ProductCard from "../../components/animations/ProductCard";
import SvgRenderer from "../../util/svgRendered";
// import { Product2 } from "@/app/modules/products/controllers/productInterface";
import { getProduct } from "@/app/modules/products/controllers/ProductController";
import { useRouter, useParams } from "next/navigation";

interface details {
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

const DynamicProductPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<details | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listproducts, setlistproducts] = useState<details[]>([]);
  const [judul, setJudul] = useState('');
  const [subjudul, setSubJudul] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const products = await getProduct();
        
        if (!products || products.length === 0) {
          router.replace('/');
          return;
        }

        // Find product by slug (id_content)
        // console.log('Available products:', products.map(p => ({ id: p.id, title: p.title })));
        // console.log('Looking for slug:', slug);
        
        const currentProduct = products.find(p => p.id === slug);
        
        if (!currentProduct) {
          // console.log('Product not found for slug:', slug);
          router.replace('/');
          return;
        }

        // console.log('Found product:', currentProduct);

        setJudul(currentProduct.judul2 || currentProduct.title);
        setSubJudul(currentProduct.subjudul2 || currentProduct.description);

        // Parse features dari string dengan line breaks menjadi array
        const parseFeatures = (fiturText: string) => {
          if (!fiturText) return [];
          return fiturText.split('\n').filter(line => line.trim());
        };

        // Parse capabilities dari string dengan line breaks menjadi array
        const parseCapabilities = (capabilitiesText: string) => {
          if (!capabilitiesText) return [];
          return capabilitiesText.split('\n').filter(line => line.trim());
        };

        // Map data untuk current product
        const mapped: details[] = currentProduct.data && currentProduct.data.length > 0 
          ? currentProduct.data.map((val) => ({
              id: val.id.toString(),
              title: val.judul || 'Module',
              description: val.narasi || 'Description not available',
              dashboardImage: val.img?.url || '/placeholder-image.jpg',
              icon: '',
              details: {
                features: parseFeatures(val.fitur || ''),
                capabilities: parseCapabilities(val.capabilities || '')
              }
            }))
          : [{
              id: '1',
              title: currentProduct.title,
              description: currentProduct.description,
              dashboardImage: currentProduct.dashboardImage,
              icon: '',
              details: {
                features: currentProduct.details.features,
                capabilities: currentProduct.details.capabilities
              }
            }];

        setlistproducts(mapped);
        setIsLoading(false);
      } catch (error) {
        // console.error('Error loading product data:', error);
        router.replace('/');
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug, router]);

  const handleProductClick = (product: details) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen text-slate-100 font-sans bg-black flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-700 rounded-lg mb-4 mx-auto max-w-md"></div>
          <div className="h-4 bg-gray-700 rounded-lg mx-auto max-w-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 font-sans bg-black">
      <div className="max-w-7xl mx-auto min-h-screen py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-transparent">
        {/* Animated background blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-12 -left-8 w-48 h-48 rounded-full bg-brand-highlight1/10 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-brand-secondary/10 blur-3xl animate-pulse-glow" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 min-h-full flex flex-col"
        >
          {/* Back to Home Button */}
          <motion.button
            onClick={() => {
              localStorage.setItem('productDetail','')
              router.back()
            }}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-2 group transition-all duration-200 flex-shrink-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="w-4 h-4 text-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
            </svg>
            <span className="text-xs font-medium">Back to Home</span>
          </motion.button>

          {/* Header Section */}
          <div className="text-center mb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{judul}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{subjudul}</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16">
            {listproducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  title={product.title}
                  description={product.description}
                  dashboardImage={product.dashboardImage}
                  icon={typeof product.icon === 'string' ? product.icon : ''}
                  onLearnMore={() => handleProductClick(product)}
                />
              </motion.div>
            ))}
          </div>

          {/* Product Modal */}
          <FlowbiteProductModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            product={selectedProduct}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicProductPage;
