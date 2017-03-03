var gulp     = require('gulp')
,   appData  = require('../util/application-data')
,   frontend = appData.paths.frontend;

gulp.task('watch', function(){
    gulp.watch(frontend.root + frontend.scss         + '/**/*.scss',                         ['scss-development'  ]);
    gulp.watch(frontend.root + frontend.markup.root  + '/**/*.nunj',                         ['markup']);
    gulp.watch(frontend.root + frontend.fonts        + '/**/*.{eot,svg,ttf,woff,woff2,css}', ['fonts' ]);
    gulp.watch(frontend.root + frontend.images       + '/**/*.{png,jpg,jpeg,gif,svg}',       ['images']);
    gulp.watch(frontend.root + frontend.data         + '/**/*.json',                         ['data', 'markup']);
});