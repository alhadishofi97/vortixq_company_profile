"use client";
import client from "@/app/util/strepiClient";

export const getService = async () => {
    try {
        console.log('process.env.REACT_APP_STREPI_CLIENT', process.env.REACT_APP_STREPI_CLIENT);
        const services = client.collection('ourservices');
        console.log('servicesservices',services)
        const response = await services.find({
           populate: { data: { populate: { cards: '*' } } }
        });
         
        console.log('response service',response)
        return response;

        
    } catch (error) {
        console.error('Error fetching services data:', error);
        return null;
    }
}