// next.config.mjs
// const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/field-crm',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/field-crm',
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
