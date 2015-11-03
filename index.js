/**
 *
 */
global.rootPath = __dirname;
var express = require("express");
var log = require("./lib/log/log");
var path = require("path");
var app = express();

log.useAccessLog(app);
app.use(function (req, res, next) {
    res.write("welcome glutton!");
    res.end();
})
app.use(express.static(path.join(__dirname,"public")));
app.listen(8000);
module.exports = app;