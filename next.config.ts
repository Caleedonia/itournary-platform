/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Don't run ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't run TypeScript checks during production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
