var gulp = require('gulp');

gulp.task('build', [
    'data',
    'fonts',
    'images',
    'js-development',
    'markup',
    'scss-development',
    'browser-sync'
]);