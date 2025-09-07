"use client";
import React, { useState, useEffect } from "react";
import CardSwap from "../../../util/reactBits/CardSwap";
import BlurText from "@/app/util/reactBits/BlurText";
import ExpandableServiceCard from "./ExpandableServiceCard";

const ServiceCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "cyber">("ai");
  const [aiAnimationKey, setAiAnimationKey] = useState(0);
  const [cyberAnimationKey, setCyberAnimationKey] = useState(0);
  const [aiVisible, setAiVisible] = useState(true);
  const [cyberVisible, setCyberVisible] = useState(true);

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
    // console.log('Triggering Cyber animation...');
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
    <div className="relative mx-auto w-[90%] py-24">
      {/* glow background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/3 w-72 h-72 -translate-x-1/2 rounded-full bg-brand-cyan/15 blur-3xl animate-pulse-glow" />
      </div>
      <h2 className="font-display text-base xs:text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight"
      >Our Services</h2>

      <div className="mt-6 inline-flex rounded-xl border border-white/10 p-1 bg-slate-900/50">
        <button
          type="button"
          onClick={() => setActiveTab("ai")}
          className={[
            "px-4 py-2 rounded-lg text-sm transition-colors font-sans",
            activeTab === "ai" ? "bg-gradient-to-r from-brand-cyan to-brand-purple text-white" : "text-slate-300 hover:text-white"
          ].join(" ")}
        >
          AI Integration & Process Transformation
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("cyber")}
          className={[
            "px-4 py-2 rounded-lg text-sm transition-colors font-sans",
            activeTab === "cyber" ? "bg-gradient-to-r from-brand-cyan to-brand-purple text-white" : "text-slate-300 hover:text-white"
          ].join(" ")}
        >
          Cybersecurity
        </button>
      </div>

      <div className="relative mt-8 rounded-3xl border border-white/10 p-6">
        {activeTab === "ai" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div
                onClick={triggerAiAnimation}
                className="cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95"
              >
                {aiVisible && (
                  <BlurText
                    key={`ai-${aiAnimationKey}`}
                    text="AI Integration & Process Transformation"
                    delay={20}
                    animateBy="letters"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="font-display text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-4 text-left leading-tight break-words"
                  />
                )}
              </div>
              {aiVisible && (
              <BlurText
              key={`ai-${aiAnimationKey}`}
              text="Comprehensive AI integration services to transform your business processes and drive innovation."
              delay={20}
              animateBy="letters"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary leading-relaxed"
              />
              )}
            </div>

            {/* AI Integration CardSwap Container */}
            <div className="relative h-[320px] rounded-3xl border border-white/10 bg-slate-900/40 p-4 overflow-hidden animate-float-slow">
              <CardSwap cardDistance={120} verticalDistance={100} delay={3000} pauseOnHover={true}>
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  title="AI Readiness Assessment"
                  shortDescription="Comprehensive evaluation of your organization&apos;s data infrastructure, technical capabilities, and business processes to determine AI readiness."
                  fullDescription="Our AI readiness assessment evaluates your organization&apos;s current state across multiple dimensions including data quality and availability, technical infrastructure, organizational capabilities, and business process maturity. We identify gaps and opportunities, assess current AI adoption levels, and provide a detailed roadmap for successful AI transformation."
                  className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border-indigo-500/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-300">
                      <path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  }
                  title="Data Strategy & Management"
                  shortDescription="Development of robust data governance frameworks and management strategies to support AI initiatives and ensure data quality."
                  fullDescription="We develop comprehensive data strategies that establish robust governance frameworks, data quality standards, and management processes. Our approach ensures data is accessible, reliable, and properly governed to support AI initiatives while maintaining compliance with regulatory requirements and industry best practices."
                  className="bg-gradient-to-br from-cyan-900/80 to-blue-900/80 border-cyan-500/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-fuchsia-300">
                      <path d="M8 17l-3-3 1.5-1.5L8 14l9-9L18.5 6.5 8 17z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="AI Solution Implementation"
                  shortDescription="Expert guidance on selecting and implementing the right AI solutions to address specific business challenges and opportunities."
                  fullDescription="Our AI solution implementation service provides expert guidance throughout the entire implementation lifecycle. We help you select the right AI technologies, design scalable architectures, implement solutions with best practices, and ensure successful deployment and integration with existing systems."
                  className="bg-gradient-to-br from-fuchsia-900/80 to-pink-900/80 border-fuchsia-500/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-300">
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="Business Process Redesign"
                  shortDescription="Reimagining and optimizing business processes to fully leverage AI capabilities and maximize operational efficiency."
                  fullDescription="Our business process redesign service reimagines and optimizes your existing processes to fully leverage AI capabilities. We analyze current workflows, identify automation opportunities, redesign processes for AI integration, and implement changes that maximize operational efficiency while maintaining quality and compliance."
                  className="bg-gradient-to-br from-emerald-900/80 to-green-900/80 border-emerald-500/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-300">
                      <path d="M3 3v18h18M8 12l4 4 4-4M8 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  title="ROI Measurement Framework"
                  shortDescription="Development of comprehensive frameworks to measure and track the return on investment of AI initiatives."
                  fullDescription="We develop comprehensive ROI measurement frameworks that enable you to track and measure the return on investment of your AI initiatives. Our frameworks include key performance indicators, measurement methodologies, reporting structures, and ongoing monitoring to ensure your AI investments deliver measurable business value."
                  className="bg-gradient-to-br from-amber-900/80 to-orange-900/80 border-amber-500/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  title="Change Management"
                  shortDescription="Strategies and support for managing organizational change during AI transformation to ensure successful adoption."
                  fullDescription="Our change management service provides comprehensive strategies and support for managing organizational change during AI transformation. We develop communication plans, training programs, stakeholder engagement strategies, and ongoing support mechanisms to ensure successful AI adoption and minimize resistance to change."
                  className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-purple-500/60"
                />
              </CardSwap>
              
              {/* Card Counter */}
              {/* <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {aiAnimationKey + 1}/6
              </div> */}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div 
                onClick={triggerCyberAnimation}
                className="cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95"
              >
                {cyberVisible && (
                  <BlurText
                    key={`cyber-${cyberAnimationKey}`}
                    text="Cybersecurity Consulting Services"
                    delay={20}
                    animateBy="letters"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="font-display text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-left leading-tight break-words"
                  />
                )}
              </div>
              {cyberVisible && (
              <BlurText
              key={`cyber-${cyberAnimationKey}`}
              text="Comprehensive cybersecurity services to protect your organization and ensure compliance with industry standards."
              delay={20}
              animateBy="letters"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary leading-relaxed"
              />
              )}
              {/* Collapse/Expand Controls */}
              <div className="flex items-center gap-4 mt-4">
                {/* <button
                  onClick={() => setCyberAnimationKey(prev => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                >
                  Previous Card
                </button>
                <button
                  onClick={() => setCyberAnimationKey(prev => Math.min(5, prev + 1))}
                  className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                >
                  Next Card
                </button>
                <button
                  onClick={() => setCyberAnimationKey(0)}
                  className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                >
                  Reset
                </button> */}
              </div>
            </div>
            
            {/* CardSwap Container */}
            <div className="relative h-[320px] rounded-3xl border border-white/10 bg-slate-900/40 p-4 overflow-hidden">
              <CardSwap cardDistance={120} verticalDistance={100} delay={3000} pauseOnHover={true}>
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-200">
                      <path d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="Comprehensive Maturity Assessment"
                  shortDescription="Thorough evaluation of your organization&apos;s security posture, identifying vulnerabilities and providing a roadmap for improvement."
                  fullDescription="Our comprehensive security maturity assessment evaluates your organization&apos;s current security posture across multiple dimensions including technical controls, policies and procedures, governance structures, and human factors. We identify critical vulnerabilities, assess compliance gaps, and provide a detailed roadmap for improvement with prioritized recommendations and implementation timelines."
                  className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 border-slate-400/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-200">
                      <path d="M4 8l8-4 8 4v5a8 8 0 11-16 0V8z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="Security Architecture Design"
                  shortDescription="Development of robust security architectures tailored to your organization&apos;s specific needs and risk profile."
                  fullDescription="We design comprehensive security architectures that integrate seamlessly with your existing infrastructure while providing robust protection against current and emerging threats. Our approach considers your unique business requirements, compliance needs, and risk tolerance to create a scalable and maintainable security framework."
                  className="bg-gradient-to-br from-cyan-800/90 to-blue-800/90 border-cyan-400/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-rose-200">
                      <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="Threat Modeling & Risk Assessment"
                  shortDescription="Identification and analysis of potential threats and vulnerabilities, with prioritized recommendations for mitigation."
                  fullDescription="Our threat modeling and risk assessment process systematically identifies potential threats to your organization, analyzes their likelihood and impact, and provides prioritized recommendations for mitigation. We use industry-standard frameworks and methodologies to ensure comprehensive coverage of all threat vectors."
                  className="bg-gradient-to-br from-rose-800/90 to-red-800/90 border-rose-400/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-200">
                      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="Security Policy Development"
                  shortDescription="Creation of comprehensive security policies and procedures aligned with industry standards and regulatory requirements."
                  fullDescription="We develop comprehensive security policies and procedures that align with industry best practices and regulatory requirements. Our policies cover all aspects of information security including access control, data protection, incident response, and business continuity planning."
                  className="bg-gradient-to-br from-amber-800/90 to-yellow-800/90 border-amber-400/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-200">
                      <path d="M6 12h12M6 16h10M6 8h14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="Compliance Framework Implementation"
                  shortDescription="Guidance on implementing and maintaining compliance with relevant regulatory frameworks and standards."
                  fullDescription="We provide expert guidance on implementing and maintaining compliance with relevant regulatory frameworks such as ISO 27001, SOC 2, GDPR, HIPAA, and industry-specific standards. Our approach ensures sustainable compliance that supports business objectives while meeting regulatory requirements."
                  className="bg-gradient-to-br from-emerald-800/90 to-green-800/90 border-emerald-400/60"
                />
                
                <ExpandableServiceCard
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-200">
                      <path d="M6 19l3-7 5 3 4-9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  title="Incident Response Planning"
                  shortDescription="Development of effective incident response plans to minimize the impact of security breaches and ensure business continuity."
                  fullDescription="We develop comprehensive incident response plans that enable your organization to quickly detect, respond to, and recover from security incidents. Our plans include detailed procedures, communication protocols, escalation matrices, and recovery strategies to minimize business impact."
                  className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 border-indigo-400/60"
                />
              </CardSwap>
              
              {/* Card Counter */}
              {/* <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {cyberAnimationKey + 1}/6
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCards;


