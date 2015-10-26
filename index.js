/**
 *
 */
var express = require("express");
var path = require("path");
var app = express();
var sub = express();//二级目录
var http = require("http").createServer(app)
var subHttp = require("http").createServer(sub);
var serverSocket = require("socket.io")(http)
var abl = require("./lib/bl/abl");
var bbl = require("./lib/bl/abl");
abl.select();
bbl.select();
app.use(express.static(path.join(__dirname,"public")));
serverSocket.on("connection", function (socket) {
    console.info("this is socketServer!");
    socket.on("all", function (obj) {
        console.info(obj);
        serverSocket.emit("all",obj);

    });
    socket.on("one", function(obj){
        console.info(obj);
        serverSocket.emit(obj.type,obj.msg);
    });
});

sub.use("/", function (req, res, next) {
    res.send("this is sub path");
});

app.use(["/sub","/manage","/s*b"],sub);

http.listen("4444", function () {
    console.info("server listen on 4444 port!");
});
subHttp.listen("3333", function () {
    console.info("server listen on 3333 port!");
});
module.exports = app;