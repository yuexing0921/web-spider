module.exports = {
	"env" : {
		"browser"  : true,
		"commonjs" : true,
		"es6"      : true,
		"node"     : true
	},
	"extends": "eslint:recommended",
	"installedESLint": true,
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"globals": {
		"window"                  : true,
		"ActiveXObject"           : true,
		"jQuery"                  : true,
		"$"                       : true,
		"require"                 : true,
		"define"                  : true,
		"fetchJsonp"              : true,
		"EJS"                     : true,
		"md5"                     : true,
		"__non_webpack_require__" : true,
		"Cookies"                 : true
	},
	"rules": {
		"no-console"      : [ "off" ],
		"indent"          : [ "warn", "tab", {"SwitchCase": 1, "VariableDeclarator":1} ],
		"linebreak-style" : [ "warn" ],
		"no-unused-vars"  : [ "warn" ],
		"semi"            : [ "warn", "always" ]
	}
};
