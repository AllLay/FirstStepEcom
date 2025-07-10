/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'h875nmd7bw.ufs.sh',
        pathname: '/**',
      },
      // Add UploadThing CDN domains here if needed
      {
        protocol: 'https',
        hostname: 'cdn.uploadthing.com',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
