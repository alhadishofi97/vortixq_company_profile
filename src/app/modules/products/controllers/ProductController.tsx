import client from "@/app/util/strepiClient";

export const getProducts = async () => {
    try {
        console.log('process.env.REACT_APP_STREPI_CLIENT', process.env.REACT_APP_STREPI_CLIENT);
        const response = await client.fetch('/api/products?populate=*');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products data:', error);
        return null;
    }
}