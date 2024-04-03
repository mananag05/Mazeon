/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental : {
    esmExternals : "loose"
  },
  webpack : (config) => {
    config.externals = [...config.externals , { canvas : "canvas"}]
    return config
  },
    reactStrictMode : false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname : 'powerusers.microsoft.com',
            port : ''
          },
        ],
      },
};

export default nextConfig;
