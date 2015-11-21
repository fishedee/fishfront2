export default Views.createClass({
	onClick(){
		this.go('/play');
	},
	render(){
		return (
			<div>
				<button onClick={this.onClick}>点击开始游戏</button>
			</div>
		);
	}
});