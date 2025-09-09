"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


type Section = { id: string; label: string; emoji?: string };

interface NavbarProps {
  sections: Section[];
  activeId: string;
  onNavClick: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, activeId, onNavClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header 
      className="navbar-fixed border-b border-white/5 backdrop-blur-md bg-black/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="mx-auto flex w-[90%] items-center justify-between gap-3 py-4" aria-label="Primary">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/Black_Full_Name-removebg-preview-cropped.svg"
            width={160}
            height={32}
            alt="logo"
            className="w-28 sm:w-36 md:w-44 h-auto"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 rounded-2xl bg-white/5 backdrop-blur-md p-1 border border-white/10">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <motion.button
                key={s.id}
                onClick={() => onNavClick(s.id)}
                className={[
                  "relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm sm:text-base md:text-lg font-medium transition-all duration-300",
                  isActive ? "text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="mr-1" aria-hidden>
                  {s.emoji}
                </span>
                {s.label}
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-brand-highlight1 to-brand-secondary shadow-lg shadow-brand-highlight1/25"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          type="button"
          className="md:hidden p-2 rounded-xl bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 border border-white/10"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </motion.button>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <motion.div 
          className="md:hidden mx-auto w-[90%] mt-2 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/20 p-2"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <motion.button
                key={s.id}
                onClick={() => {
                  onNavClick(s.id);
                  setMobileOpen(false);
                }}
                className={[
                  "w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  isActive ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                ].join(" ")}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {s.label}
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;



