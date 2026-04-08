/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },

  // better-auth proxy
  async rewrites() {
    return [
      {
        // Explicitly map auth requests
        source: "/api/auth/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/:path*",
      },
      {
        // Explicitly map v1 API requests
        source: "/api/v1/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/:path*",
      },
    ]
  },
}

export default nextConfig
