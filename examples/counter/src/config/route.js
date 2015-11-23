import AppController from '../controller/appController';
import IndexController from '../controller/indexController';
import PlayController from '../controller/playController';
import {Route,IndexRoute} from 'fishfront/react/react-mvc';
import Env from 'fishfront/runtime/env';

function asyncLoader(moduleLoader){
	if( Env.isInBrowser() ){
		return (location,cb)=>{
			moduleLoader((result)=>{cb(null,result.default)});
		}
	}else{
		return (location,cb)=>{
			cb(null,moduleLoader);
		}
	}
}

export default (
	<Route path="/" getComponent={asyncLoader(AppController)}>
		<IndexRoute getComponent={asyncLoader(IndexController)}/>
		<Route path="play" getComponent={asyncLoader(PlayController)}/>
	</Route>
);