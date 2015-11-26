import DocumentHead from 'fishfront/react/react-document-head';

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
				<DocumentHead
					meta={[
						{charset:"utf-8"},
						{name:"description",content:"Hacker News clone written in ReactJS, RefluxJS, and Firebase"},
						{name:"viewport",content:"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3"},
					]}
					script={[
						{src:"/bundle.js"}
					]}
				/>
				<div className={style.text}>Hello App</div>
				{this.props.children}
			</div>
		);
	}
});
		