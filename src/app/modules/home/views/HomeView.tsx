"use client";
import React, { useCallback, useEffect, useState, ReactNode } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Typography, Box, Button } from "@mui/material";
import BlurText from "../../../util/reactBits/BlurText";
import FadeContent from "@/app/util/reactBits/FadeContent";
import TextType from "../components/title";
import AnimatedSection from "../../../components/animations/AnimatedSection";
import FloatingElements from "../../../components/animations/FloatingElements";
import GlowingOrb from "../../../components/animations/GlowingOrb";
import ParticleField from "../../../components/animations/ParticleField";
import { motion, useScroll, useTransform } from "framer-motion";


const Home = () => {
  const [judul,setJudul] = useState<ReactNode>(null);
  const [subjudul,setSubJudul] = useState<ReactNode>(null);
  const [narasi,setNarasi] = useState<ReactNode>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
      const judulText = (data as HomeResponse).data?.[0]?.Judul || "Welcome to Vortiqx";
      setJudul(
        <div className="font-display text-center mb-10 mt-12">
          <BlurText
            text={judulText}
            delay={200}
            animateBy="words"
            direction="top"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight justify-center"
          />
        </div>
      );

      const subjudulText = (data as HomeResponse).data?.[0]?.subjudul || "Innovative AI & Cybersecurity Solutions";
      const elmSub = (
        <div className="mt-6 font-display text-center">
          <BlurText
            text={subjudulText}
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-brand-highlight1 to-brand-secondary"
          />
        </div>
      );
      setSubJudul(elmSub);

      const children = ((data as HomeResponse).data?.[0]?.narasi?.[0]?.children ?? []) as NarasiChild[];
      const elmNarasi: ReactNode[] = [];
      children.forEach((val) => {
        if (val.bold) {
          elmNarasi.push(`<b>${val.text}</b>`);
        } else {
          elmNarasi.push(val.text);
        }
      });

        setNarasi(
          <Typography variant="body1" className="" sx={{ color: "grey.300", mb: 6, justifyContent: "center" }}>
            <div className="max-w-4xl mx-auto text-center">
              <BlurText
                text={elmNarasi.join(" ")}
                delay={20}
                animateBy="letters"
                direction="bottom"
                onAnimationComplete={handleAnimationComplete}
                className="font-sans text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed text-center justify-center"
              />
            </div>
          </Typography>
        );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };


  return (
       <div className="top-0" style={{ width: '100%', height: '600px', position: 'relative' }}>
      {/* Background Lightning */}
      {/* <Lightning
        hue={220}
        xOffset={0}
        speed={1}
        intensity={1}
        size={1}
        style={{ width: "100%", height: "100%" }}
      /> */}

        {/* <Prism
        animationType="rotate"
        timeScale={0.2}
        scale={4.3}
        height={6.6}
        baseWidth={7}
        noise={0}
        glow={1}
        hueShift={0.46}
        colorFrequency={1}
      /> */}

      {/* <Silk
        speed={5}
        scale={1}
        color="#818669"
        noiseIntensity={1.5}
        rotation={0}
      /> */}
        
        <Box
          sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1, // lebih tinggi dari Lightning
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}>
      {/* Hero Section */}
      <Container maxWidth={false} sx={{ textAlign: "center", width: "90%", mx: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", py: 4 }}>

    {judul}
    {subjudul}
    {narasi}

  
    
        <div className="mt-12 flex items-center justify-center gap-3">
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={()=>{
              const section = document.getElementById("about");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            sx={{ 
              borderRadius: 12, 
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
              text="Learn More"
              delay={200}
              animateBy="letters"
              direction="top"
              className="font-semibold"
            />
          </Button>
        </div>
        {/* <div className="mt-16 w-full flex justify-center">
          <button
            onClick={() => {
              const section = document.getElementById("contact");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-2xl px-6 py-3 bg-gradient-to-r from-brand-highlight1 to-brand-secondary text-white font-semibold shadow-lg hover:opacity-95 transition-all"
          >
            Hubungi kami hari ini
          </button>
        </div> */}
      </Container>
      </Box>
    </div>
  );
};

export default Home;
