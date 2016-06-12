/**
 * Created by yuexing on 2016/06/03.
 * 这是爬虫的核心类
 */
'use strict';
const EventEmitter = require('events'),
      util         = require('util'),
      path         = require('path');
let logger         = require('./common/logger');
/**
 * SpiderCore的构成
 * 0.{object} setting，这是一个爬虫实例的启动参数
 * 1.{object} logger这是爬虫自身的日志输出系统，和log4js一样有六级，默认是INFO级别
 * 2.{object} _config这是爬虫自身的一些配置，这个不需要设置
 * */
class SpiderCore extends EventEmitter {
	/**
	 * @param {object} setting爬虫的各项启动参数
	 * * */
	constructor(setting) {
		super();

		this._config = require('./config');//爬虫自身的配置
		if (setting.logLevel) {//设置日志级别
			logger.setLevel(setting.logLevel);
		}
		this.logger = logger;//为了能更好的控制日志输出，用了一个中间变量做输出，不排除以后用log4js作为日志处理
		this.runDir = path.dirname(require.main.filename);//设置执行爬虫的根目录

		this.setting = setting;//启动一个爬虫实例需要的配置

		this.downloader = new (require('./downloader'))(this);
	}

	start() {
		logger.info(this.setting.urlInfo.url + " Spider start ...");
		this.downloader.start();
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
module.exports = SpiderCore;