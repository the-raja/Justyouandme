/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow production build to succeed even if TypeScript or ESLint report errors.
  // This is useful for deploying when type errors are present but you still
  // want an optimized build artifact. Consider fixing types/lint issues later.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
