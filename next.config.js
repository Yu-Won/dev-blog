/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compress: false,
  poweredByHeader: false,
  httpAgentOptions: {
    keepAlive: false,
  },
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [64, 256],
    deviceSizes: [640],
  },
};
