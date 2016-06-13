/**
 * Created by yuexing on 2016/6/13.
 * 利用cheerio类似jquery链接分析特性，进行cheerio定制
 */
class CheerioSpiderBase  {
	constructor(){
		if (new.target === CheerioSpiderBase) {
			throw new Error('CheerioSpiderBase类不能实例化,必须显示的继承才可以');
		}
	}
	_initCheerio(_$){
		this.$ = _$;
	}
	_query(content){

	}
}
exports = module.exports = CheerioSpiderBase;