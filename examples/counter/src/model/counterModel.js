export default Models.createClass({
	initialize(){
		this.state = Math.floor(Math.random()*10);
	},
	asc(){
		this.state++;
	},
	dec(){
		this.state--;
	},
	get(){
		return this.state;
	}
});