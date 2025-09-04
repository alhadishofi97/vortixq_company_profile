import client from "@/app/util/strepiClient";

export const getProducts = async ()=>{
    console.log('process.env.REACT_APP_STREPI_CLIENT',process.env.REACT_APP_STREPI_CLIENT)
    const about = await client.collection('products');

    const getData = await about.find({ populate: '*' })
    
    return getData
}