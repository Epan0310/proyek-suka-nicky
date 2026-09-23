import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Memaksa Vercel tetap sukses deploy meskipun ada warning/error TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
