var gulp     = require('gulp')
,   appData  = require('../util/application-data')
,   frontend = appData.paths.frontend
,   build    = appData.paths.build;

gulp.task('data',function(){
    gulp.src([frontend.root + frontend.data + '/**/*'])
        .pipe(gulp.dest(build.root + build.data));
});