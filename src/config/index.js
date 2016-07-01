/**
 * Created by yuexing
 */
module.exports = {
	debug      : true,
	baseMsgCode: {//各种消息提示基础值
		success    : 2000,
		serverError: 50000000,
		clientError: 40000000,
		otherError : 30000000
	},
	netError :{
		'ECONNRESET' : {
			statusCode : 50001001,
			msg : "网络错误，无法连接"
		},
		'ENOTFOUND':{
			statusCode : 50001002,
			msg : "没有找到相应的文件"
		},
		'EPROTO':{
			statusCode : 50001003,
			msg : "ssl错误"
		},
		'ETIMEDOUT':{
			statusCode : 50001004,
			msg : "连接超时了"
		},
		'Forbidden':{
			statusCode : 50001005,
			msg : "客户端连接错误"
		}
	}
};