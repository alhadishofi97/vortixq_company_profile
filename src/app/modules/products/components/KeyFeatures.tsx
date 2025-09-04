"use client";
import React from "react";
import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "../../../../Components/ui/scroll-stack";
import { 
  ShieldCheckIcon, 
  CpuChipIcon, 
  ChartBarIcon,
  LockClosedIcon,
  EyeIcon,
  ClockIcon,
  CogIcon,
  DocumentCheckIcon
} from "@heroicons/react/24/outline";

const KeyFeatures: React.FC = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "AI-Powered Threat Detection",
      description: "Advanced machine learning algorithms that continuously monitor and analyze network traffic, user behavior, and system activities to detect threats in real-time.",
      color: "from-brand-highlight1 to-brand-secondary"
    },
    {
      icon: CpuChipIcon,
      title: "Automated Compliance Management",
      description: "Streamlined compliance workflows with automated reporting, policy enforcement, and regulatory requirement tracking across multiple frameworks.",
      color: "from-brand-secondary to-brand-highlight2"
    },
    {
      icon: ChartBarIcon,
      title: "Intelligent Risk Assessment",
      description: "Comprehensive risk analysis using AI to identify vulnerabilities, assess potential impacts, and prioritize remediation efforts based on business context.",
      color: "from-brand-highlight2 to-brand-highlight1"
    },
    {
      icon: LockClosedIcon,
      title: "Zero-Trust Architecture",
      description: "Implement zero-trust security principles with continuous verification, least-privilege access, and micro-segmentation for enhanced protection.",
      color: "from-brand-highlight1 to-brand-secondary"
    },
    {
      icon: EyeIcon,
      title: "Real-Time Monitoring",
      description: "24/7 continuous monitoring with instant alerts, behavioral analytics, and comprehensive visibility across your entire infrastructure.",
      color: "from-brand-secondary to-brand-highlight2"
    },
    {
      icon: ClockIcon,
      title: "Incident Response Automation",
      description: "Automated incident detection, classification, and response workflows that reduce mean time to resolution and minimize business impact.",
      color: "from-brand-highlight2 to-brand-highlight1"
    },
    {
      icon: CogIcon,
      title: "Seamless Integration",
      description: "Easy integration with existing security tools, SIEM systems, and cloud platforms through APIs and pre-built connectors.",
      color: "from-brand-highlight1 to-brand-secondary"
    },
    {
      icon: DocumentCheckIcon,
      title: "Compliance Reporting",
      description: "Automated generation of compliance reports for SOC 2, ISO 27001, GDPR, HIPAA, and other regulatory frameworks with audit trails.",
      color: "from-brand-secondary to-brand-highlight2"
    }
  ];

  return (
    <div className="relative mx-auto w-[90%] py-24 bg-transparent">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          Key Features
        </h2>
        <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
          Discover the powerful capabilities that make our AI-native cybersecurity platform 
          the most advanced solution for modern organizations.
        </p>
        <div className="w-full h-px bg-gradient-to-r from-brand-highlight1 to-brand-secondary mt-8 animate-gradient-x"></div>
      </motion.div>

      {/* ScrollStack Container */}
      <div className="h-[80vh] rounded-3xl overflow-hidden border border-brand-highlight2/20 bg-black/20 backdrop-blur-sm">
        <ScrollStack
          className="h-full"
          itemDistance={80}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="25%"
          scaleEndPosition="15%"
          baseScale={0.9}
          rotationAmount={2}
          blurAmount={1}
          onStackComplete={() => console.log('Stack animation completed!')}
        >
          {features.map((feature, index) => (
            <ScrollStackItem
              key={index}
              itemClassName="bg-gradient-to-br from-brand-primary/80 to-brand-primary/60 backdrop-blur-md border border-white/10"
            >
              <div className="flex flex-col h-full justify-center">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-brand-highlight1/20 to-brand-secondary/20 mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Gradient Accent */}
                <div className={`mt-6 w-full h-1 bg-gradient-to-r ${feature.color} rounded-full`}></div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-highlight1/10 blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-secondary/10 blur-3xl animate-pulse-glow"></div>
      </div>
    </div>
  );
};

export default KeyFeatures;
