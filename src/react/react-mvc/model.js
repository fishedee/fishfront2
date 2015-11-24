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
		this.__state = null;
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
			if( methodName.substr(0,1) == '_')
				continue;
			this[methodName] = methodResult.bind(this);
		}
		if( this.initialize ){
			this.initialize();
		}
	}
	StoreClass.prototype = proto;
	return StoreClass;
}

function Store(){
	this.initData = {};
	this.models = {};
	this.listener = null;
	this.create = function(modelClass){
		var name = modelClass.prototype.name;
		if( this.models.hasOwnProperty(name) ){
			return this.models[name];
		}
		var newModel = new modelClass();
		if( this.initData.hasOwnProperty(name) ){
			newModel.state = this.initData[name];
		}
		if( this.listener != null )
			newModel.on(this.listener);
		this.models[name] = newModel;
		return newModel;
	}
	this.serialize = function(){
		var modelSerialize = {};
		for( var i in this.models ){
			modelSerialize[i] = this.models[i].state;
		}
		return JSON.stringify(modelSerialize);
	}
	this.deserialize = function(data){
		this.initData = data;
	}
	this.on = function(listener){
		this.listener = listener;
	}
	this.off = function(listener){
		this.listener = null;
	}
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
			this.props.model.on(this.whenModelChange);
		}
		return {}
	},
	componentWillUnmount(){
	},
	render(){
		return this.props.children;
	}
});

var Models = {
	createClass:createClass,
	Store:Store,
	Provider:ModelProvider,
};

Env.exportGlobal('Models',Models);
export default Models;