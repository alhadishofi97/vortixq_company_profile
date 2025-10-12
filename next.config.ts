import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    REACT_APP_STREPI_CLIENT: process.env.REACT_APP_STREPI_CLIENT || '7cc730bdd281c547720872ecee8d4b6462c150c72f98594f99e6b1c19164459a5d5041a3ef5d8403cc646d97600508c5b4cc4a2a07636bb1a12e9c2bf7d6e125463785121e684ec8aa10d6d84a0d08af80f387a466b31c9fad4f43e89714ebd964149855125599ad0f72400b68a7edc1ba9dafcbb90ffd7fd5322f4b3f444f73',
    REACT_APP_STREPI_HOST: process.env.REACT_APP_STREPI_HOST || 'https://heroic-whisper-e00f6bdb76.strapiapp.com/api',
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ disable eslint check saat build
  },
  images: {
    domains: [process.env.REACT_APP_STREPI_HOST?.replace('/api', '.media.strapiapp.com') || 'heroic-whisper-e00f6bdb76.media.strapiapp.com'],
  },
};

export default nextConfig;
