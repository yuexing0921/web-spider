/**
 * Created by yuexing on 2016/06/03.
 * 这是爬虫的核心类
 */
'use strict';
const EventEmitter = require('events');
const util = require('util');
const path = require('path');
let logger = require('./common/logger');
class SpiderCore extends EventEmitter {
	constructor(setting){
		super();
		this.spiderCore = this;
		this.setting = setting;
		this.setting._config = require('./config');
		setting.spiderCore = this.spiderCore;
		if(setting.logLevel){
			logger.setLevel(setting.logLevel);
		}
		setting.logger = logger;
		this.downloader = new (require('./downloader'))(setting);
	}
	start(){
		logger.info(this.setting.urlInfo.url + " Spider start ...");
		this.downloader.start();
	}
	//网页下载完成
	complete(data){
		try{
			let baseMsgCode = this.setting._config.baseMsgCode;
			if(data.code == baseMsgCode.success){
				this.spiderCore.emit('success',data);
			}else{
				this.spiderCore.emit('error',data);
			}
		}catch(e){
			logger.error(e);
			this.spiderCore.emit('error',e);
			return false;
		}
		logger.info("Spider end ...");
	}
}
module.exports = SpiderCore;