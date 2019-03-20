const path = require('path');
const CleanWP = require('clean-webpack-plugin');
const HtmlWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const JsOptimize = require('terser-webpack-plugin');
const CssOptimize = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[hash:6].build.js',
    publicPath: isDev ? '/' : '/vabadase/',
  },

  devtool: isDev && 'source-map',

  devServer: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    contentBase: path.join(__dirname, 'src'),
  },

  optimization: isDev
    ? {}
    : {minimizer: [new JsOptimize({}), new CssOptimize({})]},

  module: {
    rules: [
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
                browser: ['last 5 versions'],
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
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              sizes: [300, 600, 1200, 2000],
              placeholder: true,
              placeholderSize: 50,
              name: '[hash:6]-[name]-[width].[ext]',
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
    new CleanWP(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'css/[hash:8].[name].css',
      chunkFilename: isDev ? '[id].css' : 'css/[id].[hash:8].css',
    }),
    new HtmlWP({
      template: './src/index.pug',
      minify: !isDev && {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: true,
      },
    }),
  ],
};
