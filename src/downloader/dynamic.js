/**
 * Created by yuexing on 2016/06/03.
 * 爬虫的动态下载模块
 * 这里用的phantomjs，具体参见http://phantomChild.org/api
 */
'use strict';
const util            = require('util');
const child_process   = require('child_process');
const path            = require('path');
const osType          = require('os').type();
/**
 * @param {object} _baseDownloader downloader对象
 * */
let dynamicDownloader = function (_baseDownloader) {

	let spiderCore    = _baseDownloader.spiderCore,
	    urlInfo     = spiderCore.spiderConf.urlInfo,
	    logger      = spiderCore.logger,
	    baseMsgCode = spiderCore._config.baseMsgCode,
	    cwdPath     = path.resolve(_baseDownloader.cwdPath, '../src/_lib');

	//兼容windows
	let cmd      = /Windows/.test(osType) ? 'phantomjs' : './phantomjs';
	//1. 初始化phantomjs 命令行
	let cmdLines = [cmd];

	//2. 添加静态phantomjs config.json文件
	let configJson = urlInfo.phantomConfig !== false && urlInfo.phantomConfig || path.resolve(cwdPath, 'phantom-config.json');
	cmdLines.push('--config=' + configJson);

	//3. 添加动态phantomjs 命令
	urlInfo.phantomLines && urlInfo.phantomLines.length > 0 && cmdLines.push(urlInfo.phantomLines.join(' '));
	//如果有代理的话，添加代理
	if(urlInfo.proxy){
		cmdLines.push('--proxy=' + urlInfo.proxy.host + ":" + urlInfo.proxy.port);
		cmdLines.push('--proxy-type='+ urlInfo.proxy.protocol);
		if(urlInfo.proxy.username){
			cmdLines.push('--proxy-auth=' + urlInfo.proxy.username + ":" + urlInfo.proxy.password);
		}
	}

	//4. 添加和phantomjs桥接js
	let phantomBridgeJs = urlInfo.phantomBridgeJs || 'phantom_spec.js';
	cmdLines.push(phantomBridgeJs);

	//5. 添加命令参数
	//为了防止url截断，所以对其encode，用spawn模式的话，可以不用encode
	urlInfo.url = encodeURIComponent(urlInfo.url);
	cmdLines.push(JSON.stringify(JSON.stringify(urlInfo)));//在exec模式下，会对其自动解析，所以需要双层stringify，如果是spawn，则只需要一层就够了

	//6. 执行phantomjs 命令
	logger.info(cmdLines.join(' '));
	let phantomChild = child_process.exec(
		cmdLines.join(' '),
		{cwd: cwdPath, stdio: 'pipe', maxBuffer: 2000 * 1024, timeout: urlInfo.timeout || 5000}
	);
	//let phantomChild = child_process.spawn(cmd, cmdLines,
	//	{cwd: cwdPath, stdio: 'pipe'}
	//);
	let killPhantomjs = function (err, data) {
		//负责销毁phantomjs和传递数据
		if (err) {
			_baseDownloader.sendData(err, data);
		}else{
			try {
				data = JSON.parse(data);
				if (baseMsgCode.success !== data.code) {
					data = data.msg;
				} else {
					data = data.data;
				}
				_baseDownloader.sendData(null, data);
			} catch (e) {
				_baseDownloader.sendData(e, data);
			}
		}
		phantomChild.kill();
	};


	phantomChild.on('error', function (err) {
		killPhantomjs('phantomChild error: ' + err);
	});

	let receivedData = '';
	//获取phantomjs的数据
	phantomChild.stdout.on('data', function (data) {
		//logger.info("phantomChild data");
		if(typeof data == "object"){
			data = data.toString();
		}
		//logger.info(data);
		data = data.trim();
		if (receivedData == '' && !data.startsWith('{')) {
			killPhantomjs('phantomChild: ' + data);
		} else {
			receivedData += data;
			//因为从phantomjs获取的数据是分段传输，所以需要判断是否传输完成。
			if (data.endsWith('}#phantomjs-data-end#')) {
				var emit_string = receivedData.replace("#phantomjs-data-end#", '');
				receivedData    = '';
				phantomChild.emit('receivedData', emit_string);
			}
		}
	});
	//经过完整加工的phantomjs的数据
	phantomChild.on('receivedData', function (data) {
		try {
			killPhantomjs(null, data);//data.toString('utf8')
		} catch (e) {
			killPhantomjs(util.format('Page content parse error: %s', e));
			return;
		}
	});
	//错误提示
	phantomChild.stderr.on('data', function (data) {
		killPhantomjs('phantomChild stderr: ' + data.toString('utf8'));
	});

	phantomChild.on('exit', function (code) {
		if (code != 0)logger.error('child process exited with code ' + code);
	});

	phantomChild.on('close', function (signal) {
		if (signal != 0)logger.error('child process closed with signal ' + signal);
	});
};
module.exports        = dynamicDownloader;