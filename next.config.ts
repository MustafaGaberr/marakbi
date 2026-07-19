import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote images configuration (replacement for deprecated images.domains)
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.daffa.pro",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
    // Allow using specific quality values in <Image quality={...} />
    // to avoid Next.js 16 warning about images.qualities
    qualities: [75, 85, 90],
  },
  eslint: {
    // Ignore ESLint errors/warnings during builds to bypass legacy issues in the codebase
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://staging.fawaterk.com https://app.fawaterk.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://img.youtube.com https://i.ytimg.com; media-src 'self' https://res.cloudinary.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://staging.fawaterk.com https://app.fawaterk.com; connect-src 'self' https://api.daffa.pro https://yasershaban.pythonanywhere.com https://api.cloudinary.com https://staging.fawaterk.com https://app.fawaterk.com http://127.0.0.1:5000 http://127.0.0.1:8787;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;