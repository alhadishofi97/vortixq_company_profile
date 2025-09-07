"use client";
import React from "react";
import ServiceCards from "./views/ServiceCards";
import GlassMorphismBackground from "@/Components/GlassMorphismBackground/GlassMorphismBackground";

export default function ServicesPage() {
  return (
    <div className="min-h-screen text-slate-100 font-sans">
      <GlassMorphismBackground />
      <section className="border-t border-white/5">
        <ServiceCards />
      </section>
    </div>
  );
}
