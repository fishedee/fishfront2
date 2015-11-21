'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactMvc = require('./react-mvc');

var _reactMvc2 = _interopRequireDefault(_reactMvc);

var _model = require('./react-mvc/model');

var _model2 = _interopRequireDefault(_model);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MvcServer = (function (_Mvc) {
	_inherits(MvcServer, _Mvc);

	function MvcServer() {
		_classCallCheck(this, MvcServer);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(MvcServer).apply(this, arguments));
	}

	_createClass(MvcServer, [{
		key: 'renderToString',
		value: (function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
				var RootViewClass, controller, html, data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								RootViewClass = this.getRootViewClass();
								controller = this.createTop(url, this.pageStackCounter - 1);
								_context.next = 4;
								return controller.onServerCreateInner();

							case 4:
								html = _server2.default.renderToString(React.createElement(RootViewClass, { controller: controller }));
								_context.next = 7;
								return controller.onServerDestroyInner();

							case 7:
								data = _model2.default.serialize(this);

								_model2.default.destroy(this);
								return _context.abrupt('return', '<div id="body">' + html + '</div>' + '<script>window.__INIT_STATE__=' + data + '</script>');

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			return function renderToString(_x) {
				return ref.apply(this, arguments);
			};
		})()
	}]);

	return MvcServer;
})(_reactMvc2.default);

exports.default = MvcServer;