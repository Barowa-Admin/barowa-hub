/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@barowa/ui', '@barowa/auth'],
  env: {
    NEXT_PUBLIC_APP_NAME: 'Barowa Hub',
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },
}

module.exports = nextConfig
