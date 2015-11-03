/**
 * Tets Log Module
 * Created by glutton on 2015/11/2.
 */
const log = require("../log.js");
describe("test log!", function () {
    it("test log ", function (done) {
        log.error("aaa")
        done();
    });
});