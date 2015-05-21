var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gls = require('gulp-live-server');

// A reason to hate gulp: https://github.com/gulpjs/gulp/issues/259
// Solution: http://stackoverflow.com/a/21678601
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// concat the js dependencies
gulp.task('js', function() {
  return gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist'));
});

// Re-compile changes to Less files
gulp.task('less', function() {
  return gulp.src('./src/app.less')
    .pipe(less().on('error', handleError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  var server = gls.static('.', 8080);
  server.start(); 
  gulp.watch('./src/app.less', ['less']);
  gulp.watch(['./index.html', './dist/app.css'], server.notify);
});

gulp.task('default', ['js', 'less', 'watch']);
