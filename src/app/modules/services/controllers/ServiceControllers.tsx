"use client";
import client from "@/app/util/strepiClient";

export const getService = async ()=>{
    console.log('process.env.REACT_APP_STREPI_CLIENT',process.env.REACT_APP_STREPI_CLIENT)
    const service = await client.collection('service');

    const getData = await service.find({ populate: '*' })
    
    return getData
}