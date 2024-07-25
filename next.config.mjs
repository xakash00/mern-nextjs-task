/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_URI: process.env.DB_URI
  }
};

export default nextConfig;
