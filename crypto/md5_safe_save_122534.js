'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (input) {
	console.log(Md5);
	return Md5.md5(input, null);
};

var Md5 = require('blueimp-md5');