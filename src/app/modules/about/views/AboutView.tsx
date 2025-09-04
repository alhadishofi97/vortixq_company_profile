"use client";
import React, { useEffect, useState,ReactNode  } from "react";
import { getAbout } from "../controllers/AboutController";
import SpotlightCard from "@/Components/SpotlightCard/SpotlightCard";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Container, Box, Typography } from "@mui/material";



const About = () => {
  const [elmTitle, setelmTitle] = useState('About');
  const [ourMission, setourMission] = useState<ReactNode[]>([]);
  const [ourApproach, setourApproach] = useState<ReactNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateData();
  }, []);

 
  const generateData = async () => {
  try {
    setIsLoading(true);
    const datax = await getAbout();
    console.log('datax',datax)

    const elmOurMission: ReactNode[]=[] ;
    
    (await (datax.data as any)?.OurMission)?.map((val:any,i:any)=>{
      elmOurMission.push(
        <Box key={`OurMission${i}`} className="pb-10">
          {/* <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
            {val.title}
            </Typography> */}
          <h1 className="flex justify-center items-center text-lg">
            {val.title}
          </h1>


            {/* Narasi di bawah judul */}
            {/* <Typography
            variant="body2"
            align="center"
            sx={{maxWidth: 720, mx: "auto" }}
            >
             {val.body}
          </Typography> */}
            <p className="flex justify-center align-center items-center text-center text-sm">
             {val.body}
          </p>
        </Box>)
    })

    setourMission(elmOurMission)

    const elmOurApproach: ReactNode[]=[] ;
    (await (datax.data as any)?.OurApproach)?.map((val:any,i:any)=>{
      elmOurApproach.push(
           <SpotlightCard
            key={i}
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <Typography variant="subtitle2" gutterBottom><AnalyticsIcon/></Typography>
            <Typography variant="subtitle2" gutterBottom><b>{val.title ?? "test"}</b></Typography>
            <Typography variant="caption">{val.body ?? "test"}</Typography>
          </SpotlightCard>
      )
    })
  setourApproach(elmOurApproach)

  } catch (error) {
    console.log("err", error);
  }
};


  if (isLoading) {
    return (
      <div className="relative mx-auto w-[90%] py-24 bg-transparent">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-highlight1 mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-[90%] py-24 bg-transparent">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 right-1/4 w-64 h-64 rounded-full bg-brand-highlight1/15 blur-3xl animate-pulse-glow" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold pb-6 text-white leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-highlight1 to-brand-secondary">{elmTitle}</span>
      </h2>
      <div className="grid grid-cols-1 gap-0 min-h-[60vh]">
        <div className="flex">
          <Container maxWidth={false} sx={{ py: { xs: 6, md: 6 } }}>
             {ourMission}
          </Container>
        </div>
        <div className="flex">
           <div className="col-span-2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {ourApproach}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
