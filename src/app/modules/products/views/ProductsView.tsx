"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import FloatingElements from "../../../components/animations/FloatingElements";
import GlowingOrb from "../../../components/animations/GlowingOrb";
import ProductCarousel from "../../../components/animations/ProductCarousel";
import ProductModal from "../../../components/animations/ProductModal";

const ProductsView: React.FC = () => {
  // const router = useRouter();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
    description: string;
    dashboardImage: string;
    icon: React.ReactNode;
    details: {
      features: string[];
      capabilities: string[];
    };
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Product data for carousel - includes AIRIS and dummy products
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
      id: "cyber-shield",
      title: "CyberShield Pro",
      description: "Advanced endpoint protection with AI-powered threat detection and automated incident response capabilities.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      details: {
        features: [
          "AI-powered endpoint protection",
          "Automated incident response",
          "Real-time threat detection",
          "Behavioral analysis and monitoring"
        ],
        capabilities: [
          "Endpoint protection",
          "AI threat detection",
          "Automated response",
          "Behavioral analysis",
          "Real-time monitoring",
          "Incident management"
        ]
      }
    },
    {
      id: "secure-cloud",
      title: "SecureCloud",
      description: "Cloud security platform providing comprehensive protection for multi-cloud environments with automated compliance.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      details: {
        features: [
          "Multi-cloud security management",
          "Automated compliance monitoring",
          "Cloud workload protection",
          "Data loss prevention"
        ],
        capabilities: [
          "Multi-cloud support",
          "Compliance automation",
          "Workload protection",
          "Data protection",
          "Cloud monitoring",
          "Security orchestration"
        ]
      }
    },
    {
      id: "threat-hunter",
      title: "ThreatHunter AI",
      description: "Advanced threat hunting platform using machine learning to detect and neutralize sophisticated cyber threats.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      details: {
        features: [
          "AI-powered threat hunting",
          "Machine learning detection",
          "Advanced threat analysis",
          "Automated threat response"
        ],
        capabilities: [
          "Threat hunting",
          "ML detection",
          "Threat analysis",
          "Automated response",
          "Behavioral analysis",
          "Threat intelligence"
        ]
      }
    },
    {
      id: "data-guard",
      title: "DataGuard",
      description: "Comprehensive data protection solution with encryption, access control, and data loss prevention capabilities.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      details: {
        features: [
          "Advanced data encryption",
          "Access control management",
          "Data loss prevention",
          "Compliance monitoring"
        ],
        capabilities: [
          "Data encryption",
          "Access control",
          "DLP capabilities",
          "Compliance monitoring",
          "Data classification",
          "Audit trails"
        ]
      }
    },
    {
      id: "network-sentinel",
      title: "NetworkSentinel",
      description: "Network security monitoring and protection platform with real-time threat detection and automated response.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      details: {
        features: [
          "Real-time network monitoring",
          "Automated threat response",
          "Network segmentation",
          "Traffic analysis"
        ],
        capabilities: [
          "Network monitoring",
          "Threat detection",
          "Automated response",
          "Traffic analysis",
          "Segmentation",
          "Incident response"
        ]
      }
    },
    {
      id: "identity-protect",
      title: "IdentityProtect",
      description: "Identity and access management solution with multi-factor authentication and privileged access management.",
      dashboardImage: "/airis_dsb.png",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      details: {
        features: [
          "Multi-factor authentication",
          "Privileged access management",
          "Identity governance",
          "Single sign-on"
        ],
        capabilities: [
          "MFA capabilities",
          "PAM management",
          "Identity governance",
          "SSO integration",
          "Access reviews",
          "Compliance reporting"
        ]
      }
    },
    {
      id: "ai-grc",
      title: "AI GRC",
      description: "Automate governance, risk, and compliance processes with AI-powered controls and real-time policy enforcement.",
      dashboardImage: "/products/ai-grc-dashboard.jpg",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      details: {
        features: [
          "Automated compliance monitoring across multiple frameworks (ISO 27001, SOC 2, PCI DSS, GDPR)",
          "Real-time policy enforcement with AI-driven rule validation",
          "Intelligent risk assessment with predictive risk scoring",
          "Automated evidence collection and audit trail generation"
        ],
        capabilities: [
          "Dynamic policy updates based on regulatory changes",
          "AI-powered gap analysis and remediation recommendations",
          "Multi-framework compliance mapping and reporting",
          "Automated workflow orchestration for compliance tasks"
        ]
      }
    },
    {
      id: "ai-red-team",
      title: "AI Red Team Simulation",
      description: "Simulate sophisticated AI-driven attack scenarios to test and strengthen your defenses.",
      dashboardImage: "/products/ai-red-team-dashboard.jpg",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      details: {
        features: [
          "AI-powered attack simulation and penetration testing",
          "Advanced threat modeling with machine learning algorithms",
          "Automated vulnerability assessment and exploitation",
          "Real-time attack scenario generation and execution"
        ],
        capabilities: [
          "Custom attack vector development and testing",
          "Social engineering simulation with AI chatbots",
          "Network and application security testing automation",
          "Comprehensive security posture evaluation and reporting"
        ]
      }
    },
    {
      id: "ai-threat-intel",
      title: "AI Threat Intelligence (MITRE ATLAS-based)",
      description: "Leverage cutting-edge adversarial AI threat intelligence mapped to MITRE ATLAS for proactive defense.",
      dashboardImage: "/products/ai-threat-intel-dashboard.jpg",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      details: {
        features: [
          "MITRE ATLAS framework integration for AI threat mapping",
          "Real-time threat intelligence aggregation and analysis",
          "Adversarial AI attack pattern recognition and classification",
          "Global threat landscape monitoring and trend analysis"
        ],
        capabilities: [
          "Automated threat hunting and detection rule generation",
          "Predictive threat modeling and risk assessment",
          "Custom threat intelligence feed creation and management",
          "Integration with existing security tools and platforms"
        ]
      }
    },
    {
      id: "ai-risk-quantification",
      title: "AI Risk Quantification",
      description: "Transform complex cyber risk data into quantified, actionable business insights.",
      dashboardImage: "/products/ai-risk-quantification-dashboard.jpg",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      details: {
        features: [
          "Financial risk quantification and impact analysis",
          "AI-driven risk modeling and scenario planning",
          "Automated risk assessment and scoring algorithms",
          "Real-time risk monitoring and alerting systems"
        ],
        capabilities: [
          "Custom risk metrics and KPI development",
          "Integration with business intelligence platforms",
          "Automated risk reporting and executive dashboards",
          "Machine learning-based risk prediction and forecasting"
        ]
      }
    },
    {
      id: "airis-ciso-bot",
      title: "AIRIS CISO Bot",
      description: "Your virtual AI security advisor providing instant guidance and decision support to security leadership.",
      dashboardImage: "/products/airis-ciso-bot-dashboard.jpg",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      details: {
        features: [
          "AI-powered security advisory and decision support",
          "Natural language processing for security queries",
          "Automated security policy recommendations",
          "Real-time threat analysis and response guidance"
        ],
        capabilities: [
          "Custom security knowledge base and training",
          "Integration with security tools and platforms",
          "Automated incident response and escalation",
          "Executive-level security reporting and insights"
        ]
      }
    },
    {
      id: "executive-dashboard",
      title: "Real-Time Executive Dashboard",
      description: "Unified, AI-powered view of your organization's cybersecurity posture and risk landscape.",
      dashboardImage: "/products/executive-dashboard-dashboard.jpg",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
      details: {
        features: [
          "Comprehensive security posture visualization",
          "Real-time threat monitoring and alerting",
          "Executive-level security metrics and KPIs",
          "Automated security reporting and analytics"
        ],
        capabilities: [
          "Custom dashboard creation and configuration",
          "Integration with multiple security data sources",
          "Automated report generation and distribution",
          "Mobile and desktop responsive design"
        ]
      }
    }
  ];

  const handleProductClick = (product: {
    id: string;
    title: string;
    description: string;
    dashboardImage: string;
    icon: React.ReactNode;
    details: {
      features: string[];
      capabilities: string[];
    };
  }) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="relative mx-auto w-[90%] pt-32 pb-24 bg-transparent overflow-visible">
      {/* Enhanced Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-20"
      >
        <FloatingElements count={15} />
      </motion.div>
      
      {/* Glowing Orbs */}
      <GlowingOrb 
        size={350} 
        color="brand-highlight1" 
        intensity={0.12}
        className="top-0 -left-16 -z-10"
      />
      <GlowingOrb 
        size={400} 
        color="brand-secondary" 
        intensity={0.1}
        className="bottom-0 -right-24 -z-10"
      />
      
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
            Our Products
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-slate-300 mb-12 text-center max-w-3xl mx-auto">
              Discover our comprehensive suite of AI-native cybersecurity and compliance solutions designed to protect and empower your organization.
            </p>
        </div>
            
        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <div className="relative rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl">
            <ProductCarousel
              products={products}
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

        {/* Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      </motion.div>

    </div>
  );
};

export default ProductsView;
