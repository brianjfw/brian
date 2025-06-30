/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  optimizeFonts: true,
  images: {
    domains: ["user-images.githubusercontent.com", "cdn.hashnode.com", "github.com"],
  },
  headers: async () => {
    return [
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      {
        source: '/:path*.(ico|png|jpg|jpeg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  basePath: isGithubPages ? '/brian' : '',
  assetPrefix: isGithubPages ? '/brian/' : '',
};

module.exports = nextConfig;
