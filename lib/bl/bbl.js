/**
 * Created by Administrator on 2015/10/26.
 */
const db = require("../db/db");
const sql = "select * from user";
exports.select = function () {
    db.selectDB(sql, null, function (err, result) {
        console.info(result);
    });
}
