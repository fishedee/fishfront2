export default Models.createClass({
	name:'selectedModel',
	initialize(){
		this.state = 'reactjs';
	},
	selectReddit(state){
		this.state = state;
	},
	get(){
		return this.state;
	}
});