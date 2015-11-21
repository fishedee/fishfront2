import Location from './location';
import Model from './model';
import Env from '../../runtime/env';

//FIXME counter计算
var idCounter = 1;
var controllerProto = {
	async onServerDestroyInner(){
		if( this.onServerDestroy ){
			await this.onServerDestroy();
		}
	},
	async onServerCreateInner(){
		if( this.onServerCreate ){
			await this.onServerCreate();
		}
	}
};
function createClass(proto){
	proto.loadView = function(viewClass){
		this.__viewClass = viewClass;
	}
	proto.getView = function(){
		return this.__viewClass;
	}
	proto.loadModel = function(modelClass,modelName){
		this[modelName]= Model.create(this.__context,modelName,modelClass);
		this.__models.push(modelName);
		if( Env.isInBrowser() ){
			this[modelName].on(this._onModelChange);
		}
	}
	proto.onServerCreateInner = controllerProto.onServerCreateInner;
	proto.onServerDestroyInner = controllerProto.onServerDestroyInner;
	proto.onCreateInner = function(){
		if( this.onCreate )
			this.onCreate();
	}
	proto.onPauseInner = function(){
		if( this.onPause )
			this.onPause();
	}
	proto.onResumeInner = function(){
		if( this.onResume )
			this.onResume();
	}
	proto.onDestroyInner = function(){
		for( var i in this.__models ){
			var name = this.__models[i];
			this[name].off(this._onModelChange);
		}
		if( this.onDestroy )
			this.onDestroy();
	}
	proto.getData = function(){
		return this.__data;
	}
	proto.getId = function(){
		return this.__id;
	}
	proto.getPageId = function(){
		return this.__pageId;
	}
	proto.setViewInstance = function(view){
		this.__view = view;
	}
	proto.setScrollTop = function(scrollTop){
		this.__scrollTop = scrollTop;
	}
	proto.getScrollTop = function(){
		return this.__scrollTop;
	}
	proto.getContext = function(){
		return this.__context;
	}
	function result(context,url,pageId){
		this.__scrollTop = 0;
		this.__view = null;
		this.__pageId = pageId;
		this.__id = idCounter++;
		this.__url = url;
		this.__context = context;
		this.__models = [];
		this.__onModelChange = function(){
			this.__data = this.render();
			if( this.__view != null ){
				this.__view.setState({});
			}
		}.bind(this);
		this.location = new Location(url);
		if( this.initialize )
			this.initialize();
		this.__data = this.render();
	}
	result.prototype = proto;
	return result;
}

var Controllers = {
	createClass:createClass
};

Env.exportGlobal('Controllers',Controllers);
export default Controllers;