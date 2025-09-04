"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


type Section = { id: string; label: string; emoji?: string };

interface NavbarProps {
  sections: Section[];
  activeId: string;
  onNavClick: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, activeId, onNavClick }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 mt-6">
      <nav className="mx-auto flex w-[90%] items-center justify-between gap-3 py-4" aria-label="Primary">
        {/* Logo di kiri */}
        <div className="flex items-center gap-3">
          <Image src="/Black_Full_Name-removebg-preview-cropped.svg" width={140} height={28} alt="logo" />
        </div>

        {/* Menu navigasi di tengah */}
        <div className="flex items-center gap-2 rounded-2xl bg-white/5 backdrop-blur-sm p-1">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onNavClick(s.id)}
                className={[
                  "relative px-4 py-2 rounded-xl text-lg font-medium transition-all duration-200",
                  isActive ? "text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
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
              </button>
            );
          })}
        </div>

        {/* Spacer untuk balance layout */}
        <div className="w-[140px]"></div>
      </nav>
    </header>
  );
};

export default Navbar;



