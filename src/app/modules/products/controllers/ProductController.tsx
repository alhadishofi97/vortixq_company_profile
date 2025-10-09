import client from "@/app/util/strepiClient";
import { ProductResponse,Product2 } from "./productInterface";



export const getProduct = async (): Promise<Product2[] | null> => {
  try {
    const productCollection = client.collection("products");
    const response = await productCollection.find({
        
        populate: {
            dashboardImage: { populate: "*" },
            details: { populate: { features: "*", capabilities: "*" } },
            data: { populate:"*" }
        }
    });

    const resx = { data: response.data } as ProductResponse;

   const resp: Product2[] = [];

   console.log('resx.dataresx.data',resx.data)

    resx.data.forEach((val) => {
        // Handle missing or incomplete data gracefully
        const listfeatures: string[] = val.details?.features?.map(feature => feature.list) || [];
        const listcapabilities: string[] = val.details?.capabilities?.map(capability => capability.list) || [];

        resp.push({
            id: val.id_content,
            title: val.title,
            description: val.description,
            dashboardImage: val.dashboardImage?.url || '/placeholder-image.jpg',
            icon: val.icon || '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
            details: {
            features: listfeatures,
            capabilities: listcapabilities,
            },
            data: val.data || [],
            judul2: val.judul2 || val.title,
            subjudul2: val.subjudul2 || val.description
        });
    });

    console.log('respresprespresp',resp)
    return resp
    // response.data itu array, wrap jadi object
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};