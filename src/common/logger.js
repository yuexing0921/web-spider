/**
 * Created by yuexing on 2016/6/5.
 * 这是仿照log4js做的一个简单的日志系统，方便调试
 */
let Levels = {
	TRACE : 0,
	DEBUG : 1,
	INFO  : 2,
	WARN  : 3,
	ERROR : 4,
	FATAL : 5
};
let level = Levels.INFO;
class logger {
	static _log(type,_level,_arguments){
		if(_level && _level < level){
			return;
		}
		var args = Array.prototype.slice.call(_arguments);
		if (args.length > 1) {
			var i = 1, hasstyle = false;
			if (args[0].indexOf("%c") == 0) {
				args[0] = args[0].replace(/%c/, "");
				i = 2;
				hasstyle = true;
			}
			for (; i < args.length; i++) {
				if (/%s|%d|%i|%o|%j/.test(args[0])) {
					args[0] = args[0].replace(/%s|%d|%i|%o|%j/, args[i]);
				}
				else {
					break;
				}
			}
			if (i < args.length) {
				args[0] = args[0] + " " + args.slice(i).join(" ");
			}
			if (hasstyle) {
				console[type](args[0], args[1]);
			}
			else {
				console[type](args[0]);
			}
		}
		else if (args.length == 1) {
			if (_arguments[0] instanceof Array) {
				console[type]("[" + args[0] + "]");
			}
			else if (_arguments[0] instanceof Function) {
				console[type](args[0], null, "console_log_function");
			}
			else {
				console[type](args[0]);
			}
		}
		else {
			console[type]("");
		}
	}
	static trace() {
		this._log("log",Levels.TRACE,arguments);
	}

	static debug() {
		this._log("log",Levels.DEBUG,arguments);
	}

	static info() {
		this._log("info",Levels.INFO,arguments);
	}

	static warn() {
		this._log("warn",Levels.WARN,arguments);
	}

	static error() {
		this._log("error",Levels.ERROR,arguments);
	}

	static fatal() {
		this._log("error",arguments);
	}

	static setLevel(type){
		if(!type || typeof type !== 'string'){
			return ;
		}
		let l = Levels[type];
		if(level){
			level = l;
		}
	}
}
logger.Levels = Levels;
exports = module.exports = logger;
