import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for external/mobile device access
  experimental: {
    proxyTimeout: 30_000,
  },
  // Allow mobile device access from this IP
  allowedDevOrigins: ['192.168.0.103'],
  // Turbopack configuration (Next.js 16+ default)
  turbopack: {},
  // Ensure we don't block the HMR websocket
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;