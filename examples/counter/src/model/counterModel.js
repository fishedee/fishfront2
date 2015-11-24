export default Models.createClass({
	name:'counterModel',
	initialize(){
		this.state = 0;
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