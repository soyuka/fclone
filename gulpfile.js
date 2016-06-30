const gulp = require('gulp')
const wrap = require('gulp-wrap')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const uml = `
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('clone', [], factory);
    } else if (typeof module === 'object' && module.exports) {
			  //node
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.clone = factory();
    }
}(this, function () {
  <%= contents %>
  return clone
}));
`

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
