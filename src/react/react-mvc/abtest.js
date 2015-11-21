import Url from '../../encoding/url';

export default class Abtest{
	constructor(){
		this.abTest = null;
		this.random = Math.random();
	}
	setAbTest(abTest){
		this.abTest = abTest;
	}
	_defaultAbTest(url){
		var router = this.abTest;
		function mapRouter(url){
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
			return null;
		}
		function mapUrl(originUrl,abTestUrl){
			var segment1 = abTestUrl.split('/')[0];
			var urlInfo = Url.toInfo( originUrl );
			urlInfo.pathname[0] = segment1;
			return Url.fromInfo( urlInfo );
		}
		function mapRand(abTest){
			var sum = 0;
			var lastUrl;
			for( var url in abTest ){
				sum += abTest[url];
				if( random <  sum )
					return url;
				lastUrl = url;
			}
			return lastUrl;

		}
		var abTest = mapRouter( url );
		if( abTest == null )
			return url;

		var abTestRouter = mapRand( abTest );
		return mapUrl(url,abTestRouter);
	}
	abTest(url){
		if( !this.abTest ){
			return url;
		}else if( typeof this.abTest == 'function' ){
			return this.abTest(url);
		}else{
			return this._defaultAbTest(url);
		}
	}
}