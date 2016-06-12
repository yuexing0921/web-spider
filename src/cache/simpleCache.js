/**
 * Created by yuexing on 2016/6/5.
 * 这是一个以map作为对象的缓存方案，
 * 只能支持单个节点的缓存方案
 * 特点是：速度快，不需要安装额外的数据库
 * 弱点：如果爬虫要进行分布式抓取那就无法进行了
 *
 * <p>
 *  因为map的特性，自动带有，计数，删除，清空，并且可以很好的解决管理timeoutCallback，不需要再额外的代码处理
 *  所以选择了map作为缓存方案
 * </p>
 *
 */
let cache = new Map(null),
	temp = Object.create(null);
	debug = false,
	hitCount = 0,
	missCount = 0;

class SimpleCache{
	/**
	 * 添加更新缓存
	 * 1.先判断是否在map内，如果在,清除原来的timeoutCallback
	 *
	 * @param {string} key
	 * @param {object} value
	 * @param {number} timeout 默认永不超时
	 * @param {function} timeoutCallback
	 * @return {boolean} true添加成功，false添加失败
	 * **/
	static put(key, value, timeout, timeoutCallback){
		temp = {
			value : value,
			timeout : timeout || 0,
			timeoutCallback : timeoutCallback
		};


		if(cache.has(key)){

		}
		cache.set(key,temp);
	}


	/**
	 * 删除单个缓存
	 *
	 * @param {string} key
	 * @return {boolean} true添加成功，false添加失败
	 * **/
	static delete(key){
		return cache.delete(key);
	}

	static clear(){
		return cache.clear();
	}

	static keys(){
		return cache.keys();
	}

}
SimpleCache.length = cache.size;
exports = module.exports = SimpleCache;
