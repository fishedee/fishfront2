import Env from '../../runtime/env';

function createClass(proto){
	proto.on = function(singleListener){
		this.__listener.add(singleListener);
	}
	proto.off = function(singleListener){
		this.__listener.delete(singleListener);
	}
	function result(){
		this.__state = null;
		this.__listener = new Set();
		this.__hasTrigger = false;
		this.__defineSetter__('state',(state)=>{
			this._state = state;
			if( this.__listener.size == 0 )
				return;
			if( this.__hasTrigger == true )
				return;
			this.__hasTrigger = true;
			setTimeout(()=>{
				this.__hasTrigger = false;
				for( var singleListener of this.__listener ){
					singleListener();
				}
			},0);
		});
		this.__defineGetter__('state',()=>{
			return this._state;
		});
		if( this.initialize )
			this.initialize();
	}
	result.prototype = proto;
	return result;
}

var models = new Map();
var modelsInitData = new Map();

function createModel(context,modelName,modelClass){
	var modelMap = null;
	if( models.has(context) ){
		modelMap = models.get(context);
	}else{
		modelMap = new Map();
		models.set(context,modelMap);
	}

	var model = null;
	if( modelMap.has(modelName) ){
		model = modelMap.get(modelName);
	}else{
		model = new modelClass();
		if( modelsInitData.has(context) ){
			var modelInitDataMap = modelsInitData.get(context);
			if( modelInitDataMap.has(modelName) ){
				model.state = modelInitDataMap.get(modelName);
			}
		}
		modelMap.set(modelName,model);
	}

	return model;
}

function destroyModel(context){
	models.delete(context);
	modelsInitData.delete(context);
}

function serializeModel(context){
	if( models.has(context) ){
		var modelMap = models.get(context);
		var result = {};
		for( var [key,value] of modelMap.entries() ){
			result[key] = value.state;
		}
		return JSON.stringify(result);
	}else{
		return JSON.stringify({});
	}
}

function deserializeModel(context,result){
	var data = new Map();
	for( var i in result ){
		data.set(i,result[i]);
	}
	modelsInitData.set(context,data);
}

var Models = {
	createClass:createClass,
	create:createModel,
	destroy:destroyModel,
	serialize:serializeModel,
	deserialize:deserializeModel,
};

Env.exportGlobal('Models',Models);
export default Models;