'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (url) {
	var result = {};
	result.getSegment = function (index) {
		var pathname = _url2.default.toInfo(url).pathname;
		if (index >= pathname.length || index < 0) return null;
		return pathname[index];
	};
	result.getQueryArgv = function (name) {
		var search = _url2.default.toInfo(url).search;
		if (search[name]) return search[name];else return null;
	}, result.getHashArgv = function (name) {
		var hash = _url2.default.toInfo(url).hash;
		if (hash[name]) return hash[name];else return null;
	};
	return result;
};

var _url = require('../../encoding/url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }