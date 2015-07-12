var gulpConfig = require('../gulpfile.js');
var path = require('path');
var webpackConfig = require('../webpack.config.js');

module.exports = function (config) {
  // Revise the path of the dependencies to account for the test directory
  // TODO import of dependencies within app code might be a better approach
  var files = gulpConfig.DEPENDENCIES.map(function(file) {
    return path.join('..', file);
  });
  files.push('test.bundle.js');

  config.set({
    files: files,
    frameworks: ['chai', 'mocha'],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-webpack',
    ],
    preprocessors: {
      'test.bundle.js': ['webpack']
    },
    singleRun: true, // Run once and close
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    browsers: ['Chrome']
  });
};
