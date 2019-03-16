const path = require('path');
const CleanWP = require('clean-webpack-plugin');
const HtmlWP = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[hash:6].build.js'
    },

    module: {
        rules: [{
            test: /\.pug$/,
            loader: 'pug-loader'
        }]
    },

    plugins: [
        new CleanWP(),
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

    ]

}