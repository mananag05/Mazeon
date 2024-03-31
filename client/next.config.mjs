/** @type {import('next').NextConfig} */
const nextConfig = {
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
