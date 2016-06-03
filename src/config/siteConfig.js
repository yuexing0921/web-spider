/**
 * Created by yuexing on 2016/5/7.
 * 各个网站的请求头
 * @author : yuexing(yuexing0921@gmail.com)
 * @since  : 2016/5/7.
 * @version: 1.0.0
 */
var config = {
	amazon : {
		Accept : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		'Accept-Encoding' : 'gzip, deflate, sdch',
		'Accept-Language': 'zh-CN,zh;q=0.8',
		'Cache-Control':'no-cache',
		'Cookie':"p90x=AS; p90x-info=A; x-wl-uid=1rYADwlN32Q61I5dRp+lx7C1CSK90aP3C95Zt/UPWmv9CkDWCuyh++HenuyEsWzbPYJC/4r/XvD4=; s_vnum=1892524024236%26vn%3D1; session-token=GZjY0nRy6b160JGEJYBgkE3ibyWGEuG1MYvlR7HHnE6gRyOmVRU4zfZW9WS45P00aX0zY4o0ASqe2nJf6+Ce579nT+LwERrnoXs01MvZJeYZKxeh5ZElrBwZ4tpkxA+nqMupLRMckih/K9RzIGo7OmFaqia1Pz1nBZuV5V/EVekldRQVOOQ+KksfqNSfjmgdxzg6WdpV0+FuXQSh6CD+jaOA0nFDei6QeJpqw6lcQSCz0FI2P24flVJHe8Igdqk0; Hm_lvt_39dcd5bd05965dcfa70b1d2457c6dcae=1461554628,1461649454,1462242580,1462344924; s_vn=1494122706518%26vn%3D1; s_fid=76B3CAFAE39BDB17-2D69C619775169B3; s_dslv=1462586709597; s_nr=1462586709605-Repeat; regStatus=pre-register; mstmode=manual; skin=noskin; csm-hit=s-0HMKMTNBYRG72C8TMA9M|1462795278841; session-id-time=2082787201l; session-id=183-2516848-7963330; ubid-main=182-3718833-4002332",
		'Pragma':'no-cache',
		'Upgrade-Insecure-Requests':1,
		'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"
	},
	"6pm" : {
		Accept : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		'Accept-Encoding' : 'gzip, deflate, sdch',
		'Accept-Language': 'zh-CN,zh;q=0.8',
		'Cache-Control':'no-cache',
		Connection:'keep-alive',
		Cookie  : 'deviceType=desktop; pixelServer={"isKilled":false,"iframeHost":"d169bbxks24g2u.cloudfront.net","iframePathname":"6pm.html","session":{"tid":"gpaRwR68oGVUgLb7ptlg6ARIWwW9oQg5","isVip":null}}; ubid-main=183-7714856-3078834; noMobileSix=true; geo=CN/23/_/Shanghai; Hm_lvt_39dcd5bd05965dcfa70b1d2457c6dcae=1463634248,1463639845,1463656464,1463707661; session-id=190-1889554-6887444; session-id-time=2082787201l; session-token=tDGv5c2tDdDnnuD2sVLhlcSl4gDzg9/q5F8VHWHQlQds8+Mzb8PpseRWoZXu1JHY0iJlybeKbtvDEOmcDBZ1TyodN1asw/eWwLbjNkqpS50+/ZdYjfWl5YZnuncZG4ykXhi50fusYa7D2y1UbivAi+BRWvmPkX9kqMBNBKRYmvT5RrFx3CffmGYqd8LUFdmT; _ga=GA1.2.1894560406.1460340659; __utmt_pageTrackerPriTr=1; zfc=ChgIxqfYmMAqEIqh6fP0ngIYtenB3IWQzAISDAoEc3RkbBABGAIgARIMCgQ2cmRtEAEYAyABEgwKBHRsc2MQARgFIAESCwoDYWFuEAEYBiABEgwKBDZyZWMQARgDIAESCwoDcHJmEAAYASABEgsKAzZzYhABGAEgARIMCgQ2c3B1EAAYBiABEgsKAzZydhAAGAEgARINCgU2c3B1bRAAGAEgAQ==; tid=gpaRwR68oGVUgLb7ptlg6ARIWwW9oQg5; qid=1463972897827; __utma=1.1894560406.1460340659.1463731312.1463969369.64; __utmb=1.86.9.1463972900074; __utmc=1; __utmz=1.1461585981.28.4.utmcsr=6pm.com|utmccn=(referral)|utmcmd=referral|utmcct=/women-shoes/CK_XAcABAeICAzABGIIDA8aiAQ.zso',
		Host :'www.6pm.com',
		Pragma :'no-cache',
		'Upgrade-Insecure-Requests': '1',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
	}
};
module.exports = config;