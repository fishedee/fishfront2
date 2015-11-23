import PlayView from '../view/playView';

export default Controllers.createClass({
	async onServerCreate(){
		await this.counterModel.fetch();
	},
	render(){
		return (
			<PlayView 
				counter={this.counterModel.get()}
				onAsc={this.counterModel.asc}
				onDesc={this.counterModel.desc}
			/>
		);
	}
});