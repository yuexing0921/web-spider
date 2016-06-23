/**
 * Created by yuexing on 2016/6/20.
 * 通过downloader产生的page对象
 * @see downloader.js
 */
const cheerio = require('cheerio');
const urlUtil = require('./common/urlUtil.js');
let Cache     = require('./cache').SimpleCache;
class Page {
	constructor(pageInfo, spiderConf) {
		let content = pageInfo.content;
		this.url    = pageInfo.url;//抓取的地址
		this.startTime = pageInfo.startTime;//开始时间
		this.endTime = pageInfo.endTime;//结束时间
		this.statusCode = pageInfo.statusCode;//状态code
		this.header = pageInfo.header;//抓取这个页面的header信息
		this.agentProxy = pageInfo.proxy;//抓取这个页面的proxy信息
		this.cookies = pageInfo.cookies;//抓取这个页面的cookies信息
		this.content = content;//抓取到的html结构
		page.setUrlList(content, spiderConf);//当前页面的所有url

		this.uuid = "";//TODO 这个稍微有点复杂，以后再实现

	}

	//用于获取页面中所有的url
	static setUrlList(content, spiderConf) {
		this.allUrl = [],//当前页面的所有url
			this.listUrl = new Cache(),//当前页面所有的listUrl
			this.pageUrl = new Cache();//当前页面所有的pageUrL

		if (content) {
			return false;
		}


		let $ = cheerio.load(content);
		$('a').each((k, obj)=> {
			let url = $(obj).attr("href");
			if (urlUtil.isLegitimate(url)) {
				this.allUrl.push(url);
			}
			if(spiderConf && spiderConf.listUrl && spiderConf.listUrl.test(url)){
				this.listUrl.set(url,0);
			}
			if(spiderConf && spiderConf.pageUrl && spiderConf.pageUrl.test(url)){
				this.pageUrl.set(url,0);
			}
		});
	}

;
}

let page       = Page;
module.exports = Page;