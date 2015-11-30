import AppController from '../controller/appController';
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
	<Route path="/" getComponent={asyncLoader(AppController)}/>
);