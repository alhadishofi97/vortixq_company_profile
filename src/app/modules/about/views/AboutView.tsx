"use client";
import React, { useEffect, useState,ReactNode  } from "react";
import { getAbount } from "../controllers/AboutController";
import MagicBento from "@/app/util/reactBits/MagicBento";
import CurvedLoop from "@/app/util/reactBits/CurvedLoop";
import SpotlightCard from "@/Components/SpotlightCard/SpotlightCard";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Container, Box, Typography, CssBaseline, Paper } from "@mui/material";



const About = () => {
  const [elmTitle, setelmTitle] = useState('About');
  const [ourMission, setourMission] = useState<ReactNode[]>([]);
  const [ourApproach, setourApproach] = useState<ReactNode[]>([]);

  useEffect(() => {
    generateData();
  }, []);

 
  const generateData = async () => {
  try {
    const datax = await getAbount();
    console.log('datax',datax)

    const elmOurMission: ReactNode[]=[] ;
    
    (await (datax.data as any)?.OurMission)?.map((val:any,i:any)=>{
      elmOurMission.push(
        <Box key={`OurMission${i}`} className="pb-10">
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
            {val.title}
            </Typography>


            {/* Narasi di bawah judul */}
            <Typography
            variant="body2"
            align="center"
            sx={{maxWidth: 720, mx: "auto" }}
            >
             {val.body}
          </Typography>
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


  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-3xl sm:text-4xl font-semibold pb-10">{elmTitle}</h2>
      <div className="grid grid-cols-1 gap-0 min-h-screen">
        <div className="flex">
          <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
             {ourMission}
          </Container>
          
          
        </div>
        <div className="flex">
           <div className="col-span-2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
              {ourApproach}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;
