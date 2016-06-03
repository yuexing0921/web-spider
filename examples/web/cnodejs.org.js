/**
 * Created by yuexing on 2016/6/3.
 */
let $ = '';
let init = function(_$){
	$ = _$;
};
let getTabList = function(){
	let list = [],obj = {},
		$el = $('#content .header a');
	$el.each(function(){
		let $this = $(this);
		obj = {
			title : $this.text(),
			url   : convertUrl($this.attr("href"))
		};
		list.push(obj);
	});
	return list;
};
let getTopicList = function(){
	let list = [],obj = {},
		$el = $('#topic_list .cell');
	$el.each(function(){
		let $this = $(this);
		obj = {
			authorName  : $this.find('.user_avatar img').attr('title'),//作者名字
			authorUrl   : convertUrl($this.find('.user_avatar').attr('href')),//作者地址
			replies     : _trim($this.find('.reply_count .count_of_replies').text()),//回复数
			visits      : _trim($this.find('.reply_count .count_of_visits').text()),//点击数
			topicTitle  : _trim($this.find('.topic_title_wrapper .topic_title').text()),//帖子的标题
			topicURL    : convertUrl($this.find('.topic_title_wrapper .topic_title').attr('href'))//帖子的URL
		};
		list.push(obj);
	});
	return list;
};
function convertUrl(url){
	return url.indexOf("http:")  <= -1 ? "https://cnodejs.org" + url : url;
}
function _trim(str){
	return str.replace(/\s+/g,' ');
}
let Web = {
	run : function(_$){
		init(_$);
	},
	getList : function() {
		return {
			tabList : getTabList(),
			topicList : getTopicList()
		};
	}
};
module.exports = Web;
