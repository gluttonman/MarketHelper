/**
 *
 * Created by Administrator on 2015/11/4.
 */

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var inject = require("gulp-inject");
var series = require('stream-series');
var dateformat = require("dateformat");
var minifyCSS = require("gulp-minify-css");
var args = require("yargs").default('min', false).argv;
gulp.task("script", function () {
    gulp.src(["./srcjs/*.js"])
        .pipe(concat("util.js"))
        .pipe(gulp.dest("./staff/js"))
        .pipe(gulp.dest("./sales/js"))
        .pipe(gulp.dest("./map/js"))
        .pipe(gulp.dest("./agents/js"))
        .pipe(rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./staff/js"))
        .pipe(gulp.dest("./sales/js"))
        .pipe(gulp.dest("./map/js"))
        .pipe(gulp.dest("./agents/js"));
});

gulp.task("injectJS", function () {
    var jsPath = "sales_ionic/js"
    var target = gulp.src("sales_ionic/index.html");
    var sourceJS = [];
    sourceJS.push(jsPath + "/fangdd.js", jsPath + "/controllers.js", jsPath + "/app.js");
    var source = gulp.src(sourceJS).pipe(concat("util.js")).pipe(gulp.dest(jsPath));
    if (args.min) {
        var miniSource = source.pipe(rename(function (path) {
            path.extname = ".min.js";
        })).pipe(uglify()).pipe(gulp.dest(jsPath));
        return target.pipe(inject(miniSource, {relative: true})).pipe(gulp.dest("sales_ionic/"));
    } else {
        return target.pipe(inject(source, {relative: true})).pipe(gulp.dest("sales_ionic/"));
    }

});


gulp.task("injectCSS", function () {
    var cssPath = "sales_ionic/css", concatName = "fdd_style_"+dateformat(new Date(),"yyyymmddhhMMss")+".css";
    var target = gulp.src("sales_ionic/index.html");
    var sourceCSS = [];
    sourceCSS.push(cssPath + "/style.css");

    var source = gulp.src(sourceCSS).pipe(concat(concatName)).pipe(gulp.dest(cssPath));
    if (args.min) {
        var miniSource = source.pipe(rename(function (path) {
            path.extname = ".min.css";
        })).pipe(minifyCSS()).pipe(gulp.dest(cssPath));
        return target.pipe(inject(miniSource, {relative: true})).pipe(gulp.dest("sales_ionic/"));
    } else {
        return target.pipe(inject(source, {relative: true})).pipe(gulp.dest("sales_ionic/"));
    }
});
