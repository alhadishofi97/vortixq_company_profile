"use client";
import React, { useEffect, useState } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Typography, Box, Button, Grid, Card, CardContent } from "@mui/material";
import { Star, FlashOn, Build } from "@mui/icons-material";
import Lightning from "./Lightning";
import Prism from "./Prism";
import Silk from "./Silk";

const Home = () => {
  const [judul,setJudul] = useState('judul')
  const [subjudul,setSubJudul] = useState('sub judul')
  const [narasi,setNarasi] = useState('narasi')

  useEffect(()=>{
    getData()
  },[])

  const getData = async()=>{
    const data = await getHome();
    console.log('data',data)
  }
  

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
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>

        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
          {judul}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{ color: "primary.main", mb: 3 }}
        >
          {subjudul}
        </Typography>
        <Typography variant="body1" sx={{ color: "grey.300", mb: 4 }}>
          {narasi}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 3, px: 4, mr: 2 }}
        >
          Mulai Sekarang
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ borderRadius: 3, px: 4 }}
        >
          Pelajari Lebih Lanjut
        </Button>
      </Container>
      </Box>
    </div>
  );
};

export default Home;
