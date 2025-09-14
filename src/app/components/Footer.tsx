"use client";
import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto w-[90%] py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 text-white/80">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="/Black_Full_Name-removebg-preview-cropped.svg"
                width={120}
                height={24}
                alt="Vortiqx Logo"
                className="h-6 sm:h-8 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed max-w-md">
              Empowering businesses with cutting-edge AI integration and comprehensive cybersecurity solutions. Transform your digital future with Vortiqx.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Services</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="text-white/80">AI Integration & Process Transformation</li>
              <li className="text-white/80">Cybersecurity Consulting</li>
              <li className="text-white/80">Security Assessment & Penetration Testing</li>
              <li className="text-white/80">Compliance & Risk Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="text-white/80">Email: jane.teh@vortiqx.com</li>
              <li className="text-white/80">Phone: +60-123 563 137</li>
              <li className="text-white/80">Malaysia</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs sm:text-sm text-white/60">
          © {new Date().getFullYear()} Vortiqx. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;


