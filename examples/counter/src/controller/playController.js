import PlayView from '../view/playView';
import CounterModel from '../model/counterModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(PlayView);
		this.loadModel(CounterModel);
	},
	async onServerCreate(){
		await this.counterModel.fetch();
	},
	render(){
		return {
			counter:this.counterModel.get(),
			onAsc:this.counterModel.asc,
			onDesc:this.counterModel.desc
		};
	}
});