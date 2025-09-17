"use client";
import React, { useState, useEffect } from "react";
import BlurText from "@/app/util/reactBits/BlurText";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import ServiceTab from "../../../components/animations/ServiceTab";
import SwipeServiceCarousel from "../../../components/animations/SwipeServiceCarousel";
import LiquidEther from "../../../components/animations/LiquidEther";
import { motion } from "framer-motion";

const EnhancedServiceCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"csa" | "cdo" | "aisa">("csa");
  const [csaAnimationKey, setCsaAnimationKey] = useState(0);
  const [cdoAnimationKey, setCdoAnimationKey] = useState(0);
  const [aisaAnimationKey, setAisaAnimationKey] = useState(0);
  const [csaVisible, setCsaVisible] = useState(true);
  const [cdoVisible, setCdoVisible] = useState(true);
  const [aisaVisible, setAisaVisible] = useState(true);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Detect device type for performance optimization
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
  

  // Animation handlers
  const handleAnimationComplete = () => {
    // Animation completed
  };

  // Get current services based on active tab
  const getCurrentServices = () => {
    switch (activeTab) {
      case "csa":
        return csaServices;
      case "cdo":
        return cdoServices;
      case "aisa":
        return aisaServices;
      default:
        return csaServices;
    }
  };

  // Get current title based on active tab
  const getCurrentTitle = () => {
    switch (activeTab) {
      case "csa":
        return "Cyber Security Advisory (CSA)";
      case "cdo":
        return "Cyber Defense and Operation (CDO)";
      case "aisa":
        return "AI Security Advisory (AISA)";
      default:
        return "Cyber Security Advisory (CSA)";
    }
  };

  // Get current description based on active tab
  const getCurrentDescription = () => {
    switch (activeTab) {
      case "csa":
        return "Comprehensive cybersecurity advisory services to help organizations build robust security frameworks and maintain compliance with industry standards.";
      case "cdo":
        return "Advanced cyber defense and operational services designed to protect your organization from evolving threats and ensure continuous security monitoring.";
      case "aisa":
        return "AI-powered security advisory services leveraging cutting-edge artificial intelligence to enhance your security posture and threat detection capabilities.";
      default:
        return "Comprehensive cybersecurity advisory services to help organizations build robust security frameworks and maintain compliance with industry standards.";
    }
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

  // CSA Services Data (8 cards)
  const csaServices = [
    {
      id: "compliance-assessment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-300">
          <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "01 - Compliance Assessment",
      shortDescription: "An advisory service to ensure the adherence to industry standards and regulatory compliance.",
      fullDescription: "An advisory service to ensure the adherence to industry standards and regulatory compliance. Provide gap report and recommendation for improvement.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "cyber-maturity-assessment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-300">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "02 - Cyber Maturity Assessment (CMA)",
      shortDescription: "A cybersecurity maturity assessment is a systematic evaluation of cybersecurity posture.",
      fullDescription: "A cybersecurity maturity assessment is a systematic evaluation of cybersecurity posture, capabilities, and processes. It aims to determine the current level of maturity in managing and mitigating cybersecurity risks.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "isms-advisory",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "03 - ISMS Advisory (ISO 27001)",
      shortDescription: "Guiding organizations through ISO 27001 certification via gap analysis, policy development, and risk assessment.",
      fullDescription: "Guiding organizations through ISO 27001 certification via gap analysis, policy development, risk assessment, implementation guidance, audit preparation, and continuous improvement, ensuring robust information security",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "enterprise-security-architecture",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-300">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "04 - Enterprise Security Architecture",
      shortDescription: "Enterprise security architecture provides the blueprint for a comprehensive defense.",
      fullDescription: "Enterprise security architecture provides the blueprint for a comprehensive defense, encompassing all layers of protection to safeguard assets and data.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "cyber-transformation-m-a",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-300">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "05 - Cyber Transformation Advisory (M&A)",
      shortDescription: "Cyber transformation in M&A ensures secure integration through risk assessment and technology alignment.",
      fullDescription: "Cyber transformation in M&A ensures secure integration through risk assessment, technology alignment, and security control harmonization, minimizing vulnerabilities and maximizing operational synergy",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "cyber-risk-management",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "06 - Cyber Risk Management",
      shortDescription: "Cyber risk management focuses on proactively managing and reducing exposure to cyber threats.",
      fullDescription: "Cyber risk management focuses on proactively managing and reducing exposure to cyber threats. Activity includes identifies, assesses, and mitigates potential cyber threats to protect assets.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "third-party-risk-assessment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "07 - Third Party Risk Assessment",
      shortDescription: "Third-party risk assessment focuses on assessing and managing the security risks introduced by external parties.",
      fullDescription: "Third-party risk assessment focuses on assessing and managing the security risks introduced by external parties. This is includes evaluates the cybersecurity posture of vendors and partners to minimize supply chain vulnerabilities.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "ics-ot-security-assurance",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-teal-300">
          <path d="M6 12h12M6 16h10M6 8h14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "08 - ICS OT Security Assurance",
      shortDescription: "Industrial Control Systems and Operational Technology security assurance services.",
      fullDescription: "Industrial Control Systems and Operational Technology security assurance services to protect critical infrastructure and industrial environments from cyber threats.",
      className: "bg-black border-orange-500/30"
    }
  ];

  // CDO Services Data (9 cards)
  const cdoServices = [
    {
      id: "soc-maturity-assessment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-300">
          <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "01 - SOC Maturity Assessment",
      shortDescription: "SOC maturity review analyzes current SOC operations, providing recommendations to enhance threat detection and response.",
      fullDescription: "SOC maturity review analyzes current SOC operations, providing recommendations to enhance threat detection and response.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "cyber-security-operation-centre",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-300">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "02 - Cyber-Security Operation Centre (C-SOC)",
      shortDescription: "Cyber Security Operation Center (C-SOC) provides a lean, technologically advanced approach to security.",
      fullDescription: "Cyber Security Operation Center (C-SOC) provides a lean, technologically advanced approach to security, offering cost-efficient, scalable, and future-proof managed security services.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "table-top-exercise",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "03 - Table-Top Exercise",
      shortDescription: "Tabletop exercises simulate cyber incidents to test response plans and improve team coordination.",
      fullDescription: "Tabletop exercises simulate cyber incidents to test response plans and improve team coordination, using frameworks like NIST or MITRE ATT&CK to structure realistic scenarios and identify vulnerabilities",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "compromise-assessment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-300">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "04 - Compromise Assessment",
      shortDescription: "Compromise assessments proactively identify existing or past security breaches within your environment.",
      fullDescription: "Compromise assessments proactively identify existing or past security breaches within your environment, uncovering indicators of compromise (IOCs) and assessing the scope of potential damage",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "vulnerability-assessment-penetration-testing",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-300">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "05 - Vulnerability Assessment & Penetration Testing",
      shortDescription: "Vulnerability Assessment and Penetration Testing (VAPT) identifies and exploits security weaknesses in systems.",
      fullDescription: "Vulnerability Assessment and Penetration Testing (VAPT) identifies and exploits security weaknesses in systems and applications, providing a detailed report of vulnerabilities and remediation recommendations",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "red-teaming-exercise",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "06 - Red Teaming Exercise",
      shortDescription: "Red teaming exercises simulate real-world, targeted attacks to evaluate security posture.",
      fullDescription: "Red teaming exercises simulate real-world, targeted attacks to evaluate security posture and response capabilities, providing insights into potential weaknesses from an attacker perspective.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "cyber-threat-intelligence",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "07 - Cyber Threat Intelligence",
      shortDescription: "Cyber threat intelligence provides actionable insights into emerging threats, enabling proactive defense strategies.",
      fullDescription: "Cyber threat intelligence provides actionable insights into emerging threats, enabling proactive defense strategies by gathering, analyzing, and disseminating information on adversary tactics, techniques, and procedures",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "centralized-ai-enabled-data-lake",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-teal-300">
          <path d="M6 12h12M6 16h10M6 8h14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "08 - Centralized AI-Enabled Data Lake Integration",
      shortDescription: "Automated AI data lake enablement and integration that allows all end points and other security tools logs ingestion.",
      fullDescription: "Automated AI data lake enablement and integration that allows all end points and other security tools logs ingestion, for enterprise asset visibility monitoring and correlation.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "ransomware-prevention-deployment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-pink-300">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "09 - Ransomware Prevention Deployment",
      shortDescription: "Strategic deployment of multi-layered security controls to prevent ransomware infections and ensure business continuity.",
      fullDescription: "Strategic deployment of multi-layered security controls, including advanced threat detection, employee training, robust backups, and proactive patching, to prevent ransomware infections and ensure business continuity",
      className: "bg-black border-orange-500/30"
    }
  ];

  // AISA Services Data (7 cards)
  const aisaServices = [
    {
      id: "double-diamond-framework",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-300">
          <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "01 - Double Diamond Framework",
      shortDescription: "The Double Diamond Framework for AI refers to the application of the Double Diamond design process.",
      fullDescription: "The Double Diamond Framework for AI refers to the application of the Double Diamond design process – Discover, Define, Develop, and Deliver – specifically to projects involving Artificial Intelligence.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "knowledge-based-management",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-300">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "02 - Knowledge Based Management",
      shortDescription: "Knowledge-Based Management focuses on explicitly encoding knowledge in a structured format that AI can understand.",
      fullDescription: "Knowledge-Based Management focuses on explicitly encoding knowledge in a structured format that AI can understand, reason with, and learn from, rather than relying solely on pattern recognition from raw data.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "small-language-model-training",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "03 - Small Language Model Training",
      shortDescription: "Small Language Model (SLM) Training for AI refers to the process of teaching a smaller-scale Artificial Intelligence model.",
      fullDescription: "Small Language Model (SLM) Training for AI refers to the process of teaching a smaller-scale Artificial Intelligence model to understand and generate human-like text. SLMs have significantly fewer parameters (typically under a few tens of billions) and are often trained on smaller, more focused datasets",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "ai-integration-readiness-assessment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-300">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "04 - AI Integration Readiness Assessment",
      shortDescription: "The AI Integration Readiness Assessment is a comprehensive evaluation of preparedness.",
      fullDescription: "The AI Integration Readiness Assessment is a comprehensive evaluation of preparedness to effectively adopt and integrate Artificial Intelligence technologies into operations, products, and services.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "ai-consultancy-solution-architect",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-300">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "05 - AI Consultancy & Solution Architect",
      shortDescription: "AI Consultancy & Solution Architect Service offers expert guidance and design blueprints for organizations.",
      fullDescription: "AI Consultancy & Solution Architect Service offers expert guidance and design blueprints for organizations aiming to integrate artificial intelligence. This service involves close collaboration with clients to understand their business goals, define suitable AI solutions, and architect secure and scalable application designs",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "ai-deployment-managed-service",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "06 - AI Deployment & Managed Service",
      shortDescription: "AI Deployment and Managed Services ensure the seamless transition of AI solutions into production.",
      fullDescription: "AI Deployment and Managed Services ensure the seamless transition of AI solutions into production and their continuous, optimal operation. This includes deployment, ongoing monitoring, maintenance, updates, security, and support, guaranteeing sustained reliability and value.",
      className: "bg-black border-orange-500/30"
    },
    {
      id: "deepai-gpu",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "07 - DeepAI GPU",
      shortDescription: "The powerful GPU hardware that underpins DeepAI's AI services and the general importance of GPUs.",
      fullDescription: "The powerful GPU hardware that underpins DeepAI's AI services and the general importance of GPUs for performing the complex computations required in deep learning",
      className: "bg-black border-orange-500/30"
    }
  ];

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
          colors={["#FF6B35", "#FF9FFC", "#B19EEF", "#5227FF"]}
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
            <ServiceTab
              label="Cyber Security Advisory (CSA)"
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
            />
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
                    services={getCurrentServices()} 
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