'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _url = require('../../encoding/url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Abtest = (function () {
	function Abtest() {
		_classCallCheck(this, Abtest);

		this.abTest = null;
		this.random = Math.random();
	}

	_createClass(Abtest, [{
		key: 'setAbTest',
		value: function setAbTest(abTest) {
			this.abTest = abTest;
		}
	}, {
		key: '_defaultAbTest',
		value: function _defaultAbTest(url) {
			var router = this.abTest;
			function mapRouter(url) {
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
				return null;
			}
			function mapUrl(originUrl, abTestUrl) {
				var segment1 = abTestUrl.split('/')[0];
				var urlInfo = _url2.default.toInfo(originUrl);
				urlInfo.pathname[0] = segment1;
				return _url2.default.fromInfo(urlInfo);
			}
			function mapRand(abTest) {
				var sum = 0;
				var lastUrl;
				for (var url in abTest) {
					sum += abTest[url];
					if (random < sum) return url;
					lastUrl = url;
				}
				return lastUrl;
			}
			var abTest = mapRouter(url);
			if (abTest == null) return url;

			var abTestRouter = mapRand(abTest);
			return mapUrl(url, abTestRouter);
		}
	}, {
		key: 'abTest',
		value: function abTest(url) {
			if (!this.abTest) {
				return url;
			} else if (typeof this.abTest == 'function') {
				return this.abTest(url);
			} else {
				return this._defaultAbTest(url);
			}
		}
	}]);

	return Abtest;
})();

exports.default = Abtest;