"use client";
import React, { useEffect, useState,ReactNode } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Typography, Box, Button, Grid, Card, CardContent } from "@mui/material";
import { Star, FlashOn, Build } from "@mui/icons-material";
import Lightning from "../../../util/reactBits/Lightning";
import Prism from "../../../util/reactBits/Prism";
import Silk from "../../../util/reactBits/Silk";
import ShinyText from "../../../util/reactBits/Shiny";
import BlurText from "../../../util/reactBits/BlurText";
import AnimatedContent from "@/app/util/reactBits/AnimatedContent";
import FadeContent from "@/app/util/reactBits/FadeContent";


const Home = () => {
  const [judul,setJudul] = useState<ReactNode>(null);
  const [subjudul,setSubJudul] = useState<ReactNode>(null);
  const [narasi,setNarasi] = useState<ReactNode>(null);

  useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    const data = await getHome();
    console.log('data',data)
    try {
    
      setJudul( <Typography variant="h1" component="h1" className="flex items-center pt-10 text-6xl font-extrabold text-white drop-shadow-lg" fontWeight="bold">{data.data[0]?.Judul}</Typography>)
      const elmSub = <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}><Typography variant="h4" component="h4" className="text-6xl font-extrabold drop-shadow-lg text-[#b86735]" fontWeight="bold" gutterBottom>{data.data[0]?.subjudul}</Typography></FadeContent>
      setSubJudul(elmSub)
      
      const elmNarasi: ReactNode[]=[] ;
      await data.data[0].narasi[0]?.children.map((val:any,i:any)=>{
          if(val.bold){
            elmNarasi.push(`<b>${val.text}</b>`)
          }else{
            elmNarasi.push(val.text)
        
          }
        })
       
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
        </Typography>)
      } catch (error) {
      
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
