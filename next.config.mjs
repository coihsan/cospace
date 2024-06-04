/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
        {
          protocol: 'https',
          hostname: 'ucarecdn.com',
        },
      ],
    },
  }
  
  export default nextConfig