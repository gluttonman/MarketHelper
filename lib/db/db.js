/**
 * Mysql DB MANAGER
 * Created by Administrator on 2015/10/24.
 */
"use strict"
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "dbconfig.json");
let pool;
exports = module.exports = (function () {
    pool = mysql.createPool(JSON.parse(fs.readFileSync(filePath, "utf8")))
    return function (sql, values, callback) {
        pool.getConnection(function (connErr, connection) {
            console.log(sql + ":" + values);
            if (connErr) {
                callback(connErr, null);
                connection.release();
                return;
            }
            connection.query(sql, values, function (queryErr, rows) {
                callback(queryErr, rows);
                connection.release();
            });
        });
    }
})()
