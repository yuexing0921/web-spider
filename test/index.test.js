/**
 * Created by yuexing on 2016/6/5.
 */
var expect = require('chai').expect;
var Spider = require('../src');

describe("Spider 初始化", function() {

	it("Spider 是一个function", function() {
		expect(typeof Spider).to.be.equal("function");
	});

	it('异步请求应该返回一个对象', function(done){
		var spider  = new Spider({urlInfo:{url:'https://api.github.com'}});
		spider.start();
		spider.on('success',function(data){
			expect(data).to.be.an('object');
			done()
		});
	});

});

