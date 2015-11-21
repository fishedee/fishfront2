'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _env = require('../../runtime/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createClass(proto) {
	proto.on = function (singleListener) {
		this.__listener.add(singleListener);
	};
	proto.off = function (singleListener) {
		this.__listener.delete(singleListener);
	};
	function result() {
		var _this = this;

		this.__state = null;
		this.__listener = new Set();
		this.__hasTrigger = false;
		this.__defineSetter__('state', function (state) {
			_this._state = state;
			if (_this.__listener.size == 0) return;
			if (_this.__hasTrigger == true) return;
			_this.__hasTrigger = true;
			setTimeout(function () {
				_this.__hasTrigger = false;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = _this._listener[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var singleListener = _step.value;

						singleListener();
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
			}, 0);
		});
		this.__defineGetter__('state', function () {
			return _this._state;
		});
		if (this.initialize) this.initialize();
	}
	result.prototype = proto;
	return result;
}

var models = new Map();
var modelsInitData = new Map();

function createModel(context, modelName, modelClass) {
	var modelMap = null;
	if (models.has(context)) {
		modelMap = models.get(context);
	} else {
		modelMap = new Map();
		models.set(context, modelMap);
	}

	var model = null;
	if (modelMap.has(modelName)) {
		model = modelMap.get(modelName);
	} else {
		model = new modelClass();
		modelMap.set(modelName, model);
	}

	if (modelsInitData.has(context)) {
		var modelInitDataMap = modelsInitData.get(context);
		if (modelInitDataMap.has(modelClass)) {
			var initData = modelInitDataMap.get(modelClass);
			model.state = JSON.parse(initData);
		}
	}

	return model;
}

function destroyModel(context) {
	models.delete(context);
	modelsInitData.delete(context);
}

function serializeModel(context) {
	if (models.has(context)) {
		var modelMap = models.get(context);
		var result = {};
		for (var i in modelMap) {
			result[i] = modelMap[i].state;
		}
		return JSON.stringify(result);
	} else {
		return JSON.stringify({});
	}
}

function deserializeModel(context, result) {
	modelsInitData.set(context, result);
}

var Models = {
	createClass: createClass,
	create: createModel,
	destroy: destroyModel,
	serialize: serializeModel,
	deserialize: deserializeModel
};

_env2.default.exportGlobal('Models', Models);
exports.default = Models;