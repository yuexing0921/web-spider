/**
 * 工具类
 */
'use strict';
class UrlUtil {
	/**
	 * @desc 判断是否是合法的URL地址一部分
	 *
	 * @param {string} url
	 *
	 * @return boolean
	 */
	static isLegitimate(url) {
		if (!url) {
			return false;
		}
		if (url.indexOf("javascript") > -1) {
			return false;
		}
		if (url.indexOf("mailto") > -1) {
			return false;
		}
		if (url.charAt(0) === '#') {
			return false;
		}
		if (url === '/') {
			return false;
		}
		if (url.substring(0, 6).indexOf("data") > -1) {//base64编码图片
			return false;
		}
		if (url.indexOf("about:") > -1) {
			return false;
		}
		if (url.indexOf('{') > -1) {
			return false;
		}
		return true;
	}

	/**
	 * cookies获取到的数据是一个jons对象，需要把对象转换成普通字符串才能使用
	 * */
	static cookiesJsonToStr(jsonObj) {
		var str = "";
		if (!jsonObj) {
			return str;
		}
		for (var k in jsonObj) {
			str += k + "=" + jsonObj[k] + ";";
		}
		return str;
	}

	/**
	 * 获取一个url的域名
	 * */
	static getHost(url) {
		if (!url) {
			return "";
		}
		var host = /.*\:\/\/([^\/]*).*/.exec(url);
		if (host && host.length > 1) {
			return host[1];
		}
		return "";
	}

	/**
	 * 获取一个url的一级域名 TODO 这个就一些常用的域名，如果有其他的，可以告诉我，我会添加上去
	 * */
	static getDomain(url) {
		if (!url) {
			return "";
		}
		var domains = [
			'com',
			'cn',
			'org',
			'net',
			'hk',
			'cc',
			'top',
			'wang',
			'tv',
			'de',
			'com.cn',
			'com.hk',
			'co.jp'
		];
		var domain  = new RegExp('\([-\\w]+.\(\?\:' + domains.join('|') + '\)\)').exec(url);
		if (domain && domain.length > 1) {
			return domain[1];
		}
		return "";
	}

	static getProtocol(url) {
		var protocol = /https?:/i.exec(url);
		if (protocol && protocol.length > 0) {
			return protocol[0];
		}
		return 'http:';
	}
	static getOrigin(url){
		var origin = /https?:\/\/[\w|.|:]+/i.exec(url);
		if (origin && origin.length > 0) {
			return origin[0];
		}
		return '';
	}
	/**
	 * 获取url后面的所有参数 url为传过来的链接
	 * @param {string} id为参数名
	 * @returns {object} 参数值
	 */
	static getParams(url) {
	if(!url){
		return {};
	}
	var name, value;
	var str = url; //取得整个地址栏
	var num = str.indexOf("?")
	str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
	var arr = str.split("&"); //各个参数放到数组里
	var params = [];
	for (var i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			params[name] = value;
		}
	}
	return params;
};
}
module.exports = UrlUtil;