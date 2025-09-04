"use client";
import React, { useCallback, useEffect, useState, ReactNode } from "react";
import { getHome } from "../controllers/HomeController";
import { Container, Typography, Button } from "@mui/material";
import BlurText from "../../../util/reactBits/BlurText";
import FadeContent from "@/app/util/reactBits/FadeContent";


const Home = () => {
  const [judul,setJudul] = useState<ReactNode>(null);
  const [subjudul,setSubJudul] = useState<ReactNode>(null);
  const [narasi,setNarasi] = useState<ReactNode>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getHome();
      console.log('data', data);
      type NarasiChild = { text: string; bold?: boolean };
      type HomeRecord = {
        Judul?: string;
        subjudul?: string;
        narasi?: Array<{ children?: Array<NarasiChild> }>;
      };
      type HomeResponse = { data?: Array<HomeRecord> };
      setJudul(
        <h1 className="font-display pt-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
          {(data as HomeResponse).data?.[0]?.Judul}
        </h1>
      );

      const elmSub = (
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <h4 className="mt-6 font-display text-xl sm:text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-highlight1 to-brand-secondary leading-relaxed">
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
        <Typography variant="body1" className="" sx={{ color: "grey.300", mb: 4 }}>
          <div className="mt-8 max-w-3xl text-left">
            <BlurText
              text={elmNarasi.join(" ")}
              delay={0}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="font-sans text-3xl text-text-secondary leading-relaxed"
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


  if (isLoading) {
    return (
      <div className="min-h-[92vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-highlight1 mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[92vh] flex items-center justify-center">
      <Container maxWidth={false} sx={{ textAlign: "left", width: "90%", mx: "auto" }}>
        {judul}
        {subjudul}
        {narasi}
        
        <div className="mt-8 flex items-center gap-3">
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={()=>{
                const section = document.getElementById("about");
                section?.scrollIntoView({ behavior: "smooth" });
            }}
            sx={{ borderRadius: 12, px: 4, borderColor: 'rgba(193,107,50,0.5)', color: '#C16B32', '&:hover': { borderColor: 'rgba(165,148,137,0.6)', color: '#A59489' } }}
          >
            Learn More
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
