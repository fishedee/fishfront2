import Env from '../../runtime/env';

function createClass(proto){
	proto.getInitialState = function(){
		if( this.context.serverHandler ){
			this.context.serverHandler.push({
				onServerCreate:this.onServerCreate,
				onServerDestroy:this.onServerDestroy,
			});
		}

		for( var i in this.context.model )
			this[i] = this.context.model[i];
		return {};
	}
	proto.componentDidMount = function(){
		if( this.onCreate )
			this.onCreate();
	}
	proto.componentWillUnmount = function(){
		if( this.onDestroy )
			this.onDestroy();
	}
	proto.contextTypes = {
        model: React.PropTypes.object.isRequired,
        serverHandler: React.PropTypes.array,
    }
	return React.createClass(proto);
}

var Controllers = {
	createClass:createClass
};

Env.exportGlobal('Controllers',Controllers);
export default Controllers;