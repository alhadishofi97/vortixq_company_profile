"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import client from "@/app/util/strepiClient";
import { BrandData } from "./LogoInterface";

export const getLogo = async (): Promise<BrandData | null> => {
  try {
    const res = client.collection("logo");
    const response = await res.find({ populate: "*" });

      if (!response.data) return null;

    // Jika data berupa array, ambil elemen pertama
   const doc = Array.isArray(response.data) ? response.data[0] : [response.data][0];

    if (!doc) return null; // jika array kosong

    const logo: BrandData = {
      id: doc.id,
      documentId: doc.documentId,
      logo:doc.logo,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      publishedAt: doc.publishedAt
    };

    return logo;

  } catch (error) {
    console.error("Error fetching getLogo data:", error);
    return null;
  }
};

type Section = { id: string; label: string; emoji?: string };

interface NavbarProps {
  sections: Section[];
  activeId: string;
  onNavClick: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, activeId, onNavClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [logo, setLogo] = useState(
          <Image
            src="/Black_Full_Name-removebg-preview-cropped.svg"
            width={160}
            height={32}
            alt="logo"
            className="w-28 sm:w-36 md:w-44 h-auto"
          />);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLogo(); // AboutData[] | null
        
        // Cek apakah data logo ada dan valid
        if (data?.logo?.url) {
          setLogo(
            <Image
              src={data.logo.url as string}
              width={160}
              height={32}
              alt="logo"
              className="w-28 sm:w-36 md:w-44 h-auto"
            />
          );
        } else {
          // Jika gambar dihapus atau tidak ada, tampilkan string kosong
          setLogo(<></>);
        }
    
        // console.log('datadatadatadatadatadatadata',data?.logo)
      } catch (error) {
        console.error('Error fetching logo:', error);
        // Jika terjadi error, tampilkan string kosong
        setLogo(<></>);
      }
    }
    fetchData();
  }, []);

  // Hide navbar saat scroll down, show saat scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Selalu tampilkan saat di paling atas
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } 
      // Sembunyikan saat scroll ke bawah
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Tampilkan saat scroll ke atas
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`sticky top-0 z-50 bg-black transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="mx-auto flex w-[90%] items-center justify-between gap-3 py-4" aria-label="Primary">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: 1,
            x: 0
          }}
          transition={{ 
            duration: 0.5, 
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {logo}
        </motion.div>

        {/* Desktop Menu */}
        <motion.div 
          className="hidden md:flex items-center gap-2 p-2 bg-black rounded-full"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ 
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <motion.button
                key={s.id}
                onClick={() => onNavClick(s.id)}
                className={[
                  "relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm sm:text-base md:text-lg font-medium transition-all duration-300",
                  isActive ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
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
        </motion.div>

        {/* Mobile Hamburger */}
        <motion.button
          type="button"
          className="md:hidden p-2 rounded-xl bg-transparent text-white hover:bg-transparent border border-transparent"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: 1,
            x: 0
          }}
          transition={{ 
            duration: 0.5, 
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </motion.button>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <motion.div 
          className="md:hidden mx-auto w-[90%] mt-2 rounded-2xl bg-transparent backdrop-blur-0 border-0 p-2"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
          }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
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
    </header>
  );
};

export default Navbar;



