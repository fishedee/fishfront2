import Env from '../../runtime/env';
import React from 'react';

function createClass(proto){
	if( proto.mixins ){
		for( var singleMixin of proto.mixins ){
			for( var methodName in singleMixin ){
				var methodResult = singleMixin[methodName];
				if( proto.hasOwnProperty(methodName))
					continue;
				proto[methodName] = methodResult;
			}
		}
	}
	proto.on = function(singleListener){
		this.__listener.add(singleListener);
	}
	proto.off = function(singleListener){
		this.__listener.devare(singleListener);
	}
	function StoreClass(){
		this.__state = this.getInitialState(); 
		this.__listener = new Set();
		this.__defineSetter__('state',(state)=>{
			this.__state = state;
			if( this.__listener.size == 0 )
				return;
			for( var singleListener of this.__listener ){
				singleListener();
			}
		});
		this.__defineGetter__('state',()=>{
			return this.__state;
		});
		for( var methodName in this ){
			var methodResult = this[methodName];
			if( typeof methodResult != 'function' )
				continue;
			if( methodName == 'getInitialState')
				continue;
			if( methodName.substr(0,1) == '_')
				continue;
			this[methodName] = methodResult.bind(this);
		}
	}
	StoreClass.prototype = proto;
	return StoreClass;
}

function createModel(modelConfig){
	var models = {};
	for( var i in modelConfig ){
		var modelClass = modelConfig[i];
		models[i] = new modelClass();
	}
	return models;
}

function serializeModel(models){
	var modelSerialize = {};
	for( var i in models ){
		modelSerialize[i] = models[i].state;
	}
	return JSON.stringify(modelSerialize);
}

function deserializeModel(models,modelSerialize){
	for( var i in models ){
		if( !modelSerialize.hasOwnProperty(i) )
			continue;
		models[i].state = modelSerialize[i];
	}
	return models;
}

var ModelProvider = React.createClass({
	childContextTypes:{
        model: React.PropTypes.object.isRequired,
        serverHandler: React.PropTypes.array
    },
	getChildContext(){
		return {
			model:this.props.model,
			serverHandler:this.props.serverHandler
		}
	},
	whenModelChange(){
		this.setState({});
	},
	getInitialState(){
		if( Env.isInBrowser() ){
			var models = this.props.model;
			for( var i in models ){
				models[i].on(this.whenModelChange);
			}
		}
		return {}
	},
	componentWillUnmount(){
		var models = this.props.model;
		for( var i in models ){
			models.off(this.whenModelChange);
		}
	},
	render(){
		return this.props.children;
	}
});

var Models = {
	createClass:createClass,
	create:createModel,
	serialize:serializeModel,
	deserialize:deserializeModel,
	Provider:ModelProvider,
};

Env.exportGlobal('Models',Models);
export default Models;