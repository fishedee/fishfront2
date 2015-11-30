'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactMvc = require('./react-mvc');

var _model = require('./react-mvc/model');

var _model2 = _interopRequireDefault(_model);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require('react-router');

var _reactStyle = require('./react-style');

var _reactStyle2 = _interopRequireDefault(_reactStyle);

var _reactDocumentHeadProvider = require('./react-document-head-provider');

var _reactDocumentHeadProvider2 = _interopRequireDefault(_reactDocumentHeadProvider);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('../webpack/webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _reload = require('../runtime/reload');

var _reload2 = _interopRequireDefault(_reload);

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
		key: 'construcotr',
		value: function construcotr() {
			_get(Object.getPrototypeOf(MvcServer.prototype), 'construcotr', this).call(this);
			this.routeInstance = null;
			this.webpackConfig = null;
			this.staticDir = null;
			this.development = true;
			this.port = 1616;
		}
	}, {
		key: 'setWebPackConfig',
		value: function setWebPackConfig(webpackConfig) {
			this.webpackConfig = webpackConfig;
		}
	}, {
		key: 'setPort',
		value: function setPort(port) {
			this.port = port;
		}
	}, {
		key: 'setDevelopment',
		value: function setDevelopment(development) {
			this.development = development;
		}
	}, {
		key: 'setStaticDir',
		value: function setStaticDir(staticDir) {
			this.staticDir = staticDir;
		}
	}, {
		key: 'renderToString',
		value: (function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, resp) {
				var routerResult, ModelProvider, model, renderProps, serverHandler, i, data, DocumentHeadProvider, documentHead, html, style, result;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return routerRender(this.routeInstance, req.url);

							case 2:
								routerResult = _context.sent;

								if (!(routerResult.status == 500)) {
									_context.next = 8;
									break;
								}

								resp.status(500).send(routerResult.msg);
								return _context.abrupt('return', null);

							case 8:
								if (!(routerResult.status == 302)) {
									_context.next = 13;
									break;
								}

								resp.redirect(302, routerResult.msg);
								return _context.abrupt('return', null);

							case 13:
								if (!(routerResult.status == 404)) {
									_context.next = 18;
									break;
								}

								resp.status(404).send(routerResult.msg);
								return _context.abrupt('return', null);

							case 18:
								//首次渲染获取数据
								ModelProvider = _model2.default.Provider;
								model = new _model2.default.Store();

								model.setServerRequest(req);

								renderProps = routerResult.msg;
								serverHandler = [];

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

								//二次渲染获取html
								DocumentHeadProvider = _reactDocumentHeadProvider2.default.Provider;
								documentHead = new _reactDocumentHeadProvider2.default.DocumentHead();
								_context.next = 47;
								return routerRender(this.routeInstance, req.url);

							case 47:
								routerResult = _context.sent;
								renderProps = routerResult.msg;
								html = _server2.default.renderToString(React.createElement(
									DocumentHeadProvider,
									{ documentHead: documentHead },
									React.createElement(
										ModelProvider,
										{ model: model },
										React.createElement(_reactRouter.RoutingContext, renderProps)
									)
								));

								//生成stylesheet

								style = _reactStyle2.default.renderToString(html);
								result = '<!DOCTYPE>\n<html>\n    <head>\n       \t' + documentHead.renderMetaString() + '\n       \t' + documentHead.renderTitleString() + '\n       \t' + documentHead.renderBaseString() + '\n       \t' + documentHead.renderLinkString() + '\n       \t' + style + '\n    </head>\n    <body>\n        <div id="body">' + html + '</div>\n        <script>window.__INIT_STATE__=' + data + '</script>\n        ' + documentHead.renderScriptString() + '\n    </body>\n</html>\n';

								resp.send(result);

							case 53:
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
	}, {
		key: 'getMiddleware',
		value: function getMiddleware() {
			var self = this;
			var middleware = (function () {
				var _this2 = this;

				var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, resp, next) {
					return regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									_context2.prev = 0;
									_context2.next = 3;
									return self.renderToString(req, resp);

								case 3:
									_context2.next = 9;
									break;

								case 5:
									_context2.prev = 5;
									_context2.t0 = _context2['catch'](0);

									resp.status(500).send('nodejs server error');
									console.error(_context2.t0.stack);

								case 9:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, _this2, [[0, 5]]);
				}));

				return function middleware(_x3, _x4, _x5) {
					return ref.apply(this, arguments);
				};
			})();
			return middleware.bind(this);
		}
	}, {
		key: 'run',
		value: function run() {
			var self = this;
			var requireReload = (0, _reload2.default)(require, { noLibrary: true });
			var app = new _express2.default();
			var port = this.port;
			var compiler = (0, _webpack2.default)(this.webpackConfig);
			app.use((0, _compression2.default)());
			app.set('etag', true);
			app.set('etag', 'strong');
			if (this.staticDir) {
				app.use(_express2.default.static(this.staticDir));
			}
			app.use((0, _webpackDevMiddleware2.default)(compiler, {
				hot: true,
				stats: {
					colors: true
				}
			}));
			app.use((function () {
				var _this3 = this;

				var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, resp, next) {
					var routeInstance;
					return regeneratorRuntime.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.prev = 0;
									routeInstance = requireReload(self.route);

									routeInstance = routeInstance && routeInstance.__esModule ? routeInstance : { default: routeInstance };
									self.routeInstance = routeInstance.default;
									_context3.next = 6;
									return self.renderToString(req, resp, next);

								case 6:
									_context3.next = 12;
									break;

								case 8:
									_context3.prev = 8;
									_context3.t0 = _context3['catch'](0);

									resp.status(500).send('nodejs server error');
									console.error(_context3.t0.stack);

								case 12:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, _this3, [[0, 8]]);
				}));

				return function (_x6, _x7, _x8) {
					return ref.apply(this, arguments);
				};
			})());
			app.listen(port, function (error) {
				if (error) {
					console.error(error);
				} else {
					console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
				}
			});
		}
	}]);

	return MvcServer;
})(_reactMvc.Mvc);

exports.default = MvcServer;