const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { i18n } = require('./next-i18next.config');

const localeSubpaths = {};

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pegjs/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    });
    return config;
  },
  i18n,
  publicRuntimeConfig: {
    localeSubpaths,
  },
  staticPageGenerationTimeout: 1000,
  reactStrictMode: true,
  env: {
    GTM_ID: process.env.GTM_ID,
  },
});
