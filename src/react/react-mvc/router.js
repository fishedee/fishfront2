import Url from '../../encoding/url';

export default class Router{
	constructor(){
		this.router = null;
	}
	setRouter(router){
		this.router = router;
	}
	_defaultRouter(url){
		var router = this.router;
		var urlInfo = Url.toInfo(url).originpathname.substr(1);
		for( var i in router){
			var regeExpString = i;
			regeExpString = regeExpString.replace('(:num)','[0-9]+');
			regeExpString = regeExpString.replace('(:any)','[^\/]+');
			regeExpString = '^'+regeExpString+'$';
			var regexp = new RegExp(regeExpString);
			if( regexp.test(urlInfo) ){
				return router[i];
			}
		}
		if( router.hasOwnProperty('404') ){
			console.log('找不到合适的router '+url+','+urlInfo);
			return router['404'];
		}else{
			throw new Error('找不到合适的router '+url+','+urlInfo);
		}
	}
	route(url){
		if( !this.router ){
			throw new Error("没有设置router，无法执行");
			return;
		}
		if( typeof this.router == 'function' ){
			return this.router(url);
		}
		return this._defaultRouter(url);
	}
}