"use client";
import client from "@/app/util/strepiClient";


type Card = {
  id: number;
  icon: string | null;
  title: string;
  shortDescription: string | null;
  fullDescription: string;
  className:string| ''
};

type ServiceDetail = {
  id: number;
  judul: string;
  desc: string;
  cards: Card[];
};

type Service = {
  id: number;
  documentId: string;
  createdAt: string;   // bisa juga Date kalau mau di-convert
  updatedAt: string;
  publishedAt: string;
  data: ServiceDetail[];
};

type GetServiceResponse = {
  data: Service[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};


interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  className: string;
}

export const getService = async (): Promise<Service[]> => {
  try {
    const services = client.collection('ourservices');
    const response = await services.find({
      populate: { data: { populate: { cards: '*' } } }
    });
    return response.data as Service[]; // ✅ langsung array of Service
  } catch (error) {
    console.error('Error fetching services data:', error);
    return [];
  }
};