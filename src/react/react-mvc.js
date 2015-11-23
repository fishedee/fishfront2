import React from 'react'
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {Router,Route,IndexRoute,match} from 'react-router';
import Controller from './react-mvc/controller';
import Model from './react-mvc/model';
import View from './react-mvc/view';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

class Mvc{
	constructor(){
		this.route = null;
		this.model = null;
		this.history = 'browser';
	}
	setRoute(route){
		this.route = route;
	}
	setModel(model){
		this.model = model;
	}
	setHistory( history){
		this.history = history;
	}
	renderInner(){
		var ModelProvider = Model.Provider;
		//初始化model
		var models = Model.create(this.model);
		Model.deserialize(models,window.__INIT_STATE__);
		//创建history
		if( this.history == 'hash')
			var history = createHashHistory();
		else
			var history = createBrowserHistory();
		//渲染
		ReactDOM.render(
			<ModelProvider model={models}>
				<Router history={history}>{this.route}</Router>
			</ModelProvider>,
			document.getElementById('body')
		);
	}
	render(url){
		match({routes:this.route,location:window.location.pathname},(error,redirection,renderProps)=>{
			console.log(error,redirection,renderProps);
			this.renderInner();
		});
		
	}
}

export {
	Mvc as Mvc,
	Router as Router,
	Route as Route,
	IndexRoute as IndexRoute
}