/// <binding BeforeBuild='default' />

var gulp = require('gulp'),
    ts = require("gulp-typescript"),
    gulpTypings = require("gulp-typings"),
    rimraf = require("rimraf");


gulp.task('clean', function () {
    return gulp.src('./wwwroot/**/*.js', { read: false })
        .pipe(rimraf());
});

gulp.task("installTypings", function () {
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); 
    return stream;
});

gulp.task('compile-ts', function () {
    gulp.src('./TypeScript/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'site.js'
        }))
        .pipe(gulp.dest('./wwwroot/js'));
});

gulp.task('default', ['compile-ts']);