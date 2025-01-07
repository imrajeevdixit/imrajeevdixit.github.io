/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', 
  basePath: '/reimagine',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;