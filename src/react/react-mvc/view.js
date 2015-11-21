import ImmutableRenderMixin from '../react-immutable-render-mixin';
import React from 'react';
import Env from '../../runtime/env';

function createClass(proto){
	if( !proto.mixins ){
		proto.mixins = [];
	}
	proto.mixins.push(ImmutableRenderMixin);
	proto.contextTypes = {
        controller: React.PropTypes.object.isRequired,
    }
	proto.action = async function(){
		try{
			var method = arguments[0];
			var methodArguments = Array.prototype.slice.call(arguments, 1);
			var controller = this.context.controller;
			if( ! method in controller ){
				console.error("controller has not method "+method);
				return;
			}
			return await controller[method].apply(
				controller,
				methodArguments
			);
		}catch(e){
			console.err(e);
		}
	}
	proto.go = function(url){
		var controller = this.context.controller;
		controller.getContext().go(url);
	}
	proto.back = function(){
		var controller = this.context.controller;
		controller.getContext().back();
	}
	proto.replace = function(url){
		var controller = this.context.controller;
		controller.getContext().replace(url);
	}
	proto.reload = function(){
		var controller = this.context.controller;
		controller.getContext().reload();
	}
	return React.createClass(proto);
}

var Views = {
	createClass:createClass
};

Env.exportGlobal('Views',Views);
Env.exportGlobal('React',React);
export default Views;