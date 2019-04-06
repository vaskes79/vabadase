const path = require('path');
const Dotenv = require('dotenv-webpack');
const CleanWP = require('clean-webpack-plugin');
const HtmlWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const JsOptimize = require('terser-webpack-plugin');
const CssOptimize = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[contenthash:6].[name].js',
    publicPath: isDev ? '/' : '/',
  },

  devtool: isDev && 'source-map',

  devServer: {
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, 'src'),
  },

  optimization: isDev
    ? {}
    : {
        splitChunks: {
          chunks: 'all',
        },
        minimizer: [new JsOptimize({}), new CssOptimize({})],
      },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 3 versions'],
              },
              sourceMap: isDev,
              plugins: () => [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(woff2?)$/,
        loader: 'file-loader',
        options: {
          name: '[contenthash:8].[name].[ext]',
          outputPath: 'static/fonts',
          useRelativePath: true,
        },
      },
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              sizes: [300, 600, 1200, 2000],
              // placeholder: true,
              // placeholderSize: 100,
              name: '[contenthash:6]-[name]-[width].[ext]',
              outputPath: 'static/img',
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash:8].[name].[ext]',
              outputPath: 'static/img',
              useRelativePath: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // webp: {
              //     quality: 75,
              // },
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new Dotenv(),
    new CleanWP(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'css/[contenthash:8].[name].css',
      chunkFilename: isDev ? '[id].css' : 'css/[id].[contenthash:8].css',
    }),
    new HtmlWP({
      template: './src/index.pug',
      minify: !isDev && {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: false,
      },
    }),
  ],
};
