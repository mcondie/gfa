var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['karma']
});

gulp.task('test', function (done) {
  $.karma.server.start({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS']
  }, done);
});

gulp.task('testChrome', function (done) {
  $.karma.server.start({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: false,
    browsers: ['Chrome']
  }, done);
});