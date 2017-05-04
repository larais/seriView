/// <binding BeforeBuild='default' ProjectOpened='copy-libs:release, copy-libs:dev' />

var gulp = require('gulp'),
    ts = require("gulp-typescript"),
    gulpTypings = require("gulp-typings"),
    rimraf = require("rimraf");

var paths = {
    webroot: "./wwwroot/",
    bowerroot: "./bower_components/"
};

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

gulp.task("copy-semantic-ui", function () {
    return gulp.src([
        paths.bowerroot + "semantic/dist/**/**"
    ])
        .pipe(gulp.dest("./wwwroot/lib/semantic"));
});

gulp.task('copy-libs:release', ["copy-semantic-ui"], function () {
    return gulp.src([
        paths.bowerroot + "jquery/dist/jquery.min.js",
        paths.bowerroot + "jsrender/jsrender.min.js"
    ])
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task('copy-libs:dev', ["copy-semantic-ui"], function () {
    return gulp.src([
        paths.bowerroot + "jquery/dist/jquery.js",
        paths.bowerroot + "jsrender/jsrender.js"
    ])
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task('default', ['compile-ts']);