/**
 * Mysql DB MANAGER
 * Created by Administrator on 2015/10/24.
 */
"use strict"
const mysql = require("mysql");
const fs = require("fs");
const EventEmitter = require("event").EventEmitter;
const emitter = new EventEmitter();
const dbconfig = {};
exports = module.exports = function () {

    return {
        select : function () {

        }
    };
}
