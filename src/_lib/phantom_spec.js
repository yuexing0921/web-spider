/**
 * Created by yuexing on 2016/06/03.
 * API具体参照 http://phantomjs.org/api/
 * 这是一个node和phantomjs的连接器
 * <p>
 * 把 isNode设置成false,可以单独测试这个js文件.
 * 例如: phantomjs --load-images=true loadspeed.js http://www.163.com
 * </p>
 */
'use strict';
//默认值[true] 代表的是用node启动，false代表就是用纯命令启动
var isNode = true;

var page                    = require('webpage').create(),
    system                  = require('system'),
    urlInfo, url, startTime = Date.now();
//定义phantomjs是否执行成功的基本code
var MsgCode                 = {
	SUCCESS           : 2000,
	FAIL              : 50000000,
	NAVIGATE_EXCEPTION: 40000000
};
//定义和node传送数据的基本格式
var JsonData                = function (code, msg, data) {
	this.code = code || MsgCode.SUCCESS;
	this.msg  = msg || "";
	this.data = data || {};
};
(function (logic) {
	//初始化page
	var initPage = function () {
		page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36';
		page.viewportSize       = {width: 1280, height: 980};
		if (system.args.length === 1) {
			logic.sendToNode(new JsonData(MsgCode.NAVIGATE_EXCEPTION, 'Usage: phantom_spec.js <some URL>', {}));
			phantom.exit();
		}
		page.viewportSize = {width: 1280, height: 980};
		try {
			//console.log(system.args[1]);
			urlInfo                       = JSON.parse(system.args[1]);
			url                           = decodeURIComponent(urlInfo.url);
			page.settings.resourceTimeout = urlInfo.timeout;
		} catch (e) {
			console.log(system.args);
			if (isNode) {
				logic.sendToNode(new JsonData(MsgCode.NAVIGATE_EXCEPTION, 'js parse MsgCode.FAIL', {errData: e}));
				phantom.exit();
			} else {
				//以下处理是非node命令执行phantomjs,
				urlInfo = {isTest: true, isLoadFinish: false, isLoadTime: 3000};
				url     = system.args[1];
				console.log(url);
			}
		}
	};
	//初始化page的事件
	//更多事件参见http://phantomjs.org/api/webpage/
	var pageEvent = function () {
		//以下是页面的加载事件（其实都是event）
		/***
		 * 页面初始化之前就会调用
		 * */
		page.onInitialized = function () {

		};
		/***
		 * 页面加载开始
		 * */
		page.onLoadStarted = function () {

		};
		//以下是页面的event事件
		/***
		 * 当前页面的URL发生变化时候
		 * @param {string} targetUrl 最新的url
		 * */
		page.onUrlChanged = function (targetUrl) {

		};
		/***
		 * 当前页面的导航事件 TODO 暂时不是很清楚
		 * @param {string} url 导航的URl
		 * @param {string} type ['Undefined', 'LinkClicked', 'FormSubmitted', 'BackOrForward', 'Reload', 'FormResubmitted', 'Other']
		 * @param {boolean} willNavigate [true]代表导航发生，[false]代表会锁定
		 * @param {boolean} main [true]代表事件产生者是当前frame，[false]代表是子frame
		 * */
		page.onNavigationRequested = function (url, type, willNavigate, main) {
			//page.customHeaders = {
			//	"client_pid": pid,
			//	"page": url
			//};
		};
		/***
		 * 发出请求资源的请求
		 * 这里可以用来拦截一些不必要的资源请求，比如一些日志请求
		 * @param {object} requestData
		 * */
		page.onResourceRequested = function (requestData, networkRequest) {
			//console.log('requested: ' + JSON.stringify(requestData, undefined, 4));
			//requestData包含以下信息
			//[id]
			//[method] http method
			//[url]
			//[time] 日期对象包含请求的日期
			//[headers] 请求头信息
			//networkRequest 这是网络请求对象本身，包含以下信息
			//[abort()] 中止当前的网络请求。中止当前的网络请求，会引发onResourceError回调。
			//[changeUrl(newUrl)] 改变当前网址的网络请求。通过调用networkRequest.changeUrl（newUrl），可以通过变更请求的URL。
			//[setHeader(key, value)]
		};
		/***
		 * 已经获取到资源时
		 * @param {object} res
		 * */
		page.onResourceReceived = function (res) {
			//console.log('received: ' + JSON.stringify(res, undefined, 4));
			//res包含以下信息 基本同onResourceRequested
			//id : the number of the requested resource
			//url : the URL of the requested resource
			//time : Date object containing the date of the response
			//headers : list of http headers
			//bodySize : size of the received content decompressed (entire content or chunk content)
			//contentType : the content type if specified
			//redirectURL : if there is a redirection, the redirected URL
			//stage : “start”, “end” (FIXME: other value for intermediate chunk?)
			//status : http status code. ex: 200
			//statusText : http status text. ex: OK
		};
		/***
		 * 当页面请求资源获取失败时
		 * @param {object} req
		 * */
		page.onResourceError = function (err) {
			if (err.url === page.url) {
				logic.sendToNode(new JsonData(MsgCode.FAIL, 'Unable to load resourc',
					{
						"url"        : err.url,
						"errorCode"  : err.errorCode,
						"description": err.errorString
					}));
			}
		};
		/***
		 * 当页面请求资源获取超时
		 * @param {object} err
		 * */
		page.onResourceTimeout = function (err) {
			logic.sendToNode(new JsonData(MsgCode.FAIL, 'Network timeout on resource',
				{
					"url"        : err.url,
					"errorCode"  : err.errorCode,
					"description": err.errorString
				}));
			phantom.exit(1);
		};
	};
	//开始执行
	(function () {
		initPage();
		pageEvent();
		//打开页面
		page.open(url, function (status) {
			logic.main(status);
		});
	}());
}({
	//和请求的phantom程序通信
	sendToNode    : function (jsonData) {
		jsonData.data.urlInfo = urlInfo;
		// 通过writeLine会有数据传输大小限制
		//末尾加上#phantomjs-data-end#是用来告诉node，传输的data已经传输完成。
		system.stdout.writeLine(JSON.stringify(jsonData) + '#phantomjs-data-end#');
	},
	//数据处理
	main          : function (status) {
		var result = {
			url       : page.url,//抓取的地址
			startTime : startTime,//开始时间
			endTime   : Date.now(),//结束时间
			statusCode: page.status,//状态code
			header    : page.settings.userAgent  || "",//抓取这个页面的header信息
			cookies   : page.cookies,
			content   : page.content//抓取到的html结构
		};
		this.nodeData(status, result)
	},
	nodeData      : function (status, result) {
		if (status == 'success') {
			this.testRecordData();
			this.sendToNode(new JsonData(null, null, result));
		} else {
			this.sendToNode(new JsonData(MsgCode.FAIL, 'Open page failed', {errData: url}));
		}
		phantom.exit();
	},
	//测试模式下记录html和生成的图片
	testRecordData: function () {
		if (urlInfo.isGenerateImg) {
			var fs        = require('fs');
			//如果没有指定路径，默认是当前目录_lib;
			var test_path = urlInfo.generatePath;
			//quality清晰度，用1就够了，用100的话，生成的一张图片有几十M了
			var name      = '\\' + this.getDomain(page.url) + new Date()._getDate();
			//console.log(name);
			page.render(test_path + name + '.png', {format: 'PNG', quality: '1'});
			fs.write(test_path + name + '.html', page.content, 'w');
		}
	},
	getDomain     : function (url) {
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
}));
Date.prototype._getDate   = function (d) {
	d = d || new Date();
	return [
		d.getFullYear(),
		(d.getMonth() + 1)._padLeft(),
		(d.getDate())._padLeft(),
		(d.getHours())._padLeft(),
		(d.getMinutes())._padLeft(),
		(d.getSeconds())._padLeft()].join('');
};
Number.prototype._padLeft = function (base, chr) {
	var len = (String(base || 10).length - String(this).length) + 1;
	return len > 0 ? new Array(len).join(chr || '0') + this : this;
};



