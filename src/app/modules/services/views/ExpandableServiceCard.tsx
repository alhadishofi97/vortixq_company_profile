"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableServiceCardProps {
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  fullDescription: string;
  className?: string;
}

const ExpandableServiceCard: React.FC<ExpandableServiceCardProps> = ({
  icon,
  title,
  shortDescription,
  fullDescription,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`relative h-full w-full flex-shrink-0 bg-gradient-to-br from-slate-800/80 to-gray-900/90 p-3 sm:p-4 md:p-6 shadow-2xl backdrop-blur-sm rounded-xl ${className}`}
      layout
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="rounded-full bg-white/10 p-2 sm:p-3 text-white flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-white break-words leading-tight flex-1">{title}</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white flex-shrink-0"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="full-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 overflow-hidden"
          >
            <p className="text-xs xs:text-sm sm:text-base text-slate-300 leading-relaxed break-words overflow-hidden">
              {fullDescription}
            </p>
            
            {/* Additional detailed content */}
            {/* <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">Key Benefits:</h4>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Enhanced security posture</li>
                <li>• Risk mitigation strategies</li>
                <li>• Compliance adherence</li>
                <li>• Business continuity</li>
              </ul>
            </div> */}
            
            {/* <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">Deliverables:</h4>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Comprehensive assessment report</li>
                <li>• Action plan with timelines</li>
                <li>• Implementation roadmap</li>
                <li>• Ongoing support framework</li>
              </ul>
            </div> */}
          </motion.div>
        ) : (
          <motion.p
            key="short-desc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-xs xs:text-sm sm:text-base text-slate-300 leading-relaxed overflow-hidden break-words"
          >
            {shortDescription}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandableServiceCard;
