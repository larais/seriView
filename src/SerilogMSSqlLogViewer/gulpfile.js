/// <binding BeforeBuild='default' Clean='clean' ProjectOpened='copy-libs:release, copy-libs:dev' />

var gulp = require('gulp'),
    sass = require("gulp-sass");
    ts = require("gulp-typescript"),
    gulpTypings = require("gulp-typings"),
    rimraf = require("gulp-rimraf");

var paths = {
    webroot: "./wwwroot/",
    bowerroot: "./bower_components/"
};
gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('clean:js', function () {
    return gulp.src('./wwwroot/**/*.js', { read: false })
        .pipe(rimraf());
});

gulp.task('clean:css', function () {
    return gulp.src('wwwroot/css/**/*.css', { read: false })
        .pipe(rimraf());
});

gulp.task("installTypings", function () {
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); 
    return stream;
});

gulp.task('compile', ['compile:ts', 'compile:scss']);

gulp.task('compile:ts', function () {
    gulp.src('./TypeScript/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'site.js'
        }))
        .pipe(gulp.dest('./wwwroot/js'));
});

gulp.task('compile:scss', function () {
    return gulp.src('Styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./wwwroot/css'));
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

gulp.task('default', ['clean','compile']);