export default Views.createClass({
	render(){
		return (
			<div>
				<div>Hello App</div>
				{this.props.children}
			</div>
		);
	}
});
		