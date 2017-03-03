var gulp = require('gulp');

gulp.task('build-release', [
    'data',
    'fonts',
    'images',
    'js-release',
    'markup',
    'scss-release'
]);