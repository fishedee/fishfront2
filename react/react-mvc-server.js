'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MvcServer = undefined;

var _reactMvc = require('./react-mvc');

var _model = require('./react-mvc/model');

var _model2 = _interopRequireDefault(_model);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function routerRender(router, url) {
	return new Promise(function (resolve, reject) {
		(0, _reactRouter.match)({ routes: router, location: url }, function (error, redirectLocation, renderProps) {
			if (error) {
				resolve({ status: 500, msg: error.message });
			} else if (redirectLocation) {
				resolve({ status: 302, msg: redirectLocation.pathname + redirectLocation.search });
			} else if (renderProps) {
				resolve({ status: 200, msg: renderProps });
			} else {
				resolve({ status: 404, msg: 'File not found' });
			}
		});
	});
}

var MvcServer = (function (_Mvc) {
	_inherits(MvcServer, _Mvc);

	function MvcServer() {
		_classCallCheck(this, MvcServer);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(MvcServer).apply(this, arguments));
	}

	_createClass(MvcServer, [{
		key: 'renderToString',
		value: (function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, resp) {
				var ModelProvider, model, routerResult, renderProps, serverHandler, i, data, html;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								//初始化model
								ModelProvider = _model2.default.Provider;
								model = new _model2.default.Store();

								//寻找路由

								_context.next = 4;
								return routerRender(this.route, req.url);

							case 4:
								routerResult = _context.sent;

								if (!(routerResult.status == 500)) {
									_context.next = 10;
									break;
								}

								resp.status(500).send(routerResult.msg);
								return _context.abrupt('return', null);

							case 10:
								if (!(routerResult.status == 302)) {
									_context.next = 15;
									break;
								}

								resp.redirect(302, routerResult.msg);
								return _context.abrupt('return', null);

							case 15:
								if (!(routerResult.status == 404)) {
									_context.next = 20;
									break;
								}

								resp.status(404).send(routerResult.msg);
								return _context.abrupt('return', null);

							case 20:
								//初始化数据
								renderProps = routerResult.msg;
								serverHandler = [];

								console.log(model);
								_server2.default.renderToString(React.createElement(
									ModelProvider,
									{ model: model, serverHandler: serverHandler },
									React.createElement(_reactRouter.RoutingContext, renderProps)
								));
								_context.t0 = regeneratorRuntime.keys(serverHandler);

							case 25:
								if ((_context.t1 = _context.t0()).done) {
									_context.next = 33;
									break;
								}

								i = _context.t1.value;

								if (serverHandler[i].onServerCreate) {
									_context.next = 29;
									break;
								}

								return _context.abrupt('continue', 25);

							case 29:
								_context.next = 31;
								return serverHandler[i].onServerCreate();

							case 31:
								_context.next = 25;
								break;

							case 33:
								data = model.serialize();
								_context.t2 = regeneratorRuntime.keys(serverHandler);

							case 35:
								if ((_context.t3 = _context.t2()).done) {
									_context.next = 43;
									break;
								}

								i = _context.t3.value;

								if (serverHandler[i].onServerClose) {
									_context.next = 39;
									break;
								}

								return _context.abrupt('continue', 35);

							case 39:
								_context.next = 41;
								return serverHandler[i].onServerClose();

							case 41:
								_context.next = 35;
								break;

							case 43:
								_context.next = 45;
								return routerRender(this.route, req.url);

							case 45:
								routerResult = _context.sent;
								renderProps = routerResult.msg;
								html = _server2.default.renderToString(React.createElement(
									ModelProvider,
									{ model: model },
									React.createElement(_reactRouter.RoutingContext, renderProps)
								));
								return _context.abrupt('return', '<div id="body">' + html + '</div>' + '<script>window.__INIT_STATE__=' + data + '</script>');

							case 49:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			return function renderToString(_x, _x2) {
				return ref.apply(this, arguments);
			};
		})()
	}]);

	return MvcServer;
})(_reactMvc.Mvc);

exports.MvcServer = MvcServer;