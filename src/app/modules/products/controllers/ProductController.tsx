import client from "@/app/util/strepiClient";
import { ProductResponse,Product2,Data } from "./productInterface";



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

    resx.data.forEach((val, i) => {
        const listfeatures: string[] = val.details.features.map(feature => feature.list);
        const listcapabilities: string[] = val.details.capabilities.map(capability => capability.list);


        resp.push({
            id: val.id_content,
            title: val.title,
            description: val.description,
            dashboardImage: val.dashboardImage.url,
            icon: val.icon,
            details: {
            features: listfeatures,
            capabilities: listcapabilities,
            },
            data:val.data,
            judul2:val.judul2,
            subjudul2:val.subjudul2
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