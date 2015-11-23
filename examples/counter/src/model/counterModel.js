export default Models.createClass({
	getInitialState(){
		return 0;
	},
	async fetch(){
		this.state = Math.floor(Math.random()*10);
	},
	asc(){
		this.state++;
	},
	desc(){
		this.state--;
	},
	get(){
		return this.state;
	}
});