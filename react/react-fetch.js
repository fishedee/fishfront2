'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

exports.default = {
	fetch: (function () {
		var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
			var _args = arguments;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _isomorphicFetch2.default.apply(null, _args);

						case 2:
							return _context.abrupt('return', _context.sent);

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function fetch() {
			return ref.apply(this, arguments);
		};
	})()
};