"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableServiceCardProps {
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  fullDescription: string;
  className?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const ExpandableServiceCard: React.FC<ExpandableServiceCardProps> = ({
  icon,
  title,
  shortDescription,
  fullDescription,
  className = "",
  isSelected = false,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full p-4 sm:p-5 md:p-6 shadow-xl rounded-xl flex flex-col min-h-48 cursor-pointer ${className} ${
        isSelected 
          ? 'bg-orange-500/10 border-2 border-orange-500 shadow-orange-500/20' 
          : 'bg-white/5 border border-white/10'
      }`}
      layout
      transition={{ duration: 0.25, ease: "easeInOut" }}
      onClick={onSelect}
    >
      {/* Orange indicator when selected */}
      {isSelected && (
        <motion.div
          className="absolute top-3 right-3 w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Orange glow effect when selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-orange-500/30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Outer orange glow ring */}
      {isSelected && (
        <motion.div
          className="absolute -inset-1 rounded-xl border border-orange-500/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      <div className="flex items-start justify-between gap-3 flex-shrink-0">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="rounded-full bg-orange-500/20 p-2 sm:p-3 text-white flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-semibold text-white break-normal hyphens-auto leading-tight flex-1">{title}</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 sm:p-2 rounded-full bg-orange-500/20 hover:bg-orange-500/30 transition-colors text-orange-500 flex-shrink-0"
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
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              height: "auto", 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              y: -10 
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="mt-3 space-y-3 flex-1 flex flex-col"
          >
            <motion.p 
              className="text-xs xs:text-sm sm:text-sm md:text-base text-slate-300 leading-relaxed break-normal hyphens-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {fullDescription}
            </motion.p>
          </motion.div>
        ) : (
          <motion.p
            key="short-desc"
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              height: "auto", 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              y: 10 
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="mt-3 text-xs xs:text-sm sm:text-sm md:text-base text-slate-300 leading-relaxed break-normal hyphens-auto flex-1 flex flex-col justify-center"
          >
            {shortDescription}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandableServiceCard;
