import { strapi } from '@strapi/client';

const client = strapi({
  // baseURL: 'http://localhost:1337/api',
  baseURL: 'https://phenomenal-dream-766a1aa65b.strapiapp.com/api',
  auth: process.env.REACT_APP_STREPI_CLIENT
  // opsional: auth, headers, dsb.
});

export default client