"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductModal from "../../components/animations/ProductModal";

const AirisProductPage: React.FC = () => {
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

  // Product data based on demo-airis.vortiqx.com
  const products = [
    {
      id: "ai-grc",
      title: "AI GRC",
      description: "Automate governance, risk, and compliance processes with AI-powered controls and real-time policy enforcement.",
      dashboardImage: "/ai-grc.jpg",
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
      dashboardImage: "/red-team-module.jpg",
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
      dashboardImage: "/threat-intel-module.jpg",
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
      dashboardImage: "/risk-quantification-module.jpg",
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
      dashboardImage: "/ciso-bot-module.jpg",
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
      dashboardImage: "/executive-dashboard-module.jpg",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
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
    <div className="min-h-screen text-slate-100 font-sans">
      <div className="relative mx-auto w-[90%] py-24 bg-transparent">
        {/* Animated background blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-brand-highlight1/10 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -right-24 w-80 h-80 rounded-full bg-brand-secondary/10 blur-3xl animate-pulse-glow" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Back to Home Button */}
          <motion.button
            onClick={() => {
              window.location.href = '/';
            }}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-8 group transition-all duration-200"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="w-6 h-6 text-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </motion.button>

          {/* Header Section */}
          <div className="mb-12 sm:mb-16 text-center px-4 sm:px-0">
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
              One Platform. One Brain.<br />
              <span className="text-white/80">End-to-End Cyber Resilience</span>
            </h1>
            <div className="w-full h-px bg-gradient-to-r from-brand-highlight1 to-brand-secondary animate-gradient-x"></div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            {products.map((product, index) => (
                <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.dashboardImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
            </div>

                {/* Product Icon */}
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-lg mb-3 sm:mb-4">
                  <div className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6">
                    {product.icon}
                  </div>
              </div>
                
                {/* Product Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
                  {product.title}
                </h3>
                
                {/* Product Description */}
                <p className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
                
                {/* Learn More Button */}
                <motion.button
                  onClick={() => handleProductClick(product)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200 text-xs sm:text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn more →
                </motion.button>
                </motion.div>
              ))}
          </div>

          {/* Product Modal */}
          <ProductModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            product={selectedProduct}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AirisProductPage;