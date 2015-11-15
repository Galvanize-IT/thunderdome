var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var express = require('express');
var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-minify-css');
var path = require('path');
var proxy = require('express-http-proxy');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

// Configuration
// ----

var PORT = 8080; // Port for development server
var PROXY_ADDRESS = 'http://localhost:3000'; // Address for an example proxy
var STATIC_DIR = './static'; // Destination directory for static assets
var BUILD_DIR = './dist'; // Destination directory for production build
var NOW = Date.now(); // Used for production timestamp

// A reason to hate gulp: https://github.com/gulpjs/gulp/issues/259
// Solution: http://stackoverflow.com/a/21678601
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// DEPENDENCIES holds all javascript libraries that will be included in
// lib.js instead of app.js
// TODO Build non-min files in order to produce a map?
// TODO use require?
var DEPENDENCIES = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.min.js',
  './node_modules/underscore/underscore-min.js',
  './node_modules/backbone/backbone-min.js',
  './node_modules/react/dist/react.min.js',
  './node_modules/react-dom/dist/react-dom.min.js'
];

// Export the dependencies for testing
module.exports = {
  BUILD_DIR: BUILD_DIR,
  STATIC_DIR: STATIC_DIR,
  DEPENDENCIES: DEPENDENCIES
};

// Linting
// ----
gulp.task('lint', function () {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// Development build tasks
// ----

gulp.task('less', function() {
  return gulp.src('./src/less/app.less')
    .pipe(less().on('error', handleError))
    .pipe(gulp.dest(path.join(STATIC_DIR, 'css')))
    .pipe(livereload());
});
gulp.task('lib', function() {
  return gulp.src(DEPENDENCIES)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(path.join(STATIC_DIR, 'js')));
});

gulp.task('app', function() {
  return gulp.src('./src/js/app.js')
    .pipe(webpack(webpackConfig).on('error', handleError))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(path.join(STATIC_DIR, 'js')))
    .pipe(livereload());
});

gulp.task('reload', function() {
  livereload();
});

gulp.task('watch', function() {
  // Create an express server for testing
  var server = express();

  // Serve static files
  server.use('/static', express.static('static'));

  // Proxy API requests
  server.use('/api', proxy(PROXY_ADDRESS, {
    forwardPath: function(req, res) {
      return req.originalUrl;
    }
  }));

  // Catch-all routing for index.html
  server.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  server.listen(PORT, function() {
    console.log('server listening on port ' + PORT);
  });

  livereload.listen(); // Start live-reload
  gulp.watch('./src/less/**/*.less', ['less']);
  gulp.watch('./src/js/**/*.js', ['app']);
  gulp.watch('./index.html', ['reload']);
});

// Production build tasks
// ----

gulp.task('build-less', function() {
  return gulp.src('./src/less/app.less')
    .pipe(less().on('error', handleError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('app-' + NOW + '.css'))
    .pipe(gulp.dest(path.join(BUILD_DIR, STATIC_DIR, 'css')));
});

gulp.task('build-lib', function() {
  return gulp.src(DEPENDENCIES)
    .pipe(concat('lib-' + NOW + '.js'))
    .pipe(gulp.dest(path.join(BUILD_DIR, STATIC_DIR, 'js')));
});

gulp.task('build-app', function() {
  return gulp.src('./src/js/app.js')
    .pipe(webpack(webpackConfig).on('error', handleError))
    .pipe(rename('app-' + NOW + '.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(BUILD_DIR, STATIC_DIR, 'js')));
});

gulp.task('build-img', function(){
    // TODO inject github commit for cache-busting?
  return gulp.src(path.join(STATIC_DIR, 'img/*'))
    .pipe(gulp.dest(path.join(BUILD_DIR, STATIC_DIR, 'img')));
});

// build-html copies the index.html file to the build directory,
// while injecting the github commit for cache busting
gulp.task('build-html', function(){
  return gulp.src('./index.html')
    .pipe(replace('app.css', 'app-' + NOW + '.css'))
    .pipe(replace('lib.js', 'lib-' + NOW + '.js'))
    .pipe(replace('app.js', 'app-' + NOW + '.js'))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('default', ['less', 'lib', 'app', 'watch']);

gulp.task('build', [
  'build-less',
  'build-lib',
  'build-app',
  'build-img',
  'build-html'
]);
