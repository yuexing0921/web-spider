/**
 * 这是一个传入log4js日志的例子
 * 可以自动把原来的日志转换成log4js的日志格式，方便统计
 */

const url = "https://cnodejs.org";

//加载自定义logger
let logger  = require('./log/logger');
let spider  = new (require('../'))({logger:logger,urlInfo: {url: url}});
//启动爬虫
spider.start();
spider.on('success', (data) => {
	try {
		logger.info(data);
	} catch (e) {
		logger.error(e);
	}
});
spider.on('error', (err) => {
	logger.error(err);
});
