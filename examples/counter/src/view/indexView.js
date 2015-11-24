var style = StyleSheet.create({
	body:{
		background:'yellow',
	},
	button:{
		fontSize:'16px',
		padding:'5px',
		color:'red'
	}
});
export default Views.createClass({
	onClick(){
		this.go('/play');
	},
	render(){
		return (
			<div className={style.body}>
				<button className={style.button} onClick={this.onClick}>点击开始游戏</button>
			</div>
		);
	}
});