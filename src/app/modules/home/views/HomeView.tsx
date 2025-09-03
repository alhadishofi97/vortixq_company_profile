"use client";
import React, { useCallback, useEffect, useState, ReactNode } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Typography, Box, Button } from "@mui/material";
import BlurText from "../../../util/reactBits/BlurText";
import FadeContent from "@/app/util/reactBits/FadeContent";


const Home = () => {
  const [judul,setJudul] = useState<ReactNode>(null);
  const [subjudul,setSubJudul] = useState<ReactNode>(null);
  const [narasi,setNarasi] = useState<ReactNode>(null);

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
      setJudul(
        <h1 className="flex items-center pt-10 text-6xl font-extrabold text-white tracking-tight">
          {(data as HomeResponse).data?.[0]?.Judul}
        </h1>
      );

      const elmSub = (
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <h4 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple">
            {(data as HomeResponse).data?.[0]?.subjudul}
          </h4>
        </FadeContent>
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
        <Typography variant="body1" className="text-center" sx={{ color: "grey.300", mb: 4 }}>
          <p className="">
            <BlurText
              text={elmNarasi.join(" ")}
              delay={0}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-center font-sans"
            />
          </p>
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
      <Container maxWidth="md" sx={{ textAlign: "left", mb: 8 }}>

    {judul}
    {subjudul}
    {narasi}

  
    
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={()=>{
              const section = document.getElementById("about");
              section?.scrollIntoView({ behavior: "smooth" });
          }}
          sx={{ borderRadius: 3, px: 4, borderColor: 'rgba(0,229,255,0.5)', color: '#00E5FF', '&:hover': { borderColor: 'rgba(124,58,237,0.6)', color: '#a78bfa' } }}
        >
          Learn More
        </Button>
      </Container>
      </Box>
    </div>
  );
};

export default Home;
