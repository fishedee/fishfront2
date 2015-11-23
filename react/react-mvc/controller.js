'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _env = require('../../runtime/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createClass(proto) {
	proto.getInitialState = function () {
		if (this.context.serverHandler) {
			this.context.serverHandler.push({
				onServerCreate: this.onServerCreate,
				onServerDestroy: this.onServerDestroy
			});
		}

		for (var i in this.context.model) {
			this[i] = this.context.model[i];
		}return {};
	};
	proto.componentDidMount = function () {
		if (this.onCreate) this.onCreate();
	};
	proto.componentWillUnmount = function () {
		if (this.onDestroy) this.onDestroy();
	};
	proto.contextTypes = {
		model: React.PropTypes.object.isRequired,
		serverHandler: React.PropTypes.array
	};
	return React.createClass(proto);
}

var Controllers = {
	createClass: createClass
};

_env2.default.exportGlobal('Controllers', Controllers);
exports.default = Controllers;