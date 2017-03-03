var gulp           = require('gulp')
,   scss           = require('gulp-sass')
,   autoPrefixer   = require('gulp-autoprefixer')
,   sourcemaps     = require('gulp-sourcemaps')
,   concat         = require('gulp-concat')
,   pxtorem        = require('gulp-pxtorem')
,   cleanCSS       = require('gulp-clean-css')
,   appData        = require('../util/application-data')
,   frontend       = appData.paths.frontend
,   build          = appData.paths.build;

var pxtoremOptions = {
    selectorBlackList: ['.ie8','.ie9']
}

gulp.task('scss-development', function(){
    gulp.src(frontend.root + frontend.scss + '/index.scss')
        .pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(pxtorem(pxtoremOptions))
        .pipe(concat('index.css'))
        .pipe(autoPrefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(build.root + build.css))
});        