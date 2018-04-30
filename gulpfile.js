var gulp = require("gulp");
var server = require("browser-sync").create();
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require("run-sequence");
var del = require("del");

gulp.task("style", function() {
   gulp.src("source/less/style.less")
        .pipe(plumber())
       .pipe(less({
           paths: ['./**/*.less']
       }))
        .pipe(postcss([
            autoprefixer({browsers: ['last 5 version']})
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("serve", function () {
    server.init({
        server: "build/",
        browser: "google chrome",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("source/less/**/*.less", ["style"]);
    gulp.watch("source/*.html", ["html"]);
});

gulp.task("images", function () {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimisationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))


    .pipe(gulp.dest("img"));
});

gulp.task("webp", function () {
    return gulp.src("source/img/**/*.{jpg,png}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("img"));
});

gulp.task("sprite", function () {
    return gulp.src("source/img/**/icon-*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"))
        .pipe(server.stream());
});

gulp.task("build", function (done){
    run(
        "clean",
        "copy",
        "style",
      //  "sprite",
        "html",
        done
    );
});

gulp.task("copy", function () {
    return gulp.src([
        "source/fonts/**/*.woff2",
        "source/img/**",
        "source/js/**"
        ], {
        base: "./source/"
        })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build");
});
