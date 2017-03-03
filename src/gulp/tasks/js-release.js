var gulp           = require('gulp')
,   plumber        = require('gulp-plumber')
,   uglify         = require('gulp-uglify')
,   appData        = require('../util/application-data')
,   frontend       = appData.paths.frontend
,   build          = appData.paths.build
,   source         = require('vinyl-source-stream')
,   buffer         = require('vinyl-buffer')
,   browserify     = require('browserify');


gulp.task('js-release', () => {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    b.add(frontend.root + frontend.js + '/index.js');
    b.bundle().pipe(source('index.js'))
    .pipe(plumber({
        handleError: (err) => {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(build.root + build.js));
});