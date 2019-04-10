module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: false,
        loose: true,
        useBuiltIns: 'usage',
        targets: {
          browsers: ['last 3 versions', 'ie >= 11'],
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
  plugins: ['@babel/plugin-proposal-class-properties'],
};
