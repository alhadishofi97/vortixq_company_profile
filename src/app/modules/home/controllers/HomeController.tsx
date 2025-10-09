import client from "@/app/util/strepiClient";

interface HomeResponse {
  data: HomeDocument[];
  meta: Meta;
}

// Interface untuk tiap dokumen Home
interface HomeDocument {
  id: number;
  documentId: string;
  Judul: string;
  subjudul: string;
  narasi: NarasiBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Struktur narasi (rich text)
interface NarasiBlock {
  type: string;
  children: NarasiChild[];
}

interface NarasiChild {
  text: string;
  type: string;
}

// Struktur metadata pagination
interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const getHome = async () => {
    try {
       const home = client.collection('homes');
        const response = await home.find({
        populate: "*"
        });
        console.log('response.data',response.data)
        return response.data as HomeDocument[]; // ✅ langsung ar
    } catch (error) {
        console.error('Error fetching home data:', error);
        return null;
    }
}