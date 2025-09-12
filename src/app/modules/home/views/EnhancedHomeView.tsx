"use client";
import React, { useCallback, useEffect, useState, ReactNode } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Box, Button } from "@mui/material";
import BlurText from "../../../util/reactBits/BlurText";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import Particles from "../../../components/animations/Particles";
import { motion } from "framer-motion";

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
        <div className="font-display text-center mb-5 mt-5">
          <BlurText
            text={judulText}
            delay={200}
            animateBy="words"
            direction="top"
            className="text-1xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight justify-center"
          />
        </div>
      );

      const subjudulText = (data as HomeResponse).data?.[0]?.subjudul || "Transforming businesses through cutting-edge AI integration and robust security solutions";
      const elmSub = (
        <div className="mt-6 font-display text-center flex justify-center items-center">
          <BlurText
            text={subjudulText}
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-relaxed text-white text-center max-w-7xl mx-auto"
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
        <div className="mb: 6 font-sans text-center">
          <BlurText
            text={narasiText}
            delay={20}
            animateBy="letters"
            direction="bottom"
            className="font-sans text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed text-center justify-center"
          />
        </div>
      );

    } catch (error) {
      console.log("err", error);
      // Fallback content
      setJudul(
        <div className="font-display text-center mb-10 mt-12">
          <BlurText
            text="AI-Powered Cybersecurity Platform for Modern Enterprises"
            delay={200}
            animateBy="words"
            direction="top"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight justify-center"
          />
        </div>
      );
      
      setSubJudul(
        <div className="mt-6 font-display text-center flex justify-center items-center">
          <BlurText
            text="Transforming businesses through cutting-edge AI integration and robust security solutions"
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-relaxed text-white text-center max-w-7xl mx-auto"
          />
        </div>
      );
      
      setNarasi(
        <div className="mb: 6 font-sans text-center">
          <BlurText
            text="Empowering organizations with cutting-edge AI and cybersecurity solutions for a secure digital future."
            delay={20}
            animateBy="letters"
            direction="bottom"
            className="font-sans text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed text-center justify-center"
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
            width: "90%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            py: 4,
          }}
        >
          <Container maxWidth={false} sx={{ py: { xs: 6, md: 6 } }}>
            {/* Animated Title */}
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              {judul}
            </AnimatedSection>
            
            {/* Animated Subtitle */}
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              {subjudul}
            </AnimatedSection>
            
            {/* Animated Description */}
            <AnimatedSection animation="fadeInUp" delay={0.5}>
              {narasi}
            </AnimatedSection>
            
            {/* Animated CTA Button */}
            <AnimatedSection animation="fadeInUp" delay={0.6}>
              <div className="mt-12 flex items-center justify-center">
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                  style={{ perspective: "1000px" }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => {
                      const section = document.getElementById("about");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{ 
                      borderRadius: 10, 
                      px: 4, 
                      py: 1.5,
                      borderColor: '#FF6B35', 
                      color: '#FF6B35',
                      backgroundColor: 'transparent',
                      position: "relative",
                      overflow: "hidden",
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      letterSpacing: '0.5px',
                      '&:hover': { 
                        borderColor: '#FF6B35', 
                        color: '#FF6B35',
                        backgroundColor: 'rgba(255, 107, 53, 0.05)',
                        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.2)',
                        transform: 'translateY(-1px)'
                      },
                      '&::before': {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent)",
                        transition: "left 0.5s",
                      },
                      '&:hover::before': {
                        left: "100%",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <BlurText
                      text="LEARN MORE"
                      delay={200}
                      animateBy="letters"
                      direction="top"
                      className="font-semibold"
                    />
                  </Button>
                </motion.div>
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