const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards',
        permanent: true
      }
    ];
  }
};

module.exports = {
  // images: {
  //   domains: ['wallpaperaccess.com'],
  //   withImages
  // },
  reactStrictMode: true,
};
