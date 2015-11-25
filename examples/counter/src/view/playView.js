import DocumentHead from 'fishfront/react/react-document-head';

var style = StyleSheet.create({
	button:{
		fontSize:'10px',
		background:'green'
	}
});
export default Views.createClass({
	render(){
		return (
			<div>
				<DocumentHead title={"游戏页"}/>
				<div>{this.props.counter}</div>
				<button className={style.button} onClick={this.props.onAsc}>增加</button>
				<button className={style.button} onClick={this.props.onDesc}>减少</button>
			</div>
		);
	}
});