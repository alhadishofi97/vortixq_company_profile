import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    // commend
    REACT_APP_STREPI_HOST:'skilled-success-bdc67f0b83.strapiapp.com/api',
    // REACT_APP_STREPI_HOST:'http://localhost:1337/api',
    
    // REACT_APP_STREPI_HOST:'http://localhost:1337/api',
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ disable eslint check saat build
  },
  images: {
    domains: ['skilled-success-bdc67f0b83.strapiapp.com'],
  },
};





export default nextConfig;



