// StrepiClient utility
export const strepiClient = {
  // Add your Strepi client implementation here
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  
  async fetch(endpoint: string, options?: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    return fetch(url, options);
  }
};

export default strepiClient;