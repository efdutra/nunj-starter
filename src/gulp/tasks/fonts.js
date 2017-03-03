var gulp     = require('gulp')
,   appData  = require('../util/application-data')
,   frontend = appData.paths.frontend
,   build    = appData.paths.build;

gulp.task('fonts', function(){
    gulp.src([frontend.root + frontend.fonts + '/**/*.{eot,svg,ttf,woff,woff2,css}'])
        .pipe(gulp.dest(build.root + build.fonts));
});