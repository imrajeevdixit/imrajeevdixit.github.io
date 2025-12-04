/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove 'output' to use default Vercel deployment
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;