# web-sipder
这是一个用superagent + phantomjs 写的一个小爬虫，尽量简单，代码几乎都是用ES6语法写的，简单直白。


* 主体核心是core.js这个文件，这是一个继承自EventEmitter的类。

Prerequisites
-------------

- `node`: This requires Node 6.x or greater.

Getting started
---------------
##### 最简单的一个爬虫
```
//爬虫参数初始化
let urlInfo = {url:"https://cnodejs.org"};
let spider = new (require('web-spider'))({urlInfo:urlInfo});
//启动爬虫
spider.start();
//成功返回
spider.on('success',(data) =>{
	console.log(data);
});
//失败返回
spider.on('error',(err) =>{
	console.error(err);
});

```


Other examples
-------------
例子可以参见examples文件夹的

参数例子
----
创建一个爬虫需要定义 urlInfo
##### `1.urlInfo` : {object}，它有以下属性：
- **必须** `url             : {string}` 需要抓取的地址。
- **选填** `isDynamic       : {boolean}` 默认false，true设置是用phantomjs请求url
- **选填** `phantomConfig   : {string}`  phantomjs执行的【静态】命令config.json文件路径，可以不用配置，默认有一个，如果配置的false，那么默认的也不用
- **选填** `phantomLines    : {array}`  phantomjs执行的【动态】命令，比如proxy呀，cookie文件呀，默认不用设置 //具体配置参见http://phantomjs.org/api/command-line.html
- **选填** `phantomBridgeJs : {string}` 和phantomjs桥接js，可以自己再写一个，默认有一个，如果要自定义，可以参照[_lib/phantom-spec.js]。
- **选填** `isGenerateImg   : {boolean}` 设置是否生成图片和html，[true] ：生成的图片会以 [域名 + 时间]组合
- **选填** `generatePath    : {string}` 生成图片存放在哪里，默认：会放置在examples里面
- **选填** `tiemout         : {number}` 执行的超时时间，默认：10000毫秒 即10秒

##### `2.logger` : {object} 设置爬虫的日志记录
现在接受log4js的日志传入，

##### `3.logLevel` : {string} 设置爬虫的日志级别,默认是'INFO'
和log4js的日志级别是一样,共6个级别FATAL>ERROR>WARN>INFO>DEBUG>TRACE# web-sipder
这是一个用superagent + phantomjs 写的一个小爬虫，尽量简单，代码几乎都是用ES6语法写的，简单直白。


* 主体核心是core.js这个文件，这是一个继承自EventEmitter的类。

Prerequisites
-------------

- `node`: This requires Node 6.x or greater.

Getting started
---------------
##### 1.直接抓取 （最简单方式）
```
//爬虫参数初始化
let urlInfo = {url:"https://cnodejs.org"};
let spider = new (require('web-spider'))({urlInfo:urlInfo});
//启动爬虫
spider.start();
//成功返回
spider.on('success',(data) =>{
	console.log(data);
});
//失败返回
spider.on('error',(err) =>{
	console.error(err);
});

```
##### 2.动态执行目标网站的js，并且生成图片 

``` javascript
const path = require('path');
let urlInfo = {
	url             : 'http://www.jd.com',
	isDynamic       : true,//设置是否用phantomjs请求url，有的元素是js之后完之后才会出现
	phantomConfig   : path.resolve(__dirname,'phantom-config.json'),//phantomjs执行的【静态】命令config.json文件路径，可以不用配置，默认有一个，如果配置的false，那么默认的也不用
	isGenerateImg   : true, //设置是否生成图片和html，[true] ：生成的图片会以 [域名 + 时间]组合
	//generatePath    : ,//生成图片存放在哪里,这里设置成执行node的路径，就是examples，默认：会放置在执行的根目录下
	timeout: 30*1000//执行的超时时间，默认：10秒
};
let spider = new (require('web-spider'))({urlInfo:urlInfo});
spider.start();
spider.on('success',(data) =>{
	try{
		let $ = cheerio.load(data.data.content);
		console.log($('title').text());
	}catch(e){
		console.error(e);
	}
});
spider.on('error',(err) =>{
	console.error(err);
});
```
phantom-config.json
```
{
	"diskCache":"true",
	"outputEncoding" : "utf8",
	"ignoreSslErrors" : "true",
	"localToRemoteUrlAccess" : "true"
}
```

*需要更细的例子可以从examples文件夹获取，或者联系我*


Other examples
-------------
例子可以参见examples文件夹的

参数例子
----
创建一个爬虫需要定义 urlInfo
##### `1.urlInfo` : {object}，它有以下属性：
- **必须** `url             : {string}` 需要抓取的地址。
- **选填** `isDynamic       : {boolean}` 默认false，true设置是用phantomjs请求url
- **选填** `phantomConfig   : {string}`  phantomjs执行的【静态】命令config.json文件路径，可以不用配置，默认有一个，如果配置的false，那么默认的也不用
- **选填** `phantomLines    : {array}`  phantomjs执行的【动态】命令，比如proxy呀，cookie文件呀，默认不用设置 //具体配置参见http://phantomjs.org/api/command-line.html
- **选填** `phantomBridgeJs : {string}` 和phantomjs桥接js，可以自己再写一个，默认有一个，如果要自定义，可以参照[_lib/phantom-spec.js]。
- **选填** `isGenerateImg   : {boolean}` 设置是否生成图片和html，[true] ：生成的图片会以 [域名 + 时间]组合
- **选填** `generatePath    : {string}` 生成图片存放在哪里，默认：会放置在examples里面
- **选填** `tiemout         : {number}` 执行的超时时间，默认：10000毫秒 即10秒

##### `2.logger` : {object} 设置爬虫的日志记录
现在接受log4js的日志传入，

##### `3.logLevel` : {string} 设置爬虫的日志级别,默认是'INFO'
和log4js的日志级别是一样,共6个级别FATAL>ERROR>WARN>INFO>DEBUG>TRACE


## License

MIT © [yuexing0921](https://yuexing0921.github.io)