'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'wiredep']
});

gulp.task('clean', function (done) {
  $.del(['dist/', '.tmp/', 'dev/'], done);
});

gulp.task('devhtml', function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dev'));
});

gulp.task('devjs', function(){
  return gulp.src([
    'src/**/*.js',
    '!src/**/*.spec.js',
    '!src/**/*.mock.js'])
    .pipe(gulp.dest('dev'))
    .pipe($.connect.reload());;
});

gulp.task('injectjs', ['devjs', 'devhtml'], function () {
  return gulp.src(['dev/index.html'])
    .pipe($.inject(gulp.src([
      'app/**/*.js',
      '!app/**/*.spec.js',
      '!app/**/*.mock.js'
    ], {cwd: 'dev'}), {
      addRootSlash: false
    }))
    .pipe(gulp.dest('dev/'));
});

gulp.task('injectcss', ['styles', 'devhtml', 'injectjs'], function () {
  return gulp.src('dev/index.html')
    .pipe($.inject(gulp.src([
        'dev/app/**/*.css',
      ], {read: false}), {
      ignorePath: 'dev',
      addRootSlash: false
    }))
    .pipe(gulp.dest('dev/'));
});

gulp.task('injector:css:preprocessor', function () {
  return gulp.src('src/app/index.scss')
    .pipe($.inject(gulp.src([
        'src/{app,components}/**/*.scss',
        '!src/app/index.scss',
        '!src/app/vendor.scss' 
      ], {read: false}), {
      transform: function(filePath) {
        filePath = filePath.replace('src/app/', '');
        filePath = filePath.replace('src/components/', '../components/');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    }))
    .pipe(gulp.dest('src/app/'));
});

gulp.task('styles', ['injector:css:preprocessor'], function () {
  return gulp.src(['src/app/index.scss', 'src/app/vendor.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dev/app/'));
});

gulp.task('bowerinject', ['injectcss'], function () {

  return gulp.src('dev/index.html')
    .pipe($.wiredep.stream({
      directory: 'bower_components',
      exclude: [/foundation\.js/, /foundation\.css/, /bootstrap\.css/, /foundation\.css/]
    }))
    .pipe(gulp.dest('dev'));
});

gulp.task('webserver', function(){
  $.connect.server({
    livereload: true,
    port: 8888,
    root: 'dev'
  });
});

gulp.task('watch', function(){
  gulp.watch([
    'src/**/*.js',
    '!src/**/*.spec.js',
    '!src/**/*.mock.js'], ['devjs']);
});

gulp.task('dev', ['devhtml', 'injectjs', 'injectcss', 'bowerinject']);

gulp.task('serve', ['dev', 'webserver', 'watch']);
