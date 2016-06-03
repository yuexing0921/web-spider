/**
 * Created by yuexing on 2016/06/03.
 * 爬虫的下载模块
 */
'use strict';
const path = require('path');
let JsonData = require('./common/jsonData');
class Downloader {
	constructor(setting) {
		//下载的各项配置
		this.setting = setting;
		this.urlInfo = this.setting.urlInfo;
		this.spiderCore = this.setting.spiderCore;
		this.cwdPath = path.resolve(__dirname);//设置执行的路径，为了防止路径过深，所以在Downloader就设置好
		if (!this.urlInfo.testPath) {
			//设置测试产生的结果的路径
			this.urlInfo.testPath = path.join(this.cwdPath, '../../test');
		}
	}
	start(){
		if(this.urlInfo.isDynamic){
			//如果是需要执行动态js的网站
			require('./downloader/dynamic')(this);
		}else{
			//这是静态请求
			require('./downloader/static')(this);
		}
	}
	//负责数据格式化以及发送
	sendData(err,data){
		let baseMsgCode = this.setting._config.baseMsgCode,
			spiderCore = this.spiderCore;
		let jsonData = new JsonData();
		if(err){
			jsonData.code = baseMsgCode.serverError;
			jsonData.msg = String(err);
		}
		jsonData.data = data || {};
		spiderCore.complete(jsonData);
	}
}
module.exports = Downloader;