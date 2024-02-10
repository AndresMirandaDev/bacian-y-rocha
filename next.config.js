/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/:oc*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
