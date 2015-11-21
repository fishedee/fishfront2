import Mvc from './react-mvc';
import Model from './react-mvc/model';
import ReactDOM from 'react-dom/server';

class MvcServer extends Mvc{
	async renderToString(url){
		var RootViewClass = this.getRootViewClass();
		var controller = this.createTop(url,this.pageStackCounter-1);
		await controller.onServerCreateInner();
		var html = ReactDOM.renderToString(<RootViewClass controller={controller}/>);
		await controller.onServerDestroyInner();
		var data = Model.serialize(this);
		Model.destroy(this);
		return '<div id="body">'+html+'</div>'+
		'<script>window.__INIT_STATE__='+data+'</script>';
	}
}

export default MvcServer;