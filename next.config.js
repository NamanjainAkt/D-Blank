/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimize image loading
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: __dirname,
  },
  // Security headers for SEO and trust
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets aggressively for better Core Web Vitals
        source: '/(_next/static|images|favicon.ico)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Redirect old domain to new domain (if needed)
  async redirects() {
    return [
      // Uncomment if you had an old domain and need redirects
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'dblanks\\.in' }],
      //   destination: 'https://dblanks.site/:path*',
      //   permanent: true, // 301 redirect
      // },
    ];
  },
};

module.exports = nextConfig;
