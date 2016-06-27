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

		this.statusCode = pageInfo.statusCode;//状态code
		this.url        = pageInfo.url;//抓取的地址
		this.protocol   = pageInfo.protocol;
		this.host       = pageInfo.host;
		this.urlPath    = pageInfo.urlPath;

		this.startTime = pageInfo.startTime;//开始时间
		this.endTime   = pageInfo.endTime;//结束时间

		this.requestHeader   = pageInfo.requestHeader;
		this.responseHeader  = pageInfo.responseHeader;
		this.requestCookies  = pageInfo.requestCookies;
		this.responseCookies = pageInfo.responseCookies;

		this.agentProxy = pageInfo.agentProxy;//抓取这个页面的proxy信息

		this.content = content;//抓取到的html结构
		page.setUrlList(this, content, spiderConf);//当前页面的所有url

		this.uuid = "";//TODO 这个稍微有点复杂，以后再实现

	}

	//用于获取页面中所有的url
	static setUrlList(self, content, spiderConf) {
		if (!content) {
			return false;
		}

		self.allUrl = [],//当前页面的所有url
			self.listUrl = new Cache(),//当前页面所有的listUrl
			self.pageUrl = new Cache();//当前页面所有的pageUrL
		let $ = cheerio.load(content);
		$('a').each((k, obj)=> {
			let url = $(obj).attr("href");
			if (urlUtil.isLegitimate(url)) {
				self.allUrl.push(url);
			}
			//如果是list页面的URL
			if (spiderConf && spiderConf.listUrl && spiderConf.listUrl.test(url)) {
				self.listUrl.set(url, 0);
			}
			//如果是最终页面的URL
			if (spiderConf && spiderConf.pageUrl && spiderConf.pageUrl.test(url)) {
				self.pageUrl.set(url, 0);
			}
		});
	}
}

let page       = Page;
module.exports = Page;