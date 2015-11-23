export default Views.createClass({
	onAsc(){
		this.action('asc');
	},
	onDec(){
		this.action('dec');
	},
	render(){
		return (
			<div>
				<div>{this.props.counter}</div>
				<button onClick={this.onAsc}>增加</button>
				<button onClick={this.onDec}>减少</button>
			</div>
		);
	}
});