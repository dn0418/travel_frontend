/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hy', 'ru'],
  },
  images: {
    domains: ['i.ibb.co', 's3.ap-southeast-1.amazonaws.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
