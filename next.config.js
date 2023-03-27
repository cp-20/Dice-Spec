const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { i18n } = require('./next-i18next.config');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const localeSubpaths = {};

/** @type {import('next').NextConfig} */
module.exports = withPWA(
  withBundleAnalyzer({
    webpack: (config, { webpack }) => {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );
      return config;
    },
    i18n,
    publicRuntimeConfig: {
      localeSubpaths,
    },
    staticPageGenerationTimeout: 1000,
    reactStrictMode: true,
  })
);
