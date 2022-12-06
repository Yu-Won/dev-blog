/** @type {import('next').NextConfig} */

// const REGEX_HTTP_PROTOCOL_PREFIX = new RegExp("^(https?://)", "i");

// const getImageDomainHost = (domain) => {
//   if (!domain) {
//     return "";
//   }
//   return domain.replace(REGEX_HTTP_PROTOCOL_PREFIX, "");
// };

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
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: getImageDomainHost(process.env.NEXT_PUBLIC_CDN_IMG_URL),
    //   },
    // ],
    imageSizes: [64, 256],
    deviceSizes: [640],
  },
};
