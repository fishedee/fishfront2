import {Mvc,Router,Route,IndexRoute} from './react-mvc';
import Model from './react-mvc/model';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import StyleSheet from './react-style';
import DocumentHead from './react-document-head-provider';

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
			//首次渲染获取数据
			var ModelProvider = Model.Provider;
			var model = new Model.Store();

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

			//二次渲染获取html
			var DocumentHeadProvider = DocumentHead.Provider;
			var documentHead = new DocumentHead.DocumentHead();

			var routerResult = await routerRender(this.route,req.url);
			var renderProps = routerResult.msg;
			var html = ReactDOM.renderToString(
				<DocumentHeadProvider documentHead={documentHead}>
					<ModelProvider model={model}>
						<RoutingContext {...renderProps}/>
					</ModelProvider>
				</DocumentHeadProvider>
			);

			//生成stylesheet
			var style = StyleSheet.renderToString(html);

			var result = (
`<!DOCTYPE>
<html>
    <head>
       	${documentHead.renderMetaString()}
       	${documentHead.renderTitleString()}
       	${documentHead.renderBaseString()}
       	${documentHead.renderLinkString()}
       	${style}
    </head>
    <body>
        <div id="body">${html}</div>
        <div id="dialog"></div>
        <script>window.__INIT_STATE__=${data}</script>
        ${documentHead.renderScriptString()}
    </body>
</html>
`
);
			resp.send(result);
		}
	}
	getMiddleware(){
		var self = this;
		var middleware = async (req,resp,next)=>{
			try{
		        await self.renderToString(req,resp);
		    }catch(e){
		        resp.status(500).send('nodejs server error');
		        console.error(e.stack);
		    }
		}
		return middleware.bind(this);
	}
}

export default MvcServer;