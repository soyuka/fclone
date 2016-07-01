'use strict'
var gulp = require('gulp')
var wrap = require('gulp-wrap')
var rename = require('gulp-rename')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')

var uml = [
"(function (root, factory) {",
"    if (typeof define === 'function' && define.amd) {",
"        // AMD",
"        define('soyuka-clone', [], factory);",
"    } else if (typeof module === 'object' && module.exports) {",
"			  //node",
"        module.exports = factory();",
"    } else {",
"        // Browser globals (root is window)",
"        root.soyuka_clone = factory();",
"    }",
"}(this, function () {",
"  <%= contents %>",
"  return clone",
"}));"].join(require('os').EOL);

gulp.task('default', function() {
  return gulp.src(['src/clone.js'])
  .pipe(babel({presets: ['es2015']}))
  .pipe(wrap(uml))
  .pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename('clone.min.js'))
  .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['default'], function() {
  gulp.watch('src/*.js', ['default'])
})
