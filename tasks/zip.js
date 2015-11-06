/**
 * ZIP CUR DIR
 * Created by glutton on 2015/11/4.
 */

var gulp = require("gulp");
var tar = require("gulp-tar");
var gzip = require("gulp-gzip");
gulp.task("zip", function (cb) {
   gulp.src("./node_modules/**").pipe(tar("market.tar")).pipe(gzip()).pipe(gulp.dest("./release"));
});