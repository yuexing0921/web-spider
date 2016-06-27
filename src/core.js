/**
 * Created by yuexing on 2016/06/03.
 * 这是爬虫的核心类
 */
'use strict';
const EventEmitter = require('events'),
      util         = require('util'),
      path         = require('path');
const urlUtil       = require('./common/urlUtil');
let cache         = require('./cache');
let logger        = require('./common/logger');
/**
 * SpiderCore的构成
 * 0.{object} spiderConf，这是一个爬虫实例的启动参数
 * 1.{object} logger这是爬虫自身的日志输出系统，和log4js一样有六级，默认是INFO级别
 * 2.{object} _config这是爬虫自身的一些配置，这个不需要设置
 * */
class SpiderCore extends EventEmitter {
	/**
	 * @param {object} spiderConf爬虫的各项启动参数
	 * * */
	constructor(spiderConf) {
		super();

		this._config = require('./config');//爬虫自身的配置
		if (spiderConf.logLevel) {//设置日志级别
			logger.setLevel(spiderConf.logLevel);
		}
		this.logger = logger;//为了能更好的控制日志输出，用了一个中间变量做输出，不排除以后用log4js作为日志处理
		this.runDir = path.dirname(require.main.filename);//设置执行爬虫的根目录
		this._simpleCache = new cache.SimpleCache();//用于缓存抓取的url
		this._urlListCache =  new cache.SimpleCache();//用于缓存url
		this.spiderConf = spiderConf;//启动一个爬虫实例需要的配置
		this.spiderConf.urlInfo.url = encodeURI(this.spiderConf.urlInfo.url);
	}

	start() {
		checkspiderConf(this.spiderConf);//检查spiderConf设置是否合法
		var url = this.spiderConf.urlInfo.url;
		var cache = this._simpleCache.get(url);
		logger.info(this.spiderConf.urlInfo.url + " Spider start ...");
		if(cache){
			complete(cache.value);
		}else{
			new (require('./downloader'))(this).start();
		}
	}

	//网页下载完成
	complete(data) {
		try {
			let baseMsgCode = this._config.baseMsgCode;
			if (data.code == baseMsgCode.success) {

				this.emit('success', data);
			} else {
				this.emit('error', data);
			}
		} catch (e) {
			logger.error(e);
			this.emit('error', e);
			return false;
		}
		logger.info("Spider end ...");
	}
}
let checkspiderConf = function(spiderConf){
	if (!spiderConf.urlInfo) {
		throw new Error("urlInfo不能为空");
	}
	if(!urlUtil.isLegitimate(spiderConf.urlInfo.url)){
		throw new Error("urlInfo.url设置的不合法");
	}
};
module.exports = SpiderCore;