'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactImmutableRenderMixin = require('../react-immutable-render-mixin');

var _reactImmutableRenderMixin2 = _interopRequireDefault(_reactImmutableRenderMixin);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _env = require('../../runtime/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function createClass(proto) {
	if (!proto.mixins) {
		proto.mixins = [];
	}
	proto.mixins.push(_reactImmutableRenderMixin2.default);
	proto.contextTypes = {
		controller: _react2.default.PropTypes.object.isRequired
	};
	proto.action = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
		var method,
		    methodArguments,
		    controller,
		    _args = arguments;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						method = _args[0];
						methodArguments = Array.prototype.slice.call(_args, 1);
						controller = this.context.controller;

						if (!(!method in controller)) {
							_context.next = 7;
							break;
						}

						console.error("controller has not method " + method);
						return _context.abrupt('return');

					case 7:
						_context.next = 9;
						return controller[method].apply(controller, methodArguments);

					case 9:
						return _context.abrupt('return', _context.sent);

					case 12:
						_context.prev = 12;
						_context.t0 = _context['catch'](0);

						console.error(_context.t0);

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 12]]);
	}));
	proto.go = function (url) {
		var controller = this.context.controller;
		controller.getContext().go(url);
	};
	proto.back = function () {
		var controller = this.context.controller;
		controller.getContext().back();
	};
	proto.replace = function (url) {
		var controller = this.context.controller;
		controller.getContext().replace(url);
	};
	proto.reload = function () {
		var controller = this.context.controller;
		controller.getContext().reload();
	};
	return _react2.default.createClass(proto);
}

var Views = {
	createClass: createClass
};

_env2.default.exportGlobal('Views', Views);
_env2.default.exportGlobal('React', _react2.default);
exports.default = Views;