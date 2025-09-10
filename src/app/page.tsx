"use client"
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import About from "./modules/about/views/AboutView";
import Home from "./modules/home/views/EnhancedHomeView";
import ServiceCards from "./modules/services/views/EnhancedServiceCards";
import ProductsView from "./modules/products/views/ProductsView";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactView from "./modules/contact/views/ContactView";
// import GlassMorphismBackground from "../Components/GlassMorphismBackground/GlassMorphismBackground";


interface Section {
  id: string;
  label: string;
  emoji: string;
}

const SECTIONS: Section[] = [
  { id: "home", label: "Home", emoji:'',},
  { id: "about", label: "About", emoji: '' },
  { id: "services", label: "Services", emoji: '' },
  { id: "products", label: "Products", emoji: '' },
  { id: "contact", label: "Contact", emoji: '' },
];

function isSandboxed(): boolean {
  if (typeof window === "undefined") return false;
  const href = window.location?.href || "";
  return href.startsWith("about:srcdoc");
}

function safeUpdateHash(id: string) {
  try {
    if (typeof window === "undefined") return;
    if (isSandboxed()) return;
    if (typeof history?.replaceState === "function") {
      const url = new URL(window.location.href);
      url.hash = id;
      history.replaceState(null, "", url.toString());
    } else {
      window.location.hash = id;
    }
  } catch {
    // Handle error silently
  }
}

function useScrollSpy(ids: string[], options: IntersectionObserverInit = {}): string {
  const [activeId, setActiveId] = useState<string>(ids[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
        ...options,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, options]);

  return activeId;
}


export default function SmoothScrollNavbarDemo() {
  const router = useRouter();
  const sectionIds = useMemo(() => ["home","about","contact"], []);
  const activeId = useScrollSpy(sectionIds);

  const handleNavClick = (id: string) => {
    if (id.startsWith("/")) {
      router.push(id);
      return;
    }
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    safeUpdateHash(id);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, []);

  return (
    <div className="min-h-screen text-slate-100 font-sans relative">
      {/* Glass Morphism Background */}
      {/* <GlassMorphismBackground /> */}     
      <Navbar sections={SECTIONS} activeId={activeId} onNavClick={handleNavClick} />

      <section id="home" className="scroll-mt-30 min-h-[92vh] border-t border-white/5">
        <Home/>
      </section>
      <section id="about" className="scroll-mt-24 border-t border-white/5">
          {<About/>}
      </section>

      {/* Services di-home dihapus, gunakan halaman /services */}
      <section id="services" className="scroll-mt-32 border-t border-white/5">
        <ServiceCards/>
      </section>

      {/* Produk opsional, bisa diaktifkan jika diperlukan */}
      <section id="products" className="scroll-mt-24 border-t border-white/5">
        <ProductsView/>
      </section>
      <section id="contact" className="scroll-mt-24 border-t border-white/5">
          <ContactView/>
      </section>

      <Footer />
    </div>
  );
}
