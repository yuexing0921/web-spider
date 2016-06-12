/**
 * Created by yuexing on 2016/06/03.
 * 定义各类传参的基本类型
 */
'use strict';
class JsonData {
	constructor(code, msg, data) {
		this.code = code || 2000;
		this.msg  = msg  || "";
		this.data = data || {};
	}

	toString() {
		return JSON.stringify(this);
	}
}
//exports = JsonData;
module.exports = JsonData;