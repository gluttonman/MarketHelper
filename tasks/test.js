/**
 * Test Concat
 * Created by glutton on 2015/11/6.
 */
var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var through = require("through2");
var path = require("path");
gulp.task("test", function () {
    var chunk = [];
    var size = 0;
    gulp.src("tasks/*.js").pipe(through.obj(function (file, enc, cb) {
            var content = file.contents;
            if (!Buffer.isBuffer(content)) {
                content = new Buffer(content);
            }
            size += content.length;
            chunk.push(content);
            console.info(chunk);
            cb();
        }, function (cb) {
            console.info("-----------------");
            var joinFile = new gutil.File()
            joinFile.contents = Buffer.concat(chunk, size);
            joinFile.path = path.join("./","join.js");
            this.push(joinFile);
            cb();
        })
    ).pipe(gulp.dest("test/"));
});

gulp.task("concat", function () {
    gulp.src("./tasks/*.js").pipe(concat("test.js")).pipe(gulp.dest("./test/"));
});