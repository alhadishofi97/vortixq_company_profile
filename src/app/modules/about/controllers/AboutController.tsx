import client from "@/app/util/strepiClient";


export const getAbount = async ()=>{
    const about = await client.collection('about');

    const getData = await about.find({ populate: '*' })
    
    return getData 
}