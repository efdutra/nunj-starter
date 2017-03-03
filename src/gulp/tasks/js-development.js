var gulp           = require('gulp')
,   plumber        = require('gulp-plumber')
,   sourcemaps     = require('gulp-sourcemaps')
,   appData        = require('../util/application-data')
,   frontend       = appData.paths.frontend
,   build          = appData.paths.build
,   source         = require('vinyl-source-stream')
,   buffer         = require('vinyl-buffer')
,   browserify     = require('browserify')
,   watchify       = require('watchify');


gulp.task('js-development', () => {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    b = watchify(b);
    b.on('update', () => {
        bundleShare(b);
    });

    b.add(frontend.root + frontend.js + '/index.js');
    bundleShare(b);
});

function bundleShare(b) {
  b.bundle()
    .pipe(source('index.js'))
    .pipe(plumber({
        handleError: (err) => {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(buffer())
    // .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(build.root + build.js));
}