var path = require('path');

module.exports = {
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',

    // Actual application code
    './src/js/app.js',
  ],
  output: {
    path: path.join(__dirname, './static/js'),
    fileName: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // query: {
        //   presets: ['es2015']
        // }
      }
    ],
  }
};
