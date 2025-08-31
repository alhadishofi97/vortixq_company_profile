"use client";
import React, { useEffect, useState } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Typography, Box, Button } from "@mui/material";
import BlurText from "../../../util/reactBits/BlurText";

interface NarasiChild {
  text: string;
  bold?: boolean;
}

interface NarasiBlock {
  children: NarasiChild[];
}

interface HomeData {
  Judul?: string;
  subjudul?: string;
  narasi?: NarasiBlock[];
}

const Home = () => {
  const [judul,setJudul] = useState<string>('')
  const [subjudul,setSubJudul] = useState<string>('')
  const [narasi,setNarasi] = useState<(string | React.ReactElement)[]>([])

  useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    const data = await getHome();
    console.log('data',data)
    try {
      const homeData = data.data[0] as HomeData;
      setJudul(homeData?.Judul || '')
      setSubJudul(homeData?.subjudul || '')
      
      if (homeData?.narasi && homeData.narasi[0]?.children) {
        const elmNarasi: (string | React.ReactElement)[] = []
        homeData.narasi[0].children.forEach((val: NarasiChild) => {
          if(val.bold){
            elmNarasi.push(<b key={val.text}>{val.text}</b>)
          }else{
            elmNarasi.push(val.text)
          }
        })
        setNarasi(elmNarasi)
      }
    } catch {
      // Handle error silently
    }
  }

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

    <Typography variant="h1" component="h1" className="flex items-center pt-10 text-6xl font-extrabold text-white drop-shadow-lg" fontWeight="bold">
      {judul}
    </Typography>
    <Typography variant="h2" component="h2" className="text-6xl font-extrabold drop-shadow-lg text-[#b86735]" fontWeight="bold" gutterBottom>
      {subjudul}
    </Typography>
    <Typography variant="body1" className="text-center" sx={{ color: "grey.300", mb: 4 }}>
      <p className="">
      {narasi.length > 0 && (
        <BlurText
        text={narasi.toString()}
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-center font-sans"
        />
      )}
      </p>
    </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ borderRadius: 3, px: 4 }}
        >
          Learn More
        </Button>
      </Container>
      </Box>
    </div>
  );
};

export default Home;
