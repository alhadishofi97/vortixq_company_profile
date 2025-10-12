import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    // commend
    // REACT_APP_STREPI_CLIENT:'622598e7e1f745f77ecdcd06c222dc5be10c4b744ac0f35553682794e20de66d04dbb2703ab4e83d4314b1dd17cbf3fe52991e34be7d71ce3e9db4deb1a83f69e395dd1d674e01215031d07d66e6cf21fc2422cc5d7e16a0e1035aeca621161d01e71caada19363738fc32def77fc34e958847cfcd6892b9013bcb04a39c6ff8',
    // REACT_APP_STREPI_CLIENT:'8b3ea3ce389c827f6af9fc3c64cf0aab0e1f0bce06f5589b6c04efaf3c681442fa77f73f385a54857fdeeba43372925e254ad94b9ea359518c6b1483ea480f67ca78291d2be043dc3844ec8154a63bd3af96b6dd48b488f180d0401b0217a6c52fd09f09bb6fa78fcf9785fb12565dea9126c40ac0c9c78a14d2c490db981a7e',
    REACT_APP_STREPI_CLIENT:'7cc730bdd281c547720872ecee8d4b6462c150c72f98594f99e6b1c19164459a5d5041a3ef5d8403cc646d97600508c5b4cc4a2a07636bb1a12e9c2bf7d6e125463785121e684ec8aa10d6d84a0d08af80f387a466b31c9fad4f43e89714ebd964149855125599ad0f72400b68a7edc1ba9dafcbb90ffd7fd5322f4b3f444f73',
    REACT_APP_STREPI_HOST:'https://heroic-whisper-e00f6bdb76.strapiapp.com/api',
    // REACT_APP_STREPI_HOST:'http://localhost:1337/api',
    
    // REACT_APP_STREPI_HOST:'http://localhost:1337/api',
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ disable eslint check saat build
  },
  images: {
    domains: ['heroic-whisper-e00f6bdb76.media.strapiapp.com'],
  },
};

export default nextConfig;
