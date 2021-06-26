const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@AppConfig': path.resolve(__dirname, 'src/projectConfig'),
      '@Atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@FirebaseApp': path.resolve(__dirname, 'src/firebase'),
      '@Molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@Organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@Utilities': path.resolve(__dirname, 'src/utilities'),
    }
  },
};