const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { i18n } = require('./next-i18next.config');

const localeSubpaths = {};

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
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
