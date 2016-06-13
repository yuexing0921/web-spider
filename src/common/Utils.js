/**
 * 工具类
 */
'use strict';
class Utils {
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
}
module.exports = Utils;