/**
 * log4js日志例子
 */
let log4js = require('log4js');
log4js.configure({
	"appenders": [
		{type: "console"},
		{
			type: 'file',//格式化日志
			filename:  'cheese.log',
			category: 'cheese'
		}
	]
});

let logger = log4js.getLogger('cheese');

module.exports = logger;
