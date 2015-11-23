export default Controllers.createClass({
	render(){
		return (
		<div>
			<div>Hello App</div>
			{this.props.children}
		</div>
		);
	}
});