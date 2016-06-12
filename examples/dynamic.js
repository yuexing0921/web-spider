/**
 * 这是一个会执行页面js之后的例子
 */
const cheerio = require('cheerio');
const path = require('path');
const urls =[
	"https://www.taobao.com",
	"http://www.baidu.com",
	"http://www.jd.com"
];
let urlInfo = {
	url             : urls[1],
	isDynamic       : true,//设置是否用phantomjs请求url，有的元素是js之后完之后才会出现
	phantomConfig   : path.resolve(__dirname,'phantom-config.json'),//phantomjs执行的【静态】命令config.json文件路径，可以不用配置，默认有一个，如果配置的false，那么默认的也不用
	phantomLines    : ['--load-images=false'],//phantomjs执行的【动态】命令，比如proxy呀，cookie文件呀，默认不用设置 //具体配置参见http://phantomChild.org/api/command-line.html
	phantomBridgeJs : "",//和phantomjs桥接js，可以自己再写一个，默认有一个，如果要自定义，可以参照[_lib/phantom-spec.js]。
	isGenerateImg   : true, //设置是否生成图片和html，[true] ：生成的图片会以 [域名 + 时间]组合
	//generatePath    : ,//生成图片存放在哪里,这里设置成执行node的路径，就是examples，默认：会放置在执行的根目录下
	timeout: 30*1000//执行的超时时间，默认：10秒
};
let spider = new (require('../'))({urlInfo:urlInfo});
spider.start();
spider.on('success',(data) =>{
	try{
		let $ = cheerio.load(data.data.content);
		console.log($('title').text());
	}catch(e){
		console.error(e);
	}
});
spider.on('error',(err) =>{
	console.error(err);
});
