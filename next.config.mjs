/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "app"),
    };

    if (process.env.NODE_ENV === "production") {
      config.module.rules?.push(
        {
          test: /__mocks__/,
          loader: "ignore-loader",
        },
        {
          test: /__tests__/,
          loader: "ignore-loader",
        },
      );
    }
    return config;
  },
  experimental: {
    instrumentationHook: true,
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_URL,
      },
    ],
  },
};

export default nextConfig;
