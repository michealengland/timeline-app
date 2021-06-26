const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@Molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@Organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@Utilities': path.resolve(__dirname, 'src/utilities'),
    }
  },
};