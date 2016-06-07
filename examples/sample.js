/**
 * 这是一个最简单的例子
 * 抓取cnodejs首页的信息，web目录下cnodejs需要获取的数据
 */
const cheerio = require('cheerio');
const url = "https://cnodejs.org";

let urlInfo = {url:url};
let spider = new (require('../'))({urlInfo:urlInfo});
//启动爬虫
spider.start();
spider.on('success',(data) =>{
	try{
		let $ = cheerio.load(data.data.content);
		let web = require('./web/cnodejs.org');
		web.run($);
		console.log(web.getList());
	}catch(e){
		console.error(e);
	}
});
spider.on('error',(err) =>{
	console.error(err);
});
