const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('transpilar', () =>
    gulp.src('es6/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('default', function(){
    gulp.watch('es6/*.js', gulp.series('transpilar'));
});