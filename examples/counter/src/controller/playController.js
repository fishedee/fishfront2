import playView from '../view/playView';
import counterModel from '../model/counterModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(playView);
		this.loadModel(counterModel,'counterModel');
	},
	asc(){
		this.counterModel.asc();
	},
	dec(){
		this.counterModel.dec();
	},
	render(){
		return {
			counter:this.counterModel.get()
		};
	}
});