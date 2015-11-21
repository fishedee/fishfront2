import React from 'react'
import ReactDOM from 'react-dom';
import Immutable from 'immutable'
//FIXME
//import HistoryJs from 'historyjs/scripts/bundled/html4+html5/native.history.js'
import Controller from './react-mvc/controller';
import Model from './react-mvc/model';
import View from './react-mvc/view';
import Router from './react-mvc/router';
import Abtest from './react-mvc/abtest';
import Url from '../encoding/url';

//页面顶部view
var ViewWrapper = React.createClass({
	childContextTypes:{
        controller: React.PropTypes.object.isRequired
    },
	getChildContext:function(){
		return {
			controller:this.props.controller
		}
	},
	componentDidMount:function(){
		this.props.controller.setViewInstance(this);
	},
	render:function(){
		var ViewClass = this.props.controller.getView();
		var viewData = this.props.controller.getData();
		return (<ViewClass {...viewData}/>);
	}
});

//顶级RootView
var RootViewClass = React.createClass({
	render:function(){
		if( this.props.controller ){
			return <ViewWrapper key={this.props.controller.getId()} controller={this.props.controller}/>;
		}else{
			return null;
		}
	}
});

class Mvc{
	constructor(){
		this.router = new Router();
		this.abTest = new Abtest();
		this.pageOnChange = [];
		this.pageStack = [];
		this.pageStackCounter = 1;
		this.pageTitle = '';
		this.rootView = null;
	}
	destroyTop(){
		var controller = this.pageStack.pop();
		return controller;
	}
	createTop(url,counter){
		var ControllerClass = this.router.route(url);
		var controller = new ControllerClass(this,url,counter);
		this.pageStack.push(controller);
		return controller;
	}
	pauseTop(){
		var controller = this.pageStack[this.pageStack.length-1];
		controller.setScrollTop(document.body.scrollTop);
		return controller;
	}
	resumeTop(){
		var controller = this.pageStack[this.pageStack.length-1];
		return controller;
	}
	showAnimate(controller){
		this.rootView.setProps({controller:controller},function(){
			document.body.scrollTop = controller.getScrollTop();
			controller.onCreateInner();
		});
	}
	replaceAnimate(prevController,controller){
		prevController.onDestroyInner();

		this.rootView.setProps({controller:controller},function(){
			document.body.scrollTop(controller.getScrollTop());
			controller.onCreateInner();
		});
	}
	goAnimate(prevController,controller){
		prevController.onPauseInner();

		this.rootView.setProps({controller:controller},function(){
			document.body.scrollTop(controller.getScrollTop());
				controller.onCreateInner();
		});
	}
	backAnimate(controller,nextController){
		nextController.onDestroyInner();

		this.rootView.setProps({controller:controller},function(){
			document.body.scrollTop(controller.getScrollTop());
			controller.onResumeInner();
		});
	}
	go(url){
		var urlInfo = Url.toInfo(url);
		var url = urlInfo.originpathname + urlInfo.originsearch + urlInfo.originhash;
		HistoryJs.pushState({
			counter:this.pageStackCounter++,
			rand:new Date().valueOf()
		},pageTitle,url);
	}
	back(data){
		if( this.pageStack.length <= 1 )
			return;
		HistoryJs.back();
	}
	replace(url){
		var urlInfo = Url.toInfo(url);
		var url = urlInfo.originpathname + urlInfo.originsearch + urlInfo.originhash;
		var state = HistoryJs.getState();
		HistoryJs.replaceState({
			counter:state.data.counter,
			rand:new Date().valueOf()
		},pageTitle,url);
	}
	reload(){
		var state = HistoryJs.getState();
		replace(state.url);
	}
	setRouter(inRouter){
		this.router.setRouter(inRouter);
	}
	setAbTest(inAbTest){
		this.abTest.setAbTest(inAbTest);
	}
	setOnChange(inPageOnChange){
		pageOnChange.push(inPageOnChange);
	}
	getRootViewClass(){
		return RootViewClass;
	}
	whenStateChange(){
		var state = HistoryJs.getState();
		var stateCounter = state.data.counter;
		var showUrl = state.url;
		var runUrl = this.abTest.abTest(showUrl);
		var url = {
			showUrl:showUrl,
			runUrl:runUrl
		};
		var hitCounter = -1;
		for( var i = 0 ; i != this.pageStack.length ; ++i ){
			if( this.pageStack[i].getPageId() == stateCounter ){
				hitCounter = i;
				break;
			}
		}
		if( hitCounter == -1 ){
			//新开一个页面
			var prevController = null;
			var currentController = null;
			if( this.pageStack.length > 0 )
				prevController = this.pauseTop();
			currentController = this.createTop(runUrl,state.data.counter);
			if( prevController == null )
				showAnimate(currentController);
			else
				goAnimate(prevController,currentController);
		}else if( hitCounter == this.pageStack.length - 1 ){
			//代替当前页面
			var prevController = destroyTop();
			var currentController = createTop(runUrl,state.data.counter);
			replaceAnimate(prevController,currentController);
		}else{
			//回退页面
			var prevController = null;
			var currentController = null;
			for( var j = this.pageStack.length - 1 ; j > hitCounter ; --j )
				currentController = destroyTop();
			prevController = resumeTop();
			backAnimate(prevController,currentController);
		}
		for( var i in this.pageOnChange )
			this.pageOnChange[i]( url );
	}
	render(url){
		Model.deserialize(this,window.__INIT_STATE__);
		var controller = this.createTop(url,this.pageStackCounter);
		this.rootView = ReactDOM.render(<RootViewClass controller={controller}/>,document.getElementById('body'));
	}
	/*
	render(url){
		//加入首页，方便返回
		this.go('/');
		this.createTop('/',this.pageStackCounter-1);

		//建立controller
		

		//加入stateChange
		HistoryJs.Adapter.bind(window,'statechange',this.whenStateChange.bind(this));
	}
	*/
}
export default Mvc