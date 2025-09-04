import client from "@/app/util/strepiClient";


export const getAbout = async ()=>{
    const about = await client.collection('about');

    const getData = await about.find({ populate: '*' })
    
    return getData 
}