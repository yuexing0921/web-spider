/**
 * Created by yuexing on 2016/6/8.
 */
var expect = require('chai').expect;
var logger = require('../../src/common/logger');

describe("logger test", function() {

	it("logger 的默认log级别INFO", function() {
		expect(logger.getLevel()).to.be.equal("INFO");
	});


});

