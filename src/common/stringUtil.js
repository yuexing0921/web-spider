/**
 *
 * 这里面的都是网络上面收集过来的一些常用的字符串操作
 * 如果有侵权行为，请尽快联系我
 * @mail yuexing0921@gmail.com
 */
class StringUtil {
	/**
	 * 来源 http://es6.ruanyifeng.com/#docs/set-map
	 * Map转为对象
	 * 如果所有Map的键都是字符串，它可以转为对象。
	 * */
	static mapToObj(strMap){
		let obj = Object.create(null);
		for (let [k,v] of strMap) {
			obj[k] = v;
		}
		return obj;
	}

	/**
	 * 来源 http://es6.ruanyifeng.com/#docs/set-map
	 * 对象转为Map
	 * */
	static objToStrMap(obj) {
		let strMap = new Map();
		for (let k of Object.keys(obj)) {
			strMap.set(k, obj[k]);
		}
		return strMap;
	}
	/**
	 * 来源 http://es6.ruanyifeng.com/#docs/set-map
	 * Map转为JSON
	 * */
	static mapToJson(map) {
		return JSON.stringify(util.mapToObj(map));
	}
	/**
	 * 来源 http://es6.ruanyifeng.com/#docs/set-map
	 * Map的键名有非字符串
	 * Map转为数组JSON。
	 * */
	static mapToArrayJson(map) {
		return JSON.stringify([...map]);
	}
	/**
	 * 来源 http://es6.ruanyifeng.com/#docs/set-map
	 * JSON字符串转为Map
	 * */
	static jsonStrToMap(jsonStr) {
		return util.objToStrMap(JSON.parse(jsonStr));
	}
	/**
	 * 来源 http://es6.ruanyifeng.com/#docs/set-map
	 * 整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组
	 *  JSON转为Map
	 * */
	static jsonToMap(jsonStr) {
		return new Map(JSON.parse(jsonStr));
	}
}
let util = StringUtil;
module.exports = util;