/**
 * Created by yuexing on 2016/06/03.
 * 爬虫的下载模块
 */
'use strict';
const path   = require('path');
let JsonData = require('./common/jsonData');
class Downloader {
	constructor(_spiderCore) {
		this.spiderCore = _spiderCore;

		this.cwdPath    = path.resolve(__dirname);//设置执行的路径，为了防止路径过深，所以在Downloader就设置好

		if (!this.spiderCore.setting.urlInfo.generatePath) {
			//设置测试产生的结果的路径
			this.spiderCore.setting.urlInfo.generatePath = this.spiderCore.runDir;
		}
	}

	start() {
		if (this.spiderCore.setting.urlInfo.isDynamic) {
			//如果是需要执行动态js的网站
			require('./downloader/dynamic')(this);
		} else {
			//这是静态请求
			require('./downloader/static')(this);
		}
	}

	//负责数据格式化以及发送
	sendData(err, data) {
		let baseMsgCode = this.spiderCore._config.baseMsgCode;
		let jsonData    = new JsonData();
		if (err) {
			jsonData.code = baseMsgCode.serverError;
			jsonData.msg  = String(err);
		}
		jsonData.data = data || {};
		this.spiderCore.complete(jsonData);
	}
}
module.exports = Downloader;