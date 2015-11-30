import AppView from '../view/appView';
import SelectedModel from '../model/selectedModel';
import RedditModel from '../model/redditModel';

export default Controllers.createClass({
	initialize(){
		this.loadView(AppView);
		this.loadModel(SelectedModel);
		this.loadModel(RedditModel);
	},
	async onServerCreate(){
		var selectedReddit = this.selectedModel.get(); 
		await this.redditModel.fetchPostsIfNeeded(selectedReddit);
	},
	render(){
		var selectedReddit = this.selectedModel.get();
		var post = this.redditModel.get(selectedReddit);
		if( post ){
			var isFetching = post.get("isFetching");
			var lastUpdated = post.get("lastUpdated");
			var posts = post.get("items"); 
		}else{
			var isFetching = true;
			var lastUpdated = null;
			var posts = Immutable.fromJS([]);
		}
		return {
			selectedReddit:selectedReddit,
			isFetching:isFetching,
			lastUpdated:lastUpdated,
			posts:posts,
			actions:{
				fetchPostsIfNeeded:this.redditModel.fetchPostsIfNeeded,
				invalidateReddit:this.redditModel.invalidateReddit,
				selectReddit:this.selectedModel.selectReddit
			}
		};
	}
});