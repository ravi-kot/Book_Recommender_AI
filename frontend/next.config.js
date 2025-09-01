/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['books.google.com', 'covers.openlibrary.org', 'images-na.ssl-images-amazon.com'],
    unoptimized: true
  },
}

module.exports = nextConfig
