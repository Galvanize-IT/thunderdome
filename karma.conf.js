var gulpConfig = require('./gulpfile.js');
var path = require('path');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  // Revise the path of the dependencies to account for the test directory
  // TODO import of dependencies within app code might be a better approach
  var files = gulpConfig.DEPENDENCIES;
  files.push('./test/**/*_test.js');

  config.set({
    files: files,
    frameworks: ['mocha', 'sinon-chai'],
    plugins: [
      'karma-webpack',
      'karma-sinon-chai',
      'karma-mocha',
      'karma-chrome-launcher',
    ],
    preprocessors: {
      './test/**/*_test.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    browsers: ['Chrome'],
    // Run once and close
    singleRun: true
  });
};
