"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FlowbiteProductModal from "../../components/animations/FlowbiteProductModal";
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
        console.log('Available products:', products.map(p => ({ id: p.id, title: p.title })));
        console.log('Looking for slug:', slug);
        
        const currentProduct = products.find(p => p.id === slug);
        
        if (!currentProduct) {
          console.log('Product not found for slug:', slug);
          router.replace('/');
          return;
        }

        console.log('Found product:', currentProduct);

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
        console.error('Error loading product data:', error);
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
      <div className="max-w-7xl mx-auto min-h-screen py-16 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 bg-transparent">
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
            onClick={() => router.back()}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-4 group transition-all duration-200 flex-shrink-0 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24"
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
          <div className="text-center mb-20 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{judul}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{subjudul}</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 mb-20">
            {listproducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="rounded-lg border-2 border-orange-500/30 bg-card text-card-foreground shadow-sm glass-card group cursor-pointer hover:scale-105 hover:border-orange-500/60 hover:shadow-orange-500/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:pointer-events-none mx-4 my-6"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProductClick(product)}
              >
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="p-6 relative z-10">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.dashboardImage}
                      alt={product.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover transition-transform duration-500 scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 text-orange-500">
                      <div className="h-8 w-8">
                        {product.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center text-orange-500 hover:text-orange-400 text-sm font-medium group-hover:translate-x-1 transition-all duration-200">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-1 h-4 w-4">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
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
