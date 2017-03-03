var gulp     = require('gulp')
,   del      = require('del')
,   appData  = require('../util/application-data')
,   build    = appData.paths.build;

gulp.task('clean', function() {
    del([build.root], {force : true}).then(paths => {
        console.log('Removed * from path ' + build.root);
    });
});