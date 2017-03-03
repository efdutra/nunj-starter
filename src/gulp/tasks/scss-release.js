var gulp           = require('gulp')
,   scss           = require('gulp-sass')
,   autoPrefixer   = require('gulp-autoprefixer')
,   concat         = require('gulp-concat')
,   pxtorem        = require('gulp-pxtorem')
,   cleanCSS       = require('gulp-clean-css')
,   appData        = require('../util/application-data')
,   frontend       = appData.paths.frontend
,   build          = appData.paths.build;

var pxtoremOptions = {
    selectorBlackList: ['.ie8','.ie9']
}

gulp.task('scss-release', function(){
    gulp.src(frontend.root + frontend.scss + '/index.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(pxtorem(pxtoremOptions))
        .pipe(concat('index.css'))
        .pipe(autoPrefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(build.root + build.css))
});        