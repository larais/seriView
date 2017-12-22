/// <binding BeforeBuild='compile-ts:dev, compile-sass:dev' Clean='clean' ProjectOpened='watch, copy-libs:release, watch:ts, dev' />

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

gulp.task('watch', ['watch:ts', 'watch:sass']);

gulp.task("watch:ts", function () {
    gulp.watch([paths.ts], ["compile-ts:dev"]);
});

gulp.task("watch:sass", function () {
    gulp.watch([paths.scss], ["compile-sass:dev"]);
});

gulp.task('copy-libs:release', function () {
    return gulp.src([
        "semantic/dist/**/**",
        paths.node_modules + "jquery/dist/jquery.min.js",
        paths.node_modules + "vue/dist/vue.min.js",
        paths.node_modules + "moment/min/moment.min.js",
        "./Scripts/Lib/**/**"
    ])
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task('copy-libs:dev', function () {
    return gulp.src([
        "semantic/dist/**/**",
        paths.node_modules + "jquery/dist/jquery.js",
        paths.node_modules + "vue/dist/vue.js",
        paths.node_modules + "moment/moment.js",
        "./Scripts/Lib/**/**"
    ])
        .pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task('copy-sqe', function () {
    return gulp.src([
        "./Scripts/Sqe/**/*"
    ])
        .pipe(gulp.dest("./wwwroot/lib/SQE"));
})

gulp.task("copy-antlr-rt", function () {
    gulp.src([
        "node_modules/antlr4/**/*"
    ])
        .pipe(gulp.dest("wwwroot/antlr4"));
});

gulp.task("dev", ["compile-ts:dev", "compile-sass:dev", "copy-libs:dev", "copy-antlr-rt", "copy-sqe"]);
gulp.task("release", ["compile-ts:release", "compile-sass:release", "copy-libs:release", "copy-antlr-rt", "copy-sqe"]);