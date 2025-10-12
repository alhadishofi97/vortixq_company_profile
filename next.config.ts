import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    REACT_APP_STREPI_CLIENT: process.env.REACT_APP_STREPI_CLIENT,
    REACT_APP_STREPI_HOST: process.env.REACT_APP_STREPI_HOST,
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ disable eslint check saat build
  },
  images: {
    domains: [process.env.REACT_APP_STREPI_HOST?.replace('/api', '.media.strapiapp.com') || 'heroic-whisper-e00f6bdb76.media.strapiapp.com'],
  },
};

export default nextConfig;
