import client from "@/app/util/strepiClient";

export const getHome = async () => {
    try {
        console.log('process.env.REACT_APP_STREPI_CLIENT', process.env.REACT_APP_STREPI_CLIENT);
        const response = await client.fetch('/api/homes?populate=*');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        return null;
    }
}