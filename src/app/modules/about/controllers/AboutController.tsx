import client from "@/app/util/strepiClient";

interface AboutData {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  narasi: string;
  list: Quote[];
}
interface Quote {
  __component: string;
  id: number;
  title: string;
  body: string | null;
  icon: string | null;
}

interface RawAboutDocument {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  narasi: string;
  list?: Quote[];
}

export const getAbout = async (): Promise<AboutData | null> => {
  try {
    const res = client.collection("about");
    const response = await res.find({ populate: "*" });

    if (!response.data) return null;

    // Jika data berupa array, ambil elemen pertama
   const doc = Array.isArray(response.data) ? response.data[0] : [response.data][0];

    if (!doc) return null; // jika array kosong

    const aboutData: AboutData = {
      id: doc.id,
      documentId: doc.documentId,
      title: doc.title,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      publishedAt: doc.publishedAt,
      narasi: doc.narasi,
      list: doc.list || [],
    };

    return aboutData;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
};



