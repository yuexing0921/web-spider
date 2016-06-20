/**
 * Created by yuexing on 2016/06/03.
 * 爬虫的静态下载模块
 */
'use strict';
const request  = require('superagent');
let downloader = function (_baseDownloader) {
	let spiderCore  = _baseDownloader.spiderCore,
	    urlInfo   = spiderCore.setting.urlInfo,
	    startTime = Date.now();
	request.get(urlInfo.url).set(urlInfo.requestHead || {}).end(function (err, sres) {
		if (err || !sres.ok) {
			_baseDownloader.sendData(err, sres);
			return false;
		}
		var result = {
			"url"        : urlInfo.url,
			"statusCode" : sres.status,
			"content"    : sres.text,
			"remoteProxy": sres.remoteProxy || "",
			"requestDate": Date.now() - startTime,
			"headers"    : sres.headers || ""
		};
		_baseDownloader.sendData(null, result);
	});
};
module.exports = downloader;