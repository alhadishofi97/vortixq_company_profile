
"use client";
import React, { useEffect, useState } from "react";
import { getAbount } from "../controllers/AboutController";
import MagicBento from "@/app/util/reactBits/MagicBento";

const About = () => {
  const [elmTitle, setelmTitle] = useState<string | undefined>();

  useEffect(() => {
    generateData();
  }, []);

  const generateData = async () => {
    const datax = await getAbount()
    console.log('About data:', datax)
    if (datax.data && Array.isArray(datax.data) && datax.data.length > 0) {
      setelmTitle(datax.data[0]?.title)
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-3xl sm:text-4xl font-semibold">{elmTitle}</h2>
      <div className="grid grid-cols-3 gap-4 min-h-screen">
        <div className=" flex items-center justify-center">
          <p> We are dedicated to empowering organizations through strategic AI integration and comprehensive cybersecurity solutions. Our expertise bridges the gap between cutting-edge technology and practical business applications. With a team of industry experts, we deliver tailored consulting services that drive innovation, enhance security posture, and create sustainable competitive advantages for our clients.</p>
        </div>
        <div className="flex items-center justify-center col-span-2">
          <MagicBento 
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="129, 134, 105"
            />
        </div>
      </div>
    </div>
  );
};

export default About;
