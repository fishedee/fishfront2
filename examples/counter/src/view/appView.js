var style = StyleSheet.create({
	body:{
		background:'red',
	},
	text:{
		fontSize:'10px',
		color:'white'
	}
});
export default Views.createClass({
	render(){
		return (
			<div className={style.body}>
				<div className={style.text}>Hello App</div>
				{this.props.children}
			</div>
		);
	}
});
		