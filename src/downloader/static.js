/**
 * Created by yuexing on 2016/06/03.
 * 爬虫的静态下载模块
 */
'use strict';
const _ = require('lodash');
let request = require('superagent');

require('superagent-proxy')(request);
let downloader = (_baseDownloader) => {
	let spiderCore = _baseDownloader.spiderCore,
	    urlInfo    = spiderCore.spiderConf.urlInfo,
	    startTime  = Date.now();
	//设置基本信息
	let q          = request.get(urlInfo.url).set(urlInfo.requestHead || {});



	//如果有proxy信息
	if (urlInfo.proxy) {
		q = q.proxy(urlInfo.proxy);
	}

	//请求信息
	q.end((err, sres) => {
		var result = Object.create(null);
		if(err){
			let netError = spiderCore._config.netError;
			if(sres && sres.status == 403){
				err.code = 'Forbidden';
			}
			result = netError[err.code] || {statusCode : err.code||sres.status};
			result = _.merge(result,urlInfo);
			_baseDownloader.sendData(err, result);
			return false;
		}

		//if (err || !sres.ok) {
		//	_baseDownloader.sendData(err, result);
		//	return false;
		//}
		result = {
			statusCode     : sres.status,
			url            : sres.request.url,
			protocol       : sres.request.protocol,
			host           : sres.request.host,
			urlPath        : sres.request.req.path,
			startTime      : startTime,
			endTime        : Date.now(),

			agentProxy     : sres.request._agent.proxy,

			requestHeader  : sres.request.header || "",//
			responseHeader : sres.headers || "",//
			requestCookies : sres.request.cookies || "",//
			responseCookies: sres.headers['set-cookie'] || "",//

			content        : sres.text//抓取到的html结构
		};
		result = _.merge(result,urlInfo);
		_baseDownloader.sendData(null, result);
	});
};
module.exports = downloader;