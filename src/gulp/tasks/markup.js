var gulp           = require('gulp')
,   nunjucksRender = require('gulp-nunjucks-render')
,   appData        = require('../util/application-data')
,   plumber        = require('gulp-plumber')
,   frontend       = appData.paths.frontend
,   build          = appData.paths.build;

gulp.task('markup', function(){
    gulp.src(frontend.root + frontend.markup.root + frontend.markup.views + '/**/*.nunj')
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(nunjucksRender({
            ext : ".html"
        }))
        .pipe(gulp.dest(build.root + build.markup.root));

    gulp.src(frontend.root + frontend.markup.root + frontend.markup.templates + '/**/*.nunj')
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(build.root + build.markup.templates));
});