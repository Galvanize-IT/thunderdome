var path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, './static/js'),
    fileName: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
  }
};
