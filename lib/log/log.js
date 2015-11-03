/**
 * LogUtil
 * Created by glutton on 2015/11/2.
 */


const log4js = require("log4js");
const path = require("path");

log4js.configure({
    "appenders": [
        {
            "type": "console",
            "category" : "console"
        },
        {
            "type": "dateFile",
            "pattern" : "_yyyy_MM_dd.log",
            "absolute" : true,
            "filename": "logs/error",
            "alwaysIncludePattern": true,
            "category": "error"
        }
    ],
    "replaceControle" : "true",
    "levels": {
        "error": "DEBUG",
    }
});
const errorLogger = log4js.getLogger("error");

exports.error = function (msg) {
    console.info(process.mainModule);
    errorLogger.error(msg);
}