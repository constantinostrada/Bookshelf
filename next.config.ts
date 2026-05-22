import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Bookshelf – Next.js 15 configuration */
  experimental: {
    // Turbopack is stable in Next 15; no flag needed for `next dev --turbopack`
  },
};

export default nextConfig;
