"use client"
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import About from "./modules/about/views/AboutView";
import Home from "./modules/home/views/HomeView";
import ServiceCards from "./modules/services/views/ServiceCards";
import ProductsView from "./modules/products/views/ProductsView";

import Navbar from "./components/Navbar";
import ContactView from "./modules/contact/views/ContactView";
import GlassMorphismBackground from "../Components/GlassMorphismBackground/GlassMorphismBackground";


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
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(sectionIds);

  const handleNavClick = (id: string) => {
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
    <div className="min-h-screen text-slate-100 font-sans">
      {/* Glass Morphism Background */}
      <GlassMorphismBackground />
      <Navbar sections={SECTIONS} activeId={activeId} onNavClick={handleNavClick} />

      <section id="home" className="scroll-mt-30 min-h-[92vh] border-t border-white/5">
        <Home/>
      </section>
      <section id="about" className="scroll-mt-24 border-t border-white/5">
          {<About/>}
      </section>

      <section id="services" className="scroll-mt-10 border-t border-white/5">
        <ServiceCards/>
      </section>
      <section id="products" className="scroll-mt-24 border-t border-white/5">
        <ProductsView/>
      </section>
      <section id="contact" className="scroll-mt-24 border-t border-white/5">
          <ContactView/>
      </section>

      {/* <section id="pricing" className="scroll-mt-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="text-3xl sm:text-4xl font-semibold">Pricing</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {["Starter", "Pro", "Enterprise"].map((tier, i) => (
              <div key={tier} className="rounded-2xl border border-white/10 p-6">
                <div className="text-xl font-semibold">{tier}</div>
                <div className="mt-2 text-3xl font-bold">${(i + 1) * 9}</div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>Feature A</li>
                  <li>Feature B</li>
                  <li>Feature C</li>
                </ul>
                <button className="mt-6 w-full rounded-xl bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-600">
                  Choose {tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

   

      <footer className="border-t border-white/10 py-10 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} Vortiqx. All rights reserved.
      </footer>
    </div>
  );
}
