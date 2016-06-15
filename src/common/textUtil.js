/**
 * Created by yuexing on 2016/6/15.
 * text文本处理共通类
 */
class textUtil {
	/**
	 * 通过jq选择器，返回相应的值
	 * @param {object} $ jquery对象或者类似对象
	 * @param {object} conf
	 *              1.$str jquery选择器
	 *              2.attr 属性选择器
	 * */
	static getTextByJq($, conf) {
		if (!$ && !conf) {
			new Error("$和conf不能为空");
		}
		var $str = "";
		if (!conf.$str) {
			$str = conf;
		}
		var $el = $($str), info = "";
		if ($el.length) {
			if (conf.attr) {
				info = $el.attr(conf.attr);
			} else {
				info = $el.text() || $el.val();
			}
		}
		return $.trim(info.replace(/\s+/g, ' '));
	}

}
module.exports = textUtil;