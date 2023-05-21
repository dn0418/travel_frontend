/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['i.ibb.co'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
