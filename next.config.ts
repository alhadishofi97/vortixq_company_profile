import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    // commend
    REACT_APP_STREPI_HOST:'https://skilled-success-bdc67f0b83.strapiapp.com/api',
    // REACT_APP_STREPI_CLIENT:'97fcb461c915f796529c40723afdc0f13e9dcb5ee286171acb5565d5bdcac267606b836667f7d1134ffc6f50ea837f97f15616e36c6e81fb2002ac2f611b149e56f616b2924c4dc4238e404bf5e8f88581c6398537a1909aa2cb1a5bf41e2b34fc4fd5b03a8ab51b17eb644c5573241d46e1f60c65381c7e1e844e46ff212e79',
    // REACT_APP_STREPI_HOST:'http://localhost:1337/api',
    REACT_APP_STREPI_CLIENT:'7b22302c8732286564374087e3b76644431f4b906fa1cb02721b3946ccf9c467ab5ad31586a7ab7f50bc6bc3eacc9728f1b81aa6f4c53e756e6328660383be49f48875b8b24e702dc93978d479b6213e236cb55384867ec1b9a0c831de100abe045daf75da3606997368fee5586e027625125fef1c88359db663483be511385c',
    // REACT_APP_STREPI_HOST:'http://localhost:1337/api',
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ disable eslint check saat build
  },
  images: {
    domains: ['skilled-success-bdc67f0b83.media.strapiapp.com'],
  },
};






export default nextConfig;



