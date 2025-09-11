import client from "@/app/util/strepiClient";

export const getAbout = async () => {
    try {
        const response = await client.fetch('/api/about?populate=*');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching about data:', error);
        return null;
    }
}