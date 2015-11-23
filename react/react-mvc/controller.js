'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _env = require('../../runtime/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

//FIXME counter计算
var idCounter = 1;
var controllerProto = {
	onServerDestroyInner: (function () {
		var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!this.onServerDestroy) {
								_context.next = 3;
								break;
							}

							_context.next = 3;
							return this.onServerDestroy();

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function onServerDestroyInner() {
			return ref.apply(this, arguments);
		};
	})(),
	onServerCreateInner: (function () {
		var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!this.onServerCreate) {
								_context2.next = 3;
								break;
							}

							_context2.next = 3;
							return this.onServerCreate();

						case 3:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this);
		}));

		return function onServerCreateInner() {
			return ref.apply(this, arguments);
		};
	})()
};
function createClass(proto) {
	proto.loadView = function (viewClass) {
		this.__viewClass = viewClass;
	};
	proto.getView = function () {
		return this.__viewClass;
	};
	proto.loadModel = function (modelClass, modelName) {
		this[modelName] = _model2.default.create(this.__context, modelName, modelClass);
		this.__models.push(modelName);
		if (_env2.default.isInBrowser()) {
			this[modelName].on(this.__onModelChange);
		}
	};
	proto.onServerCreateInner = controllerProto.onServerCreateInner;
	proto.onServerDestroyInner = controllerProto.onServerDestroyInner;
	proto.onCreateInner = function () {
		if (this.onCreate) this.onCreate();
	};
	proto.onPauseInner = function () {
		if (this.onPause) this.onPause();
	};
	proto.onResumeInner = function () {
		if (this.onResume) this.onResume();
	};
	proto.onDestroyInner = function () {
		for (var i in this.__models) {
			var name = this.__models[i];
			this[name].off(this._onModelChange);
		}
		if (this.onDestroy) this.onDestroy();
	};
	proto.getData = function () {
		return this.__data;
	};
	proto.getId = function () {
		return this.__id;
	};
	proto.getPageId = function () {
		return this.__pageId;
	};
	proto.setViewInstance = function (view) {
		this.__view = view;
	};
	proto.setScrollTop = function (scrollTop) {
		this.__scrollTop = scrollTop;
	};
	proto.getScrollTop = function () {
		return this.__scrollTop;
	};
	proto.getContext = function () {
		return this.__context;
	};
	function result(context, url, pageId) {
		this.__scrollTop = 0;
		this.__view = null;
		this.__pageId = pageId;
		this.__id = idCounter++;
		this.__url = url;
		this.__context = context;
		this.__models = [];
		this.__onModelChange = (function () {
			this.__data = this.render();
			if (this.__view != null) {
				this.__view.setState({});
			}
		}).bind(this);
		this.location = new _location2.default(url);
		if (this.initialize) this.initialize();
		this.__data = this.render();
	}
	result.prototype = proto;
	return result;
}

var Controllers = {
	createClass: createClass
};

_env2.default.exportGlobal('Controllers', Controllers);
exports.default = Controllers;