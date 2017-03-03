var browserSync    = require('browser-sync').create()
,   gulp           = require('gulp')
,   appData        = require('../util/application-data')
,   frontend       = appData.paths.frontend
,   build          = appData.paths.build
,   routes         = appData.routes;

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: build.root,
            index: appData.main,
            middleware: (req, res, next) => {
                for(var route in routes){
                    regExp = RegExp(route);
                    if(!regExp.test(req.url)) continue;
                    req.url = routes[route];
                    break;
                }
                return next();
            }
        }
    });

    gulp.watch(frontend.root + '/**/*')
        .on('change', (info) => {
            console.log('--->', info.path, info.type);
        });

    gulp.watch([build.root + '/**/*', '!' + build.root + '/img/**/*'])
        .on('change', (info) => {
            console.log('--->', info.path, info.type);
            browserSync.reload();
        });
});

module.exports = browserSync;