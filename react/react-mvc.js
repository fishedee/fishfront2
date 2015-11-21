'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
//FIXME
//import HistoryJs from 'historyjs/scripts/bundled/html4+html5/native.history.js'

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _controller = require('./react-mvc/controller');

var _controller2 = _interopRequireDefault(_controller);

var _model = require('./react-mvc/model');

var _model2 = _interopRequireDefault(_model);

var _view = require('./react-mvc/view');

var _view2 = _interopRequireDefault(_view);

var _router = require('./react-mvc/router');

var _router2 = _interopRequireDefault(_router);

var _abtest = require('./react-mvc/abtest');

var _abtest2 = _interopRequireDefault(_abtest);

var _url = require('../encoding/url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//页面顶部view
var ViewWrapper = _react2.default.createClass({
	displayName: 'ViewWrapper',

	childContextTypes: {
		controller: _react2.default.PropTypes.object.isRequired
	},
	getChildContext: function getChildContext() {
		return {
			controller: this.props.controller
		};
	},
	componentDidMount: function componentDidMount() {
		this.props.controller.setViewInstance(this);
	},
	render: function render() {
		var ViewClass = this.props.controller.getView();
		var viewData = this.props.controller.getData();
		return _react2.default.createElement(ViewClass, viewData);
	}
});

//顶级RootView
var RootViewClass = _react2.default.createClass({
	displayName: 'RootViewClass',

	render: function render() {
		if (this.props.controller) {
			return _react2.default.createElement(ViewWrapper, { key: this.props.controller.getId(), controller: this.props.controller });
		} else {
			return null;
		}
	}
});

var Mvc = (function () {
	function Mvc() {
		_classCallCheck(this, Mvc);

		this.router = new _router2.default();
		this.abTest = new _abtest2.default();
		this.pageOnChange = [];
		this.pageStack = [];
		this.pageStackCounter = 1;
		this.pageTitle = '';
		this.rootView = null;
	}

	_createClass(Mvc, [{
		key: 'destroyTop',
		value: function destroyTop() {
			var controller = this.pageStack.pop();
			return controller;
		}
	}, {
		key: 'createTop',
		value: function createTop(url, counter) {
			var ControllerClass = this.router.route(url);
			var controller = new ControllerClass(this, url, counter);
			this.pageStack.push(controller);
			return controller;
		}
	}, {
		key: 'pauseTop',
		value: function pauseTop() {
			var controller = this.pageStack[this.pageStack.length - 1];
			controller.setScrollTop(document.body.scrollTop);
			return controller;
		}
	}, {
		key: 'resumeTop',
		value: function resumeTop() {
			var controller = this.pageStack[this.pageStack.length - 1];
			return controller;
		}
	}, {
		key: 'showAnimate',
		value: function showAnimate(controller) {
			this.rootView.setProps({ controller: controller }, function () {
				document.body.scrollTop = controller.getScrollTop();
				controller.onCreateInner();
			});
		}
	}, {
		key: 'replaceAnimate',
		value: function replaceAnimate(prevController, controller) {
			prevController.onDestroyInner();

			this.rootView.setProps({ controller: controller }, function () {
				document.body.scrollTop(controller.getScrollTop());
				controller.onCreateInner();
			});
		}
	}, {
		key: 'goAnimate',
		value: function goAnimate(prevController, controller) {
			prevController.onPauseInner();

			this.rootView.setProps({ controller: controller }, function () {
				document.body.scrollTop(controller.getScrollTop());
				controller.onCreateInner();
			});
		}
	}, {
		key: 'backAnimate',
		value: function backAnimate(controller, nextController) {
			nextController.onDestroyInner();

			this.rootView.setProps({ controller: controller }, function () {
				document.body.scrollTop(controller.getScrollTop());
				controller.onResumeInner();
			});
		}
	}, {
		key: 'go',
		value: function go(url) {
			var urlInfo = _url2.default.toInfo(url);
			var url = urlInfo.originpathname + urlInfo.originsearch + urlInfo.originhash;
			HistoryJs.pushState({
				counter: this.pageStackCounter++,
				rand: new Date().valueOf()
			}, pageTitle, url);
		}
	}, {
		key: 'back',
		value: function back(data) {
			if (this.pageStack.length <= 1) return;
			HistoryJs.back();
		}
	}, {
		key: 'replace',
		value: function replace(url) {
			var urlInfo = _url2.default.toInfo(url);
			var url = urlInfo.originpathname + urlInfo.originsearch + urlInfo.originhash;
			var state = HistoryJs.getState();
			HistoryJs.replaceState({
				counter: state.data.counter,
				rand: new Date().valueOf()
			}, pageTitle, url);
		}
	}, {
		key: 'reload',
		value: function reload() {
			var state = HistoryJs.getState();
			replace(state.url);
		}
	}, {
		key: 'setRouter',
		value: function setRouter(inRouter) {
			this.router.setRouter(inRouter);
		}
	}, {
		key: 'setAbTest',
		value: function setAbTest(inAbTest) {
			this.abTest.setAbTest(inAbTest);
		}
	}, {
		key: 'setOnChange',
		value: function setOnChange(inPageOnChange) {
			pageOnChange.push(inPageOnChange);
		}
	}, {
		key: 'whenStateChange',
		value: function whenStateChange() {
			var state = HistoryJs.getState();
			var stateCounter = state.data.counter;
			var showUrl = state.url;
			var runUrl = this.abTest.abTest(showUrl);
			var url = {
				showUrl: showUrl,
				runUrl: runUrl
			};
			var hitCounter = -1;
			for (var i = 0; i != this.pageStack.length; ++i) {
				if (this.pageStack[i].getPageId() == stateCounter) {
					hitCounter = i;
					break;
				}
			}
			if (hitCounter == -1) {
				//新开一个页面
				var prevController = null;
				var currentController = null;
				if (this.pageStack.length > 0) prevController = this.pauseTop();
				currentController = this.createTop(runUrl, state.data.counter);
				if (prevController == null) showAnimate(currentController);else goAnimate(prevController, currentController);
			} else if (hitCounter == this.pageStack.length - 1) {
				//代替当前页面
				var prevController = destroyTop();
				var currentController = createTop(runUrl, state.data.counter);
				replaceAnimate(prevController, currentController);
			} else {
				//回退页面
				var prevController = null;
				var currentController = null;
				for (var j = this.pageStack.length - 1; j > hitCounter; --j) {
					currentController = destroyTop();
				}prevController = resumeTop();
				backAnimate(prevController, currentController);
			}
			for (var i in this.pageOnChange) {
				this.pageOnChange[i](url);
			}
		}
	}, {
		key: 'render',
		value: function render(url) {
			_model2.default.deserialize(window.__INIT_STATE__);
			this.rootView = _react2.default.render(_react2.default.createElement(RootViewClass, null), document.getElementById('body'));
			//加入首页
			go('/');
			this.createTop('/', this.pageStackCounter - 1);
			//加入stateChange
			HistoryJs.Adapter.bind(window, 'statechange', this.whenStateChange.bind(this));
			//去往当前页面
			go(url);
		}
	}, {
		key: 'renderToString',
		value: (function () {
			var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
				var controller, html, data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								controller = this.createTop(url, this.pageStackCounter - 1);
								_context.next = 3;
								return controller.onServerCreateInner();

							case 3:
								html = _server2.default.renderToString(_react2.default.createElement(RootViewClass, { controller: controller }));
								_context.next = 6;
								return controller.onServerDestroyInner();

							case 6:
								data = _model2.default.serialize(this);

								_model2.default.destroy(this);
								return _context.abrupt('return', '<div id="body">' + html + '</div>' + '<script>window.__INIT_STATE__=' + data + '</script>');

							case 9:
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

	return Mvc;
})();

exports.default = Mvc;