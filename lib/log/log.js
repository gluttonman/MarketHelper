/**
 * LogUtil
 * Created by glutton on 2015/11/2.
 */


const log4js = require("log4js");
const path = require("path");
const fs = require("fs");
const logPath = path.join(global.rootPath,"/logs");
if(!fs.existsSync(logPath)){
    fs.mkdirSync(logPath)
}
log4js.configure({
    "appenders": [
        {
            "type": "console",
            "category" : "console"
        },
        {
            "type": "dateFile",
            "pattern" : "_yyyy_MM_dd.log",
            "filename": path.join(global.rootPath , "/logs/access"),
            "alwaysIncludePattern": true,
            "category": "access"
        },
        {
            "type": "dateFile",
            "pattern" : "_yyyy_MM_dd.log",
            "filename": path.join(global.rootPath , "/logs/error"),
            "alwaysIncludePattern": true,
            "category": "error"
        }
    ],
    "replaceControle" : "true",
    "levels": {
        "error": "DEBUG",
        "access" : "ALL"
    }
});
const errorLogger = log4js.getLogger("error");
const accessLogger = log4js.getLogger("access")
exports.error = function (msg) {
    errorLogger.error(msg);
}

exports.useAccessLog = function (app) {
    app.use(log4js.connectLogger(accessLogger,{level:"info"}));
}