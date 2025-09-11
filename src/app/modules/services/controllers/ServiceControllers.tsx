"use client";
import client from "@/app/util/strepiClient";

export const getService = async () => {
    try {
        console.log('process.env.REACT_APP_STREPI_CLIENT', process.env.REACT_APP_STREPI_CLIENT);
        const response = await client.fetch('/api/services?populate=*');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching services data:', error);
        return null;
    }
}