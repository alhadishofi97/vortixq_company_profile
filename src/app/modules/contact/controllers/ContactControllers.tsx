import client from "@/app/util/strepiClient";


interface Narasi {
  id: number;
  title: string;
  body: string;
  icon: string;
}

interface ContactType {
  id: number;
  icon: string;
  title: string;
  body: string;
}

export interface ContactData {
  id: number;
  narasi: Narasi;
  contact_type: ContactType[];
}


export const getContact= async () => {
    try {
       const contact = client.collection('ourcontacts');
        const response = await contact.find({
            populate: {
                contactData:{
                    populate:{
                        narasi:"*",
                        contact_type:"*"
                    }
                }
            }
        });
    
        return response.data[0].contactData as ContactData ; // ✅ langsung ar
    } catch (error) {
        console.error('Error fetching home data:', error);
        return null;
    }
}