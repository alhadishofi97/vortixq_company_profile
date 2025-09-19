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



interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string | React.ReactNode;
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
    console.log('Fetched services data:', data);
    
    // Fallback data if API doesn't return all services
    const fallbackServices = [
      {
        id: 1,
        documentId: "csa",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        data: [{
          id: 1,
          judul: "Cyber Security Advisory (CSA)",
          desc: "Comprehensive cybersecurity advisory services to help organizations build robust security frameworks and maintain compliance with industry standards.",
          cards: []
        }]
      },
      {
        id: 2,
        documentId: "cdo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        data: [{
          id: 2,
          judul: "Cyber Defense and Operation (CDO)",
          desc: "Advanced cyber defense strategies and operational security services to protect against evolving threats.",
          cards: []
        }]
      },
      {
        id: 3,
        documentId: "aisa",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        data: [{
          id: 3,
          judul: "AI Security Advisory (AISA)",
          desc: "Specialized AI security consulting to ensure safe and secure implementation of artificial intelligence systems.",
          cards: []
        }]
      }
    ];
    
    if (data && data.length > 0) {
      setActiveTab(data[0].documentId);
      setServices(data);
      
      // Debug: Check if CDO service exists
      const cdoService = data.find(s => 
        s.data[0]?.judul?.toLowerCase().includes('cdo') || 
        s.data[0]?.judul?.toLowerCase().includes('cyber defense')
      );
      console.log('CDO Service found:', cdoService);
    } else {
      // Use fallback data if API returns empty
      console.log('Using fallback services data');
      setActiveTab(fallbackServices[0].documentId);
      setServices(fallbackServices);
    }
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
  return cards.map((card) => {
    // Theme-based SVG icons that match the web design
    const getThemeIcon = (title: string) => {
      const titleLower = title.toLowerCase();
      
      if (titleLower.includes('security') || titleLower.includes('advisory')) {
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" 
                  fill="url(#securityGradient)" />
            <defs>
              <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C16B32" />
                <stop offset="100%" stopColor="#A59489" />
              </linearGradient>
            </defs>
          </svg>
        );
      } else if (titleLower.includes('ai') || titleLower.includes('artificial')) {
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                  fill="url(#aiGradient)" />
            <defs>
              <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C16B32" />
                <stop offset="100%" stopColor="#969696" />
              </linearGradient>
            </defs>
          </svg>
        );
      } else if (titleLower.includes('defense') || titleLower.includes('operation')) {
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" 
                  fill="url(#defenseGradient)" />
            <circle cx="12" cy="12" r="3" fill="#C16B32" />
            <defs>
              <linearGradient id="defenseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A59489" />
                <stop offset="100%" stopColor="#C16B32" />
              </linearGradient>
            </defs>
          </svg>
        );
      } else if (titleLower.includes('assessment') || titleLower.includes('maturity')) {
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" 
                  fill="url(#assessmentGradient)" />
            <defs>
              <linearGradient id="assessmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C16B32" />
                <stop offset="100%" stopColor="#ECE9E3" />
              </linearGradient>
            </defs>
          </svg>
        );
      } else if (titleLower.includes('compliance') || titleLower.includes('iso')) {
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" 
                  clipRule="evenodd" fill="url(#complianceGradient)" />
            <defs>
              <linearGradient id="complianceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C16B32" />
                <stop offset="100%" stopColor="#A59489" />
              </linearGradient>
            </defs>
          </svg>
        );
      } else if (titleLower.includes('enterprise') || titleLower.includes('corporate')) {
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" 
                  fill="url(#enterpriseGradient)" />
            <defs>
              <linearGradient id="enterpriseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A59489" />
                <stop offset="100%" stopColor="#C16B32" />
              </linearGradient>
            </defs>
          </svg>
        );
      } else {
        // Default theme icon
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                  fill="url(#defaultGradient)" />
            <defs>
              <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C16B32" />
                <stop offset="100%" stopColor="#969696" />
              </linearGradient>
            </defs>
          </svg>
        );
      }
    };

    return {
      id: String(card.id),
      title: card.title,
      shortDescription: card.shortDescription ?? "",
      fullDescription: card.fullDescription ?? "",
      description: card.fullDescription ?? "",
      icon: card.icon ? card.icon : getThemeIcon(card.title),  // Use theme icon if none provided
      className: card.className ?? "bg-black",
    };
  });
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
       {services?.map((servicex: Service) => {
          const isActive = activeTab === servicex.documentId;
          const serviceTitle = servicex.data[0]?.judul?.toLowerCase() || '';
          console.log('Service:', servicex.data[0]?.judul, 'DocumentId:', servicex.documentId, 'ActiveTab:', activeTab, 'IsActive:', isActive);
          
          // Theme-based icons for service buttons
          const getServiceIcon = (title: string) => {
            if (title.includes('aisa') || title.includes('ai security')) {
              return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                        fill="url(#aisaGradient)" />
                  <defs>
                    <linearGradient id="aisaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C16B32" />
                      <stop offset="100%" stopColor="#969696" />
                    </linearGradient>
                  </defs>
                </svg>
              );
            } else if (title.includes('csa') || title.includes('cyber security advisory')) {
              return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" 
                        clipRule="evenodd" fill="url(#csaGradient)" />
                  <defs>
                    <linearGradient id="csaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C16B32" />
                      <stop offset="100%" stopColor="#A59489" />
                    </linearGradient>
                  </defs>
                </svg>
              );
            } else if (title.includes('cdo') || title.includes('cyber defense')) {
              return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" 
                        fill="url(#cdoGradient)" />
                  <circle cx="12" cy="12" r="3" fill="#C16B32" />
                  <defs>
                    <linearGradient id="cdoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A59489" />
                      <stop offset="100%" stopColor="#C16B32" />
                    </linearGradient>
                  </defs>
                </svg>
              );
            } else {
              // Default theme icon for unknown services
              return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                        fill="url(#defaultServiceGradient)" />
                  <defs>
                    <linearGradient id="defaultServiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C16B32" />
                      <stop offset="100%" stopColor="#969696" />
                    </linearGradient>
                  </defs>
                </svg>
              );
            }
          };

          return (
            <ServiceTab
              key={servicex.id}
              label={servicex.data[0]?.judul}
              isActive={isActive}
              onClick={() => {
                console.log('Clicking service:', servicex.data[0]?.judul, 'Setting activeTab to:', servicex.documentId);
                setActiveTab(servicex.documentId);
              }}
              icon={getServiceIcon(serviceTitle)}
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