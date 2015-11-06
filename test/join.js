/**
 * git clone to local then zip.
 * Created by Administrator on 2015/11/5.
 */
var gulp = require("gulp");
var git = require("gulp-git");
var exec = require("gulp-exec");
var tar = require("gulp-tar");
var gzip = require("gulp-gzip");
var ftp = require("gulp-ftp");
var SSH = require("gulp-ssh");
var clean = require("gulp-clean");
var dateFormat = require("dateformat");
var fs = require("fs");
var curTime = dateFormat(new Date(),"yymmddhhMMss")
var tempName = "devapp"+curTime+".tar.gz";
gulp.task("git", function (cb) {
    return git.clone('git@101.200.182.222:/home/git/wwwroot/dev_app', {args: './dev_temp'}, function (err) {
        cb(err);
    });
});

gulp.task("zip",["git"], function (cb) {
    var zipPath = 'dev_temp/**';
    var unZipFile = ['!'+zipPath+'/*.rar','!'+zipPath+'/*.exe','!'+zipPath+'/.git'];
    unZipFile.unshift(zipPath)
    return gulp.src(unZipFile).pipe(tar("devapp"+curTime+".tar")).pipe(gzip()).pipe(gulp.dest("./release"));
});

gulp.task("scp",["zip"], function (cb) {
    return gulp.src("release/"+tempName).pipe(exec("scp release/"+tempName+" root@123.57.209.55:/home/wwwroot")).pipe(exec.reporter());

})
gulp.task("untar",["scp"], function (cb) {
    var config = {
        host: '123.57.209.55',
        port: 22,
        username: 'root',
        password: "Lijun0410",
        privateKey: fs.readFileSync('E:\\git\\Git\\.ssh\\id_rsa')
    }
    var gulpSSH = new SSH({
        ignoreErrors: false,
        sshConfig: config
    })
    return gulpSSH.exec('tar -xzvf /home/wwwroot/'+tempName+' -C /home/wwwroot', {filePath: 'commands.log'}).pipe(gulp.dest("logs"));
});
gulp.task("clean",["zip"], function (cb) {
    return gulp.src("dev_temp",{read : false}).pipe(clean());
});


gulp.task("deploy",["git","zip","scp","untar","clean"]);

gulp.task("ftp", function () { //将程序上传到window下的ftp目录
    gulp.src('dev_temp/devapp.tar.gz')
        .pipe(ftp({
            host: '123.57.230.82',
            user: 'Administrator',
            pass: 'Zx33854052',
            port: "121"
        }))
});
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
});/**
 * ZIP CUR DIR
 * Created by glutton on 2015/11/4.
 */

var gulp = require("gulp");
var tar = require("gulp-tar");
var gzip = require("gulp-gzip");
gulp.task("zip", function (cb) {
   gulp.src("./node_modules/**").pipe(tar("market.tar")).pipe(gzip()).pipe(gulp.dest("./release"));
});