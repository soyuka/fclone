'use strict'
var gulp = require('gulp')
var wrap = require('gulp-wrap')
var rename = require('gulp-rename')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')

var umd = [
"(function (root, factory) {",
"    if (typeof define === 'function' && define.amd) {",
"        // AMD",
"        define('fclone', [], factory);",
"    } else if (typeof module === 'object' && module.exports) {",
"			  //node",
"        module.exports = factory();",
"    } else {",
"        // Browser globals (root is window)",
"        root.fclone = factory();",
"    }",
"}(this, function () {",
"  <%= contents %>",
"  return fclone",
"}));"].join(require('os').EOL);

gulp.task('default', function() {
  return gulp.src(['src/fclone.js'])
  .pipe(babel({presets: ['es2015']}))
  .pipe(wrap(umd))
  .pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename('fclone.min.js'))
  .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['default'], function() {
  gulp.watch('src/*.js', ['default'])
})
