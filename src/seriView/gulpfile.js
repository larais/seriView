/// <binding BeforeBuild='compile-ts:dev, compile-sass:dev' Clean='clean' ProjectOpened='watch, copy-libs:release, watch:ts, dev' />
var gulp = require('gulp'),
    ts = require("gulp-typescript"),
    sass = require("gulp-sass"),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require("gulp-rimraf"),
    plumber = require('gulp-plumber'),
    rmLines = require("gulp-rm-lines");

var tsProject = ts.createProject("tsconfig.json");

var paths = {
    webroot: "./wwwroot/",
    ts: "./Scripts/**/*.ts",
    scss: "./Styles/**/*.scss"
};

var errorHandler = function (error) {
    console.log(error);
    this.emit('end');
};

gulp.task("clean:js", function () {
    return gulp.src(['./wwwroot/js/**/*.js', './wwwroot/js/**/*.js.map'], { read: false })
        .pipe(rimraf());
});

gulp.task("clean:css", function () {
    return gulp.src('./wwwroot/css/**/*.css', { read: false })
        .pipe(rimraf());
});

gulp.task('clean', gulp.parallel(['clean:js', 'clean:css']));

gulp.task("compile-ts:dev", function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(rmLines({
            "filters": [/^import\s[\S +]+\sfrom\s(['"]\w+['"];$)/gm] }))
        .pipe(gulp.dest(paths.webroot + "js"));
});

gulp.task("compile-ts:release", function () {
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js
        .pipe(rmLines({
            "filters": [/^import\s[\S +]+\sfrom\s(['"]\w+['"];$)/gm]
        }))
        .pipe(gulp.dest(paths.webroot + "js"));
});

gulp.task("compile-sass:dev", function () {
    return gulp.src(paths.scss)
        .pipe(plumber(errorHandler))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest(paths.webroot + 'css'));
});

gulp.task("compile-sass:release", function () {
    return gulp.src(paths.scss)
        .pipe(plumber(errorHandler))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.webroot + 'css'));
});

gulp.task("watch:ts", function () {
    gulp.watch([paths.ts], ["compile-ts:dev"]);
});

gulp.task("watch:sass", function () {
    gulp.watch([paths.scss], ["compile-sass:dev"]);
});

gulp.task('watch', gulp.parallel(['watch:ts', 'watch:sass']));

gulp.task('copy-libs', function () {
    return gulp.src([
        "./Scripts/Sqe/require.js"
    ])
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task('copy-sqe', function () {
    return gulp.src([
        "./Scripts/Sqe/**/*",
        "!./Scripts/Sqe/require.js"
    ])
        .pipe(gulp.dest("./wwwroot/lib/SQE"));
});

gulp.task("dev", gulp.parallel(["compile-ts:dev", "compile-sass:dev", "copy-libs", "copy-sqe"]));
gulp.task("release", gulp.parallel(["compile-ts:release", "compile-sass:release", "copy-libs", "copy-sqe"]));