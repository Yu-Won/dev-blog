/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compress: true,
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
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/1",
      },
    ];
  },
  webpack: (config, options) => {
    config.plugins.push(new CompressionPlugin());

    return {
      ...config,
      mode: options.dev ? "development" : "production",
      devtool: options.dev ? "eval-source-map" : "hidden-source-map",
    };
  },
});
