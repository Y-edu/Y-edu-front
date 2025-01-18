/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules?.push(
      {
        test: /__mocks__/,
        loader: 'ignore-loader'
      },
      {
        test: /__tests__/,
        loader: 'ignore-loader'
      }
    )
    return config
  },
  experimental: { instrumentationHook: true }
}

export default nextConfig;
