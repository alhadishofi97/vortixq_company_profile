"use client";
import React, { useState, useEffect } from "react";
import BlurText from "@/app/util/reactBits/BlurText";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import ServiceTab from "../../../components/animations/ServiceTab";
import SwipeServiceCarousel from "../../../components/animations/SwipeServiceCarousel";
import LiquidEther from "../../../components/animations/LiquidEther";
import { motion } from "framer-motion";
import { getService } from "../controllers/ServiceControllers";

type Card = {
  id: number;
  icon: string | null;
  title: string;
  shortDescription: string | null;
  fullDescription: string;
  className:string| ''
};

type ServiceDetail = {
  id: number;
  judul: string;
  desc: string;
  cards: Card[];
};

type Service = {
  id: number;
  documentId: string;
  createdAt: string;   // bisa juga Date kalau mau di-convert
  updatedAt: string;
  publishedAt: string;
  data: ServiceDetail[];
};

type GetServiceResponse = {
  data: Service[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};


interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  className: string;
}
const EnhancedServiceCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState('');
  const [csaAnimationKey, setCsaAnimationKey] = useState(0);
  const [cdoAnimationKey, setCdoAnimationKey] = useState(0);
  const [aisaAnimationKey, setAisaAnimationKey] = useState(0);
  const [csaVisible, setCsaVisible] = useState(true);
  const [cdoVisible, setCdoVisible] = useState(true);
  const [aisaVisible, setAisaVisible] = useState(true);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [services, setServices] =  useState<Service[]>([]);

useEffect(() => {
  async function fetchData() {
    const data = await getService();
    setActiveTab(data[0].documentId)
    setServices(data); // ✅ langsung array of Service
  }
  fetchData();
}, []);
 

  useEffect(() => {


    
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android/i.test(userAgent) && width >= 768 && width <= 1024;
      
      if (isMobile || width < 768) {
        setDeviceType('mobile');
      } else if (isTablet || (width >= 768 && width <= 1024)) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
 function mapCardsToServiceItems(cards: Card[] = []): ServiceItem[] {
  return cards.map((card) => ({
    id: String(card.id),
    title: card.title,
    shortDescription: card.shortDescription ?? "",
    fullDescription: card.fullDescription ?? "",
    description: card.fullDescription ?? "",
    icon: card.icon ?? "",  // pastikan selalu string
    className: card.className ?? "bg-black",
  }));
}


  // Animation handlers
  const handleAnimationComplete = () => {
    // Animation completed
  };

  // Get current services based on active tab
  const getCurrentServices = () => {

       const servicex = services.find(
        (s) => s.documentId === activeTab
      );
       return servicex?.data[0].cards || []
  };

  // Get current title based on active tab
  const getCurrentTitle = () => {
    const service = services.find(
      (s) => s.documentId === activeTab
    );

    return service?.data[0].judul 
    
  };

  // Get current description based on active tab
  const getCurrentDescription = () => {
       const service = services.find(
      (s) => s.documentId === activeTab
    );

    return service?.data[0].desc 
  };

  // Get current animation key based on active tab
  const getCurrentAnimationKey = () => {
    switch (activeTab) {
      case "csa":
        return csaAnimationKey;
      case "cdo":
        return cdoAnimationKey;
      case "aisa":
        return aisaAnimationKey;
      default:
        return csaAnimationKey;
    }
  };

  // Get current visible state based on active tab
  const getCurrentVisible = () => {
    switch (activeTab) {
      case "csa":
        return csaVisible;
      case "cdo":
        return cdoVisible;
      case "aisa":
        return aisaVisible;
      default:
        return csaVisible;
    }
  };

  // Get current trigger function based on active tab
  const getCurrentTriggerFunction = () => {
    switch (activeTab) {
      case "csa":
        return () => {
          setCsaVisible(false);
          setTimeout(() => {
            setCsaAnimationKey(prev => prev + 1);
            setCsaVisible(true);
          }, 100);
        };
      case "cdo":
        return () => {
          setCdoVisible(false);
          setTimeout(() => {
            setCdoAnimationKey(prev => prev + 1);
            setCdoVisible(true);
          }, 100);
        };
      case "aisa":
        return () => {
          setAisaVisible(false);
          setTimeout(() => {
            setAisaAnimationKey(prev => prev + 1);
            setAisaVisible(true);
          }, 100);
        };
      default:
        return () => {
          setCsaVisible(false);
          setTimeout(() => {
            setCsaAnimationKey(prev => prev + 1);
            setCsaVisible(true);
          }, 100);
        };
    }
  };


  // Reset animation when tab changes
  useEffect(() => {
    if (activeTab === "csa") {
      setCsaAnimationKey(prev => prev + 1);
    } else if (activeTab === "cdo") {
      setCdoAnimationKey(prev => prev + 1);
    } else {
      setAisaAnimationKey(prev => prev + 1);
    }
  }, [activeTab]);

  return (
    <div className="relative w-full pt-32 pb-16 overflow-hidden bg-black">
      {/* Optimized LiquidEther Background - Always visible */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <LiquidEther
          colors={["#FF6B35", "#FF8C42", "#FFA726", "#FFB74D"]}
          mouseForce={deviceType === 'mobile' ? 15 : deviceType === 'tablet' ? 25 : 35}
          cursorSize={deviceType === 'mobile' ? 50 : deviceType === 'tablet' ? 80 : 120}
          isViscous={deviceType === 'mobile' ? false : deviceType === 'tablet' ? true : true}
          viscous={deviceType === 'mobile' ? 3 : deviceType === 'tablet' ? 8 : 12}
          iterationsViscous={deviceType === 'mobile' ? 6 : deviceType === 'tablet' ? 16 : 24}
          iterationsPoisson={deviceType === 'mobile' ? 6 : deviceType === 'tablet' ? 16 : 24}
          resolution={deviceType === 'mobile' ? 0.25 : deviceType === 'tablet' ? 0.4 : 0.6}
          isBounce={false}
          autoDemo={true}
          autoSpeed={deviceType === 'mobile' ? 0.2 : deviceType === 'tablet' ? 0.4 : 0.6}
          autoIntensity={deviceType === 'mobile' ? 1.2 : deviceType === 'tablet' ? 2.0 : 2.5}
          takeoverDuration={deviceType === 'mobile' ? 0.05 : deviceType === 'tablet' ? 0.15 : 0.2}
          autoResumeDelay={deviceType === 'mobile' ? 200 : deviceType === 'tablet' ? 400 : 500}
          autoRampDuration={deviceType === 'mobile' ? 0.3 : deviceType === 'tablet' ? 0.5 : 0.6}
          dt={deviceType === 'mobile' ? 0.025 : deviceType === 'tablet' ? 0.018 : 0.016}
          BFECC={deviceType === 'mobile' ? false : deviceType === 'tablet' ? false : true}
        />
      </div>
      
      <div className="mx-auto w-[90%] relative z-20">
        <AnimatedSection animation="fadeInUp" className="relative z-10">
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-white">
            Consulting Service
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={deviceType === 'mobile' ? 0.1 : 0.2} className="relative z-10">
          <div className="mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-6xl mx-auto">
            {/* <ServiceTab
              label="BTN Cyber Security Advisory (CSA)"
              isActive={activeTab === "csa"}
              onClick={() => setActiveTab("csa")}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
              }
            />
            <ServiceTab
              label="Cyber Defense and Operation (CDO)"
              isActive={activeTab === "cdo"}
              onClick={() => setActiveTab("cdo")}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              }
            />
            <ServiceTab
              label="AI Security Advisory (AISA)"
              isActive={activeTab === "aisa"}
              onClick={() => setActiveTab("aisa")}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              }
            /> */}
       {services?.map((servicex: Service, idx: number) => {
          console.log('-------------', servicex.id);
          return (
            <ServiceTab
              key={servicex.id}
              label={servicex.data[0]?.judul}
              isActive={activeTab === servicex.data[0]?.judul.toLowerCase()}
              onClick={() => setActiveTab(servicex.documentId)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              }
            />
          );
        })}
           
          </div>
        </AnimatedSection>

        {/* Service Carousel Container */}
        <AnimatedSection animation="fadeInUp" delay={0.4} className="relative z-10 mt-12">
          <div className="relative rounded-3xl border border-orange-500/30 p-6 sm:p-8 shadow-xl bg-black/50 backdrop-blur-sm">
            <div className="space-y-8">
              <AnimatedSection animation="fadeInUp" delay={0.6}>
                <div className="text-center">
                  <div
                    onClick={getCurrentTriggerFunction()}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95 inline-block"
                  >
                    {getCurrentVisible() && (
                      <BlurText
                        key={`${activeTab}-${getCurrentAnimationKey()}`}
                        text={getCurrentTitle()}
                        delay={20}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                      />
                    )}
                  </div>
                  {getCurrentVisible() && (
                    <div className="flex justify-center">
                      <BlurText
                        key={`${activeTab}-${getCurrentAnimationKey()}`}
                        text={getCurrentDescription()}
                        delay={20}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl text-center"
                      />
                    </div>
                  )}
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fadeInUp" delay={deviceType === 'mobile' ? 0.4 : 0.8}>
                <div className="px-2 sm:px-6 lg:px-8">
                  <SwipeServiceCarousel 
                      services={mapCardsToServiceItems(getCurrentServices() || [])} 
                    autoSlideInterval={0}
                    pauseOnHover={true}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

      
      {/* CTA Section with Animated Button */}
      {/* <AnimatedSection animation="fadeInUp" delay={0.6} className="relative z-10 mt-8">
        <div className="text-center">
          <motion.button
            onClick={() => {
              const section = document.getElementById("contact");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 border border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </AnimatedSection> */}

        {/* Ready to Transform Section */}
        <AnimatedSection animation="fadeInUp" delay={0.8} className="relative z-10 mt-20">
        <div className="text-center">
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Let us discuss how our AI integration and cybersecurity services can help your organization achieve its goals.
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
            Get Started Today
          </motion.button>
        </div>
      </AnimatedSection>
      </div>
    </div>
  );
  
};


export default EnhancedServiceCards;