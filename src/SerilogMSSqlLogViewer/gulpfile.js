/// <binding BeforeBuild='compile-ts:dev, compile-sass:dev' Clean='clean' ProjectOpened='watch, compile-ts:dev, compile-sass:dev, copy-libs:release, copy-libs:dev' />

var gulp = require('gulp'),
    ts = require("gulp-typescript"),
    sass = require("gulp-sass"),
    rename = require('gulp-rename'),
    gulpTypings = require("gulp-typings"),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require("gulp-rimraf"),
    plumber = require('gulp-plumber'),
    rmLines = require("gulp-rm-lines");

var tsProject = ts.createProject("tsconfig.json");

var paths = {
    webroot: "./wwwroot/",
    node_modules: "./node_modules/",
    ts: "./Scripts/**/*.ts",
    scss: "./Styles/**/*.scss"
};

var errorHandler = function (error) {
    console.log(error);
    this.emit('end');
};

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task("clean:js", function () {
    return gulp.src('./wwwroot/**/*.js', { read: false })
        .pipe(rimraf());
});

gulp.task("clean:css", function () {
    return gulp.src('./wwwroot/**/*.css', { read: false })
        .pipe(rimraf());
});

gulp.task("installTypings", function () {
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); 
    return stream;
});

gulp.task("compile-ts:dev", function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(rmLines({ "filters": ["import Vue from 'vue'", "import axios from 'axios'"] }))
        .pipe(gulp.dest(paths.webroot + "js"));
});

gulp.task("compile-ts:release", function () {
    return gulp.src(paths.ts)
        .pipe(ts({
            noImplicitAny: true
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

gulp.task('watch', ['watch:ts', 'watch:sass']);

gulp.task("watch:ts", function () {
    gulp.watch([paths.ts], ["compile-ts:dev"]);
});

gulp.task("watch:sass", function () {
    gulp.watch([paths.scss], ["compile-sass:dev"]);
});

gulp.task("copy-semantic-ui", function () {
    return gulp.src([
        paths.node_modules + "semantic-ui/dist/**/**"
    ])
    .pipe(gulp.dest("./wwwroot/lib/semantic"));
});

gulp.task('copy-libs:release', ["copy-semantic-ui"], function () {
    return gulp.src([
        paths.node_modules + "jquery/dist/jquery.min.js",
        paths.node_modules + "vue/dist/vue.min.js"
    ])
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task('copy-libs:dev', ["copy-semantic-ui"], function () {
    return gulp.src([
        paths.node_modules + "jquery/dist/**/*",
        paths.node_modules + "vue/dist/vue.js"
    ])
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task("release", ["compile-ts:release", "compile-sass:release", "copy-libs:release"]);