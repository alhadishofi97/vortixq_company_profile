"use client";
import React, { useCallback, useEffect, useState, ReactNode } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Box, Button } from "@mui/material";
import BlurText from "../../../util/reactBits/BlurText";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import Particles from "../../../components/animations/Particles";

const EnhancedHome = () => {
  const [judul,setJudul] = useState<ReactNode>(null);
  const [subjudul,setSubJudul] = useState<ReactNode>(null);
  const [narasi,setNarasi] = useState<ReactNode>(null);
  // Video state removed - video background disabled
  
  

  const getData = useCallback(async () => {
    const data = await getHome();
    console.log('data', data);
    type NarasiChild = { text: string; bold?: boolean };
    type HomeRecord = {
      Judul?: string;
      subjudul?: string;
      narasi?: Array<{ children?: Array<NarasiChild> }>;
    };
    type HomeResponse = { data?: Array<HomeRecord> };
    try {
      const judulText = (data as HomeResponse).data?.[0]?.Judul || "AI-Powered Cybersecurity Platform for Modern Enterprises";
      setJudul(
        <div className="font-display text-center mb-6 mt-0">
          <BlurText
            text={judulText}
            delay={200}
            animateBy="words"
            direction="top"
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight justify-center max-w-full mx-auto px-8 sm:px-12"
          />
        </div>
      );

      const subjudulText = (data as HomeResponse).data?.[0]?.subjudul || "Transforming businesses through cutting-edge AI integration and robust security solutions";
      const elmSub = (
        <div className="mt-3 mb-4 font-display text-center flex justify-center items-center">
          <BlurText
            text={subjudulText}
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed text-white text-center max-w-full mx-auto px-8 sm:px-12"
          />
        </div>
      );
      setSubJudul(elmSub);

      const narasiData = (data as HomeResponse).data?.[0]?.narasi || [];
      const elmNarasi: string[] = [];
      narasiData.forEach((item) => {
        if (item.children) {
          item.children.forEach((child) => {
            elmNarasi.push(child.text);
          });
        }
      });

      const narasiText = elmNarasi.length > 0 ? elmNarasi.join(" ") : "Empowering organizations with cutting-edge AI and cybersecurity solutions for a secure digital future.";
      
      setNarasi(
        <div className="mb-4 mt-2 font-sans text-center w-full flex justify-center">
          <BlurText
            text={narasiText}
            delay={20}
            animateBy="letters"
            direction="bottom"
            className="font-sans text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-text-secondary leading-relaxed text-center max-w-full mx-auto px-8 sm:px-12 break-words"
          />
        </div>
      );

    } catch (error) {
      console.log("err", error);
      // Fallback content
      setJudul(
        <div className="font-display text-center mb-6 mt-0">
          <BlurText
            text="AI Cybersecurity Platform for Modern Enterprises"
            delay={200}
            animateBy="words"
            direction="top"
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight justify-center max-w-full mx-auto px-8 sm:px-12"
          />
        </div>
      );
      
      setSubJudul(
        <div className="mt-16 mb-4 font-display text-center flex justify-center items-center">
          <BlurText
            text="Transforming businesses through cutting-edge AI integration and robust security solutions"
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed text-white text-center max-w-full mx-auto px-8 sm:px-12"
          />
        </div>
      );
      
      setNarasi(
        <div className="mb-10 mt-2 font-sans text-center w-full flex justify-center">
          <BlurText
            text="Empowering organizations with cutting-edge AI and cybersecurity solutions for a secure digital future."
            delay={20}
            animateBy="letters"
            direction="bottom"
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-sans leading-relaxed text-white text-center max-w-full mx-auto px-8 sm:px-12"
          />
        </div>
      );
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // Video-related useEffect removed - video background disabled

  return (
    <div className="relative min-h-screen overflow-hidden pt-20 bg-black">
      {/* Interactive Particles Background */}
      <Particles 
        className="absolute inset-0 pointer-events-none" 
        quantity={50} 
        staticity={50}
        ease={50}
      />

      
      {/* Glowing Orbs */}
      {/* <GlowingOrb 
        size={400} 
        color="brand-highlight1" 
        intensity={0.2} 
        className="top-10 -left-20"
        style={{ zIndex: 3 }}
      />
      <GlowingOrb 
        size={300} 
        color="brand-secondary" 
        intensity={0.15} 
        className="bottom-20 -right-10"
        style={{ zIndex: 3 }}
      /> */}
      
      {/* Hero Content with Enhanced Animations */}
      <div className="relative" style={{ zIndex: 10, position: 'relative' }}>
        <AnimatedSection animation="scale" duration={1.2}>
        <Box
          sx={{
            textAlign: "center",
            width: "95%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: "100vh",
            py: 4,
          }}
        >
          <Container maxWidth={false} sx={{ py: { xs: 2, md: 4 } }}>
            {/* Animated Title */}
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              {judul}
            </AnimatedSection>
            
            {/* Animated Subtitle */}
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              {subjudul}
            </AnimatedSection>
            
            {/* Animated Description */}
            <AnimatedSection animation="fadeInUp" delay={0.6}>
              {narasi}
            </AnimatedSection>
            
            {/* Animated CTA Button - muncul setelah judul dan narasi */}
            <AnimatedSection animation="fadeInUp" delay={3.0}>
              <div className="mt-12 flex items-center justify-center">
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => {
                    const section = document.getElementById("about");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  sx={{ 
                    borderRadius: 7, 
                    px: 4, 
                    py: 1.5,
                    borderColor: '#FF6B35', 
                    color: '#FF6B35',
                    backgroundColor: 'transparent',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    letterSpacing: '0.5px',
                    '&:hover': { 
                      borderColor: '#FF6B35', 
                      color: 'white',
                      backgroundColor: '#FF6B35',
                      boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  LEARN MORE
                </Button>
              </div>
            </AnimatedSection>
          </Container>
        </Box>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default EnhancedHome;