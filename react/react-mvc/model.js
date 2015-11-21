'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

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
		if (modelsInitData.has(context)) {
			var modelInitDataMap = modelsInitData.get(context);
			if (modelInitDataMap.has(modelName)) {
				model.state = modelInitDataMap.get(modelName);
			}
		}
		modelMap.set(modelName, model);
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
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = modelMap.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _step2$value = _slicedToArray(_step2.value, 2);

				var key = _step2$value[0];
				var value = _step2$value[1];

				result[key] = value.state;
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

		return JSON.stringify(result);
	} else {
		return JSON.stringify({});
	}
}

function deserializeModel(context, result) {
	var data = new Map();
	for (var i in result) {
		data.set(i, result[i]);
	}
	modelsInitData.set(context, data);
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