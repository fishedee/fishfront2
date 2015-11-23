export default Views.createClass({
	render(){
		return (
			<div>
				<div>{this.props.counter}</div>
				<button onClick={this.props.onAsc}>增加</button>
				<button onClick={this.props.onDesc}>减少</button>
			</div>
		);
	}
});