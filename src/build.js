const gulp = require('gulp');

const rename = require('gulp-rename');
const browserify = require('browserify');

const babelify = require('babelify')

browserify(['./src/lib/main.js'])
  .transform(babelify.configure({
    presets: ["es2015"]
  })).bundle()
      .on('error', function (err) {
        console.log(err.message);
      })
    .pipe(rename({
        suffix: '.min.js'
      }))
    .pipe(gulp.dest('./src/public/js'))