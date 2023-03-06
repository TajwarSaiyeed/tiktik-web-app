/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.ibb.co", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
