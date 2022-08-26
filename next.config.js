const withMDX = require("@next/mdx");
const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = (phase, { defaultConfig }) => {
  const plugins = [
    withMDX({
      options: {
        remarkPlugins: [],
        rehypePlugins: [],
        providerImportSource: "@mdx-js/react"
      },
      extension: /\.(md|mdx)$/,
      pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
    }),
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
      openAnalyzer: false
    })
  ];

  return plugins.reduce((acc, next) => next(acc), {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.mdx/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader'
          }
        ]
      })
      return config
    }
  });
};
