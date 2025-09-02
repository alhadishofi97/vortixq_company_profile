import client from "@/app/util/strepiClient";

export const getHome = async ()=>{
    console.log('process.env.REACT_APP_STREPI_CLIENT',process.env.REACT_APP_STREPI_CLIENT)
    const about = await client.collection('homes');

    const getData = await about.find({ populate: '*' })
    
    return getData
}