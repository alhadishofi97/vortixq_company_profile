import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    REACT_APP_STREPI_CLIENT:'3aca2d0f11698d5a8eaeed954ff3fe21592ed093161fb895f8171219bfcad710642f37737c08c52eeadbce6e506efac975d7ea847f36aa48473d1143653532e55ada78641da88052261675a71d9154c6a522474ff11e623eeafb345ce79c5f0dfc094f57d3b79bcb8a2978a30bd8cf5fa4719ec165be46817e9b82ddb95eff3a',
    // REACT_APP_STREPI_CLIENT:'d7e8ecf1949205b40a89aef6e87758b41710927c55e52ff6b67a64d31185af4d050c59e1f3aac4d78b8bad0a6a60dd067223989a5a1ee3c1be05008c12fe89396efbfd216404de585525290db706c1016aa748a16964cddffbdf06c10a744d2e9c824e49ef8c261ebba451872dcb606c3271df06ed81424e64ea1c8726e91034',
    REACT_APP_STREPI_HOST:'https://phenomenal-dream-766a1aa65b.strapiapp.com/api',
    // REACT_APP_STREPI_HOST:'http://localhost:1337/api',
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ disable eslint check saat build
  },
};

export default nextConfig;
