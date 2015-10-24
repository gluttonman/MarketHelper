/**
 *
 * Created by Administrator on 2015/10/24.
 */

describe("test", function () {
    it.only("test", function () {
        console.info("one");
    });
    it.skip("test", function (done) {
        console.info("aaa")
        done();
    });
});