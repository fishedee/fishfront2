import Url from '../../encoding/url';

export default function(url){
	var result = {};
	result.getSegment = function(index){
		var pathname = Url.toInfo(url).pathname;
		if( index >= pathname.length || index < 0 )
			return null;
		return pathname[index];
	}
	result.getQueryArgv = function(name){
		var search = Url.toInfo(url).search;
		if( search[name] )
			return search[name];
		else
			return null; 
	},
	result.getHashArgv = function( name ){
		var hash = Url.toInfo(url).hash;
		if( hash[name] )
			return hash[name];
		else
			return null; 
	}
	return result;
}