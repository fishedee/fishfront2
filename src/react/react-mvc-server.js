import {Mvc,Router,Route,IndexRoute} from './react-mvc';
import Model from './react-mvc/model';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import StyleSheet from './react-style';

function routerRender(router,url){
	return new Promise((resolve,reject)=>{
		match({routes:router,location:url},(error,redirectLocation,renderProps)=>{
			if( error ){
				resolve({status:500,msg:error.message});
			}else if( redirectLocation ){
				resolve({status:302,msg:redirectLocation.pathname + redirectLocation.search});
			}else if( renderProps ){
				resolve({status:200,msg:renderProps});
			}else{
				resolve({status:404,msg:'File not found'});
			}
		});
	});
}

class MvcServer extends Mvc{
	async renderToString(req,resp){
		//初始化model
		var ModelProvider = Model.Provider;
		var model = new Model.Store();

		//寻找路由
		var routerResult = await routerRender(this.route,req.url);
		if( routerResult.status == 500 ){
			resp.status(500).send(routerResult.msg);
			return null;
		}else if( routerResult.status == 302 ){
			resp.redirect(302,routerResult.msg);
			return null;
		}else if( routerResult.status == 404 ){
			resp.status(404).send(routerResult.msg);
			return null;
		}else{
			//初始化数据
			var renderProps = routerResult.msg;
			var serverHandler = [];
			ReactDOM.renderToString(
				<ModelProvider model={model} serverHandler={serverHandler}>
					<RoutingContext {...renderProps}/>
				</ModelProvider>
			);
			for( var i in serverHandler ){
				if( !serverHandler[i].onServerCreate ) 
					continue;
				await serverHandler[i].onServerCreate();
			}
			var data = model.serialize();
			for( var i in serverHandler ){
				if( !serverHandler[i].onServerClose ) 
					continue;
				await serverHandler[i].onServerClose();
			}

			//渲染
			var routerResult = await routerRender(this.route,req.url);
			var renderProps = routerResult.msg;
			var html = ReactDOM.renderToString(
				<ModelProvider model={model}>
					<RoutingContext {...renderProps}/>
				</ModelProvider>
			);

			//生成stylesheet
			var style = StyleSheet.renderToString(html);

			return (
				style+
				'<div id="body">'+html+'</div>'+
				'<script>window.__INIT_STATE__='+data+'</script>'
			);
		}
	}
}

export {
	MvcServer as MvcServer
}