'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _url = require('../../encoding/url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = (function () {
	function Router() {
		_classCallCheck(this, Router);

		this.router = null;
	}

	_createClass(Router, [{
		key: 'setRouter',
		value: function setRouter(router) {
			this.router = router;
		}
	}, {
		key: '_defaultRouter',
		value: function _defaultRouter(url) {
			var router = this.router;
			var urlInfo = _url2.default.toInfo(url).originpathname.substr(1);
			for (var i in router) {
				var regeExpString = i;
				regeExpString = regeExpString.replace('(:num)', '[0-9]+');
				regeExpString = regeExpString.replace('(:any)', '[^\/]+');
				regeExpString = '^' + regeExpString + '$';
				var regexp = new RegExp(regeExpString);
				if (regexp.test(urlInfo)) {
					return router[i];
				}
			}
			if (router.hasOwnProperty('404')) {
				console.log('找不到合适的router ' + url + ',' + urlInfo);
				return router['404'];
			} else {
				throw new Error('找不到合适的router ' + url + ',' + urlInfo);
			}
		}
	}, {
		key: 'route',
		value: function route(url) {
			if (!this.router) {
				throw new Error("没有设置router，无法执行");
				return;
			}
			if (typeof this.router == 'function') {
				return this.router(url);
			}
			return this._defaultRouter(url);
		}
	}]);

	return Router;
})();

exports.default = Router;