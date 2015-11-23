'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _env = require('../../runtime/env');

var _env2 = _interopRequireDefault(_env);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createClass(proto) {
	if (proto.mixins) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = proto.mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var singleMixin = _step.value;

				for (var methodName in singleMixin) {
					var methodResult = singleMixin[methodName];
					if (proto.hasOwnProperty(methodName)) continue;
					proto[methodName] = methodResult;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}
	proto.on = function (singleListener) {
		this.__listener.add(singleListener);
	};
	proto.off = function (singleListener) {
		this.__listener.devare(singleListener);
	};
	function StoreClass() {
		var _this = this;

		this.__state = this.getInitialState();
		this.__listener = new Set();
		this.__defineSetter__('state', function (state) {
			_this.__state = state;
			if (_this.__listener.size == 0) return;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = _this.__listener[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var singleListener = _step2.value;

					singleListener();
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		});
		this.__defineGetter__('state', function () {
			return _this.__state;
		});
		for (var methodName in this) {
			var methodResult = this[methodName];
			if (typeof methodResult != 'function') continue;
			if (methodName == 'getInitialState') continue;
			if (methodName.substr(0, 1) == '_') continue;
			this[methodName] = methodResult.bind(this);
		}
	}
	StoreClass.prototype = proto;
	return StoreClass;
}

function createModel(modelConfig) {
	var models = {};
	for (var i in modelConfig) {
		var modelClass = modelConfig[i];
		models[i] = new modelClass();
	}
	return models;
}

function serializeModel(models) {
	var modelSerialize = {};
	for (var i in models) {
		modelSerialize[i] = models[i].state;
	}
	return JSON.stringify(modelSerialize);
}

function deserializeModel(models, modelSerialize) {
	for (var i in models) {
		if (!modelSerialize.hasOwnProperty(i)) continue;
		models[i].state = modelSerialize[i];
	}
	return models;
}

var ModelProvider = _react2.default.createClass({
	displayName: 'ModelProvider',

	childContextTypes: {
		model: _react2.default.PropTypes.object.isRequired,
		serverHandler: _react2.default.PropTypes.array
	},
	getChildContext: function getChildContext() {
		return {
			model: this.props.model,
			serverHandler: this.props.serverHandler
		};
	},
	whenModelChange: function whenModelChange() {
		this.setState({});
	},
	getInitialState: function getInitialState() {
		if (_env2.default.isInBrowser()) {
			var models = this.props.model;
			for (var i in models) {
				models[i].on(this.whenModelChange);
			}
		}
		return {};
	},
	componentWillUnmount: function componentWillUnmount() {
		var models = this.props.model;
		for (var i in models) {
			models.off(this.whenModelChange);
		}
	},
	render: function render() {
		return this.props.children;
	}
});

var Models = {
	createClass: createClass,
	create: createModel,
	serialize: serializeModel,
	deserialize: deserializeModel,
	Provider: ModelProvider
};

_env2.default.exportGlobal('Models', Models);
exports.default = Models;