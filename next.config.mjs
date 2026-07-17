/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three/drei ship ESM that Next transpiles fine; nothing special needed for GLB (served from /public)
};

export default nextConfig;
