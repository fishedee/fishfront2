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
				<button onClick={this.asc}>增加</button>
				<button onClick={this.dec}>减少</button>
			</div>
		);
	}
});