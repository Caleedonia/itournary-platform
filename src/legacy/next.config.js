/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Updated image configuration using remotePatterns instead of domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  output: "standalone", // Often recommended for Vercel/similar deployments
};

module.exports = nextConfig;
