/**
 * Created by yuexing on 2016/06/03.
 * 爬虫的静态下载模块
 */
'use strict';
let request = require('superagent');
require('superagent-proxy')(request);
let downloader         = (_baseDownloader) => {
	let spiderCore = _baseDownloader.spiderCore,
	    urlInfo    = spiderCore.setting.urlInfo,
	    startTime  = Date.now();
	//设置基本信息
	request        = request.get(urlInfo.url).set(urlInfo.requestHead || {});

	//如果有proxy信息
	if (spiderCore.proxy) {
		request = request.proxy(spiderCore.proxy);
	}

	//请求信息
	request.end((err, sres) => {
		if (err || !sres.ok) {
			_baseDownloader.sendData(err, sres);
			return false;
		}
		var result = {
			url       : urlInfo.url,//抓取的地址
			startTime : startTime,//开始时间
			endTime   : Date.now(),//结束时间
			statusCode: sres.status,//状态code
			header    : sres.headers || "",//抓取这个页面的header信息
			content   : sres.text//抓取到的html结构
		};
		_baseDownloader.sendData(null, result);
	});
};
module.exports         = downloader;