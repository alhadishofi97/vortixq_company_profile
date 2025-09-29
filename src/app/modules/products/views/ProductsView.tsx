"use client";
import React ,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import ProductCarousel from "../../../components/animations/ProductCarousel";
import { ProductResponse,Product2,Product } from "../controllers/productInterface";
import { getProduct } from "../controllers/ProductController";
import { useRouter } from "next/navigation";
const ProductsView: React.FC = () => {


  // const [listproducts, setlistproducts] = useState<Product2[] | null>(null);
  const [listproducts, setlistproducts] = useState<Product2[]>([]);
  const router = useRouter();

  
  
  useEffect(() => {
    async function fetchData() {
      const data = await getProduct();
      setlistproducts(data?? []); // ✅ langsung object

      console.log('getProductgetProductgetProductgetProduct',data)
    }
    fetchData();
  }, []);
  // Product data for carousel - only AIRIS
  const products = [
    {
      id: "airis",
      title: "AIRIS",
      description: "AI-driven, GPU-powered cybersecurity platform that unifies GRC automation with advanced threat detection and defense.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      details: {
        features: [
          "AI-driven cybersecurity platform with GPU acceleration",
          "Unified GRC automation and threat detection",
          "Advanced threat defense capabilities",
          "Real-time security monitoring and response"
        ],
        capabilities: [
          "AI-powered threat detection",
          "GRC automation",
          "GPU-accelerated processing",
          "Real-time monitoring",
          "Advanced defense systems",
          "Unified security platform"
        ]
      }
    },
    {
      id: "airis",
      title: "AIRIS",
      description: "AI-driven, GPU-powered cybersecurity platform that unifies GRC automation with advanced threat detection and defense.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      details: {
        features: [
          "AI-driven cybersecurity platform with GPU acceleration",
          "Unified GRC automation and threat detection",
          "Advanced threat defense capabilities",
          "Real-time security monitoring and response"
        ],
        capabilities: [
          "AI-powered threat detection",
          "GRC automation",
          "GPU-accelerated processing",
          "Real-time monitoring",
          "Advanced defense systems",
          "Unified security platform"
        ]
      }
    }
  ];

  const handleProductClick = (produk:Product2):void => {
    // Redirect ke halaman /products/airis untuk melihat 6 card produk
    // window.location.href = '/products/airis';
    console.log('produkproduk',produk)
    
    localStorage.setItem("productDetail", JSON.stringify(produk));
    router.push("/products/airis"); // pindah ke /about
  };


  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Black Background - Full Width */}
      <div className="absolute inset-0 w-full h-full bg-black" />
      
      {/* Content Container - Following existing width */}
      <div className="relative z-10 mx-auto w-[90%] pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
        {/* Header Section */}
        <div className="mb-16 text-left">
          <div className="flex items-center gap-4 mb-6 text-left">
            {/* <div className="w-12 h-12 bg-gradient-to-br from-brand-highlight1 to-brand-secondary rounded-xl flex items-center justify-center text-left">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div> */}
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight text-left">
              Our Products
            </h1>
          </div>
          {/* <h2 className="font-display text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-white mb-8 tracking-wide leading-relaxed">
            SOLUSI CYBERSECURITY TERDEPAN
          </h2> */}
          <div className="w-full h-px bg-gradient-to-r from-brand-highlight1 to-brand-secondary animate-gradient-x text-left"></div>
        </div>

        {/* Our Products Carousel Section */}
          <div className="mb-16">
            <h3 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            {/* Our Products */}
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-slate-300 mb-12 text-center max-w-3xl mx-auto">
              Discover our comprehensive suite of AI-native cybersecurity and compliance solutions designed to protect and empower your organization.
            </p>
        </div>
            
        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <div className="relative rounded-3xl border border-white/10 p-8 sm:p-12 shadow-xl">
            <ProductCarousel
              products={listproducts}
              onProductClick={handleProductClick}
              className="w-full"
            />
          </div>
        </AnimatedSection>

        {/* Ready to Transform Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-20 mb-16"
        >
          <div className="p-8">
            <div className="text-center">
              <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your Security & Compliance?
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience the power of AI-native cybersecurity and compliance management. Get started with a free consultation today.
              </p>
              <motion.button
                onClick={() => {
                  const section = document.getElementById("contact");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 border border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsView;
