var gulp     = require('gulp')
,   imagemin = require('gulp-imagemin')
,   appData  = require('../util/application-data')
,   frontend = appData.paths.frontend
,   build    = appData.paths.build

gulp.task('images', () => {    
    gulp.src([frontend.root + frontend.images + '/**/*.{png,jpg,gif,svg}'])
        .pipe(imagemin())
        .pipe(gulp.dest(build.root + build.images));
});