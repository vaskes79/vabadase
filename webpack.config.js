const path = require('path');
const CleanWP = require('clean-webpack-plugin');


module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[hash:6].build.js'
    },

    plugins: [
        new CleanWP()
    ]

}