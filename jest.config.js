module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!test-component).+\\.js$'],
  setupFilesAfterEnv: ['<rootDir>jest/setupTests.js'],
};
