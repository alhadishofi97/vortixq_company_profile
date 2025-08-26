"use client";
import React, { useEffect, useState } from "react";
import { getAbount } from "../controllers/AboutController";

const About = () => {
  const [elmAbount, setelmAbount] = useState<JSX.Element[] | null>(null);
  const [elmTitle, setelmTitle] = useState();

  useEffect(() => {
    generateData();
  }, []);

  const generateData = async () => {
    const datax = await getAbount()
    setelmTitle(datax.data?.title)

    let elm = datax.data.blocks.map((val)=>val.body)
    
    setelmAbount(elm);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <h2 className="text-3xl sm:text-4xl font-semibold">{elmTitle}</h2>
      {elmAbount}
    </div>
  );
};

export default About;
