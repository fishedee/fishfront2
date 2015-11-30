import AppView from '../view/appView';
import TodoModel from '../model/todoModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
		this.loadModel(TodoModel);
	},
	async onServerCreate(){
		await this.todoModel.fetch();
	},
	render(){
		return {
			todos:this.todoModel.get(),
			actions:this.todoModel
		}
	}
});