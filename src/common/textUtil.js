/**
 * Created by yuexing on 2016/6/15.
 * text文本处理共通类
 */
class TextUtil {
	/**
	 * 通过jq选择器，返回相应的值
	 * @param {object} $ jquery对象或者类似对象
	 * @param {object} conf
	 *              1.$str jquery选择器
	 *              2.attr 属性选择器
	 *              3.$filter 过滤器
	 *              4.$not 过滤器
	 * */
	static getTextByJq($, conf) {
		if (!$ && !conf) {
			new Error("$和conf不能为空");
		}
		var $str = "";
		if(!conf.$str){
			$str = conf;
		}else{
			$str = conf.$str;
		}
		var $el = $($str), info = "";
		if ($el.length) {
			if(conf.$filter){
				$el = $el.filter(conf.$filter);
			}
			if(conf.$not){
				$el = $el.not(conf.$not);
			}
			if(conf.method){
				if(conf.$methodStr){
					$el = $el[conf.method](conf.$methodStr);
				}else{
					$el = $el[conf.method]();
				}
			}
			if(conf.attr){
				info = $el.attr(conf.attr);
			}else{
				info = $el.text() || $el.val();
			}
		}
		if(!info){
			return "";
		}
		return $.trim(info.replace(/\s+/g, ' '));
	}

}
module.exports = TextUtil;