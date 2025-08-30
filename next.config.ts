import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    REACT_APP_STREPI_CLIENT:'d7e8ecf1949205b40a89aef6e87758b41710927c55e52ff6b67a64d31185af4d050c59e1f3aac4d78b8bad0a6a60dd067223989a5a1ee3c1be05008c12fe89396efbfd216404de585525290db706c1016aa748a16964cddffbdf06c10a744d2e9c824e49ef8c261ebba451872dcb606c3271df06ed81424e64ea1c8726e91034'
  },
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ disable eslint check saat build
  },
};

export default nextConfig;
