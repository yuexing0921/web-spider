/**
 * Created by yuexing on 2016/6/20.
 * 通过downloader产生的page对象
 * @see downloader.js
 */
const cheerio = require('cheerio');
const urlUtil = require('./common/urlUtil.js');
class Page {
	constructor(pageInfo) {
		let content     = pageInfo.content;
		this.url        = pageInfo.url;//抓取的地址
		this.startTime  = pageInfo.startTime;//开始时间
		this.endTime    = pageInfo.endTime;//结束时间
		this.statusCode = pageInfo.statusCode;//状态code
		this.header     = pageInfo.header;//抓取这个页面的header信息
		this.proxy      = pageInfo.proxy;//抓取这个页面的proxy信息
		this.cookies    = pageInfo.cookies;//抓取这个页面的cookies信息
		this.content    = content;//抓取到的html结构
		this.urlList    = page.getUrlList(content);//当前页面的所有url

		this.uuid = "";//TODO 这个稍微有点复杂，以后再实现

	}

	//用于获取页面中所有的url
	static getUrlList(content) {
		let list = [];
		if (content) {
			return list;
		}
		let $ = cheerio.load(content);
		$('a').each((k, obj)=> {
			let url = $(obj).attr("href");
			if (urlUtil.isLegitimate(url)) {
				list.push();
			}
		});
	};
}

let page       = Page;
module.exports = Page;