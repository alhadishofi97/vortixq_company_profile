"use client";
import React, { useState, useEffect } from "react";
import BlurText from "@/app/util/reactBits/BlurText";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import FloatingElements from "../../../components/animations/FloatingElements";
import GlowingOrb from "../../../components/animations/GlowingOrb";
import ServiceTab from "../../../components/animations/ServiceTab";
import SwipeServiceCarousel from "../../../components/animations/SwipeServiceCarousel";
import { motion, useScroll, useTransform } from "framer-motion";

const EnhancedServiceCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "cyber">("ai");
  const [aiAnimationKey, setAiAnimationKey] = useState(0);
  const [cyberAnimationKey, setCyberAnimationKey] = useState(0);
  const [aiVisible, setAiVisible] = useState(true);
  const [cyberVisible, setCyberVisible] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // AI Services Data
  const aiServices = [
    {
      id: "ai-strategy",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-300">
          <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "AI Strategy & Roadmap Development",
      shortDescription: "Comprehensive AI strategy development and roadmap creation to align AI initiatives with business objectives.",
      fullDescription: "We develop comprehensive AI strategies and roadmaps that align with your business objectives and market opportunities. Our approach includes market analysis, technology assessment, resource planning, and implementation timelines to ensure successful AI adoption and ROI.",
      className: "bg-gradient-to-br from-blue-900/80 to-cyan-900/80 border-blue-500/60"
    },
    {
      id: "process-automation",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-300">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Process Automation & Optimization",
      shortDescription: "Automation of business processes using AI technologies to improve efficiency and reduce operational costs.",
      fullDescription: "Our process automation services leverage AI technologies to streamline business operations, reduce manual work, and improve efficiency. We identify automation opportunities, implement intelligent workflows, and provide ongoing optimization to maximize business value.",
      className: "bg-gradient-to-br from-green-900/80 to-emerald-900/80 border-green-500/60"
    },
    {
      id: "ai-model-development",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "AI Model Development & Deployment",
      shortDescription: "Custom AI model development and deployment services tailored to your specific business needs and use cases.",
      fullDescription: "We develop and deploy custom AI models tailored to your specific business needs. Our services include data preparation, model training, validation, deployment, and ongoing monitoring to ensure optimal performance and business impact.",
      className: "bg-gradient-to-br from-purple-900/80 to-violet-900/80 border-purple-500/60"
    },
    {
      id: "roi-measurement",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-300">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "ROI Measurement & Analytics",
      shortDescription: "Development of comprehensive frameworks to measure and track the return on investment of AI initiatives.",
      fullDescription: "We develop comprehensive ROI measurement frameworks that enable you to track and measure the return on investment of your AI initiatives. Our frameworks include key performance indicators, measurement methodologies, reporting structures, and ongoing monitoring to ensure your AI investments deliver measurable business value.",
      className: "bg-gradient-to-br from-amber-900/80 to-orange-900/80 border-amber-500/60"
    },
    {
      id: "change-management",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Change Management",
      shortDescription: "Strategies and support for managing organizational change during AI transformation to ensure successful adoption.",
      fullDescription: "Our change management service provides comprehensive strategies and support for managing organizational change during AI transformation. We develop communication plans, training programs, stakeholder engagement strategies, and ongoing support mechanisms to ensure successful AI adoption and minimize resistance to change.",
      className: "bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-purple-500/60"
    }
  ];

  // Cybersecurity Services Data
  const cyberServices = [
    {
      id: "security-assessment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-300">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Security Assessment & Penetration Testing",
      shortDescription: "Comprehensive security assessments and penetration testing to identify vulnerabilities and strengthen your security posture.",
      fullDescription: "We conduct comprehensive security assessments and penetration testing to identify vulnerabilities in your systems, networks, and applications. Our assessments include vulnerability scanning, manual testing, social engineering, and detailed reporting with remediation recommendations.",
      className: "bg-gradient-to-br from-red-900/80 to-rose-900/80 border-red-500/60"
    },
    {
      id: "compliance-risk",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-300">
          <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Compliance & Risk Management",
      shortDescription: "Guidance on achieving and maintaining compliance with industry standards and regulatory requirements.",
      fullDescription: "We provide comprehensive compliance and risk management services to help you achieve and maintain compliance with industry standards such as ISO 27001, SOC 2, GDPR, HIPAA, and other regulatory requirements. Our approach includes gap analysis, implementation support, and ongoing monitoring.",
      className: "bg-gradient-to-br from-blue-900/80 to-indigo-900/80 border-blue-500/60"
    },
    {
      id: "security-architecture",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-300">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Security Architecture & Design",
      shortDescription: "Design and implementation of robust security architectures to protect your digital infrastructure.",
      fullDescription: "We design and implement robust security architectures that protect your digital infrastructure from evolving threats. Our services include security framework design, technology selection, implementation planning, and ongoing optimization to ensure comprehensive protection.",
      className: "bg-gradient-to-br from-green-900/80 to-teal-900/80 border-green-500/60"
    },
    {
      id: "incident-response",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Incident Response Planning",
      shortDescription: "Development of comprehensive incident response plans to quickly detect, respond to, and recover from security incidents.",
      fullDescription: "We develop comprehensive incident response plans that enable your organization to quickly detect, respond to, and recover from security incidents. Our plans include detailed procedures, communication protocols, escalation matrices, and recovery strategies to minimize business impact.",
      className: "bg-gradient-to-br from-indigo-800/90 to-purple-800/90 border-indigo-400/60"
    },
    {
      id: "security-policy",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-200">
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Security Policy Development",
      shortDescription: "Creation of comprehensive security policies and procedures aligned with industry standards and regulatory requirements.",
      fullDescription: "We develop comprehensive security policies and procedures that align with industry best practices and regulatory requirements. Our policies cover all aspects of information security including access control, data protection, incident response, and business continuity planning.",
      className: "bg-gradient-to-br from-amber-800/90 to-yellow-800/90 border-amber-400/60"
    },
    {
      id: "compliance-framework",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-200">
          <path d="M6 12h12M6 16h10M6 8h14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Compliance Framework Implementation",
      shortDescription: "Guidance on implementing and maintaining compliance with relevant regulatory frameworks and standards.",
      fullDescription: "We provide expert guidance on implementing and maintaining compliance with relevant regulatory frameworks such as ISO 27001, SOC 2, GDPR, HIPAA, and industry-specific standards. Our approach ensures sustainable compliance that supports business objectives while meeting regulatory requirements.",
      className: "bg-gradient-to-br from-emerald-800/90 to-green-800/90 border-emerald-400/60"
    }
  ];

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  const triggerAiAnimation = () => {
    console.log('Triggering AI animation...');
    setAiVisible(false);
    setTimeout(() => {
      setAiAnimationKey(prev => prev + 1);
      setAiVisible(true);
    }, 100);
  };

  const triggerCyberAnimation = () => {
    setCyberVisible(false);
    setTimeout(() => {
      setCyberAnimationKey(prev => prev + 1);
      setCyberVisible(true);
    }, 100);
  };

  // Reset animation when tab changes
  useEffect(() => {
    if (activeTab === "ai") {
      setAiAnimationKey(prev => prev + 1);
    } else {
      setCyberAnimationKey(prev => prev + 1);
    }
  }, [activeTab]);

  return (
    <div className="relative mx-auto w-[90%] pt-32 pb-16 overflow-hidden">
      {/* Enhanced Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-20"
      >
        <FloatingElements count={25} />
      </motion.div>
      
      {/* Glowing Orbs */}
      <GlowingOrb 
        size={400} 
        color="brand-highlight1" 
        intensity={0.15}
        className="top-10 left-1/3 -translate-x-1/2 -z-10"
      />
      <GlowingOrb 
        size={300} 
        color="brand-secondary" 
        intensity={0.1}
        className="bottom-20 right-1/4 -z-10"
      />
      
      <AnimatedSection animation="fadeInUp" className="relative z-10">
        <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-white">
          Our Services
        </h2>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={0.2} className="relative z-10">
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-4xl mx-auto">
          <ServiceTab
            label="AI Integration & Process Transformation"
            isActive={activeTab === "ai"}
            onClick={() => setActiveTab("ai")}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            }
          />
          <ServiceTab
            label="Cybersecurity"
            isActive={activeTab === "cyber"}
            onClick={() => setActiveTab("cyber")}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={0.4} className="relative z-10">
        <div className="relative mt-6 rounded-3xl border border-white/10 p-4 sm:p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
          {activeTab === "ai" ? (
            <div className="space-y-6">
              <AnimatedSection animation="fadeInUp" delay={0.6}>
                <div className="text-center">
                  <div
                    onClick={triggerAiAnimation}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95 inline-block"
                  >
                    {aiVisible && (
                      <BlurText
                        key={`ai-${aiAnimationKey}`}
                        text="AI Integration & Process Transformation"
                        delay={20}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                      />
                    )}
                  </div>
                  {aiVisible && (
                    <BlurText
                      key={`ai-${aiAnimationKey}`}
                      text="Comprehensive AI integration services to transform your business processes and drive innovation."
                      delay={20}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                      className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto"
                    />
                  )}
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fadeInUp" delay={0.8}>
                <SwipeServiceCarousel 
                  services={aiServices} 
                  autoSlideInterval={5000}
                  pauseOnHover={true}
                />
              </AnimatedSection>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatedSection animation="fadeInUp" delay={0.6}>
                <div className="text-center">
                  <div 
                    onClick={triggerCyberAnimation}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95 inline-block"
                  >
                    {cyberVisible && (
                      <BlurText
                        key={`cyber-${cyberAnimationKey}`}
                        text="Cybersecurity Consulting Services"
                        delay={20}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                      />
                    )}
                  </div>
                  {cyberVisible && (
                    <BlurText
                      key={`cyber-${cyberAnimationKey}`}
                      text="Comprehensive cybersecurity services to protect your organization and ensure compliance with industry standards."
                      delay={20}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                      className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto"
                    />
                  )}
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fadeInUp" delay={0.8}>
                <SwipeServiceCarousel 
                  services={cyberServices} 
                  autoSlideInterval={5000}
                  pauseOnHover={true}
                />
              </AnimatedSection>
            </div>
          )}
        </div>
      </AnimatedSection>
      
      {/* CTA Section with Animated Button */}
      <AnimatedSection animation="fadeInUp" delay={0.8} className="relative z-10 mt-8">
        <div className="text-center">
          {/* <h3 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h3>
          <p className="text-sm xs:text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how our AI integration and cybersecurity services can help your organization achieve its goals.
          </p> */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => {
                const section = document.getElementById("contact");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              showIndicator={true}
            >
              Get Started Today
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              onClick={() => {
                const section = document.getElementById("about");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              showIndicator={true}
            >
              Learn More
            </AnimatedButton>
          </div> */}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default EnhancedServiceCards;
