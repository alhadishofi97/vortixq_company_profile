import { strapi } from '@strapi/client';

const client = strapi({
  baseURL: process.env.REACT_APP_STREPI_HOST as string,
  auth: process.env.REACT_APP_STREPI_CLIENT
  // opsional: auth, headers, dsb.
});

export default client