import { strapi } from '@strapi/client';

const client = strapi({
  baseURL: 'http://localhost:1337/api',
  auth: process.env.REACT_APP_STREPI_CLIENT
  // opsional: auth, headers, dsb.
});

export default client