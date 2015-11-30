import ReactFetch from 'fishfront/react/react-fetch';

export default Models.createClass({
	mixins:[ReactFetch],
	name:'redditModel',
	initialize(){
		this.state = Immutable.fromJS({});
	},
	invalidateReddit(reddit){
		this.state = this.state.setIn(
			[reddit,'didInvalidate'],
			true
		);
	},
	_requestPosts(reddit){
		this.state = this.state.set(reddit,Immutable.fromJS({
			isFetching:true,
			didInvalidate:false,
			items:[]
		}));
	},
	_receivePosts(reddit,json){
		this.state = this.state.set(reddit,Immutable.fromJS({
			isFetching:false,
			didInvalidate:false,
			items:json.data.children.map(child => child.data),
			lastUpdated:Date.now()
		}));
	},
	async _fetchPosts(reddit){
		this._requestPosts(reddit);
		var response = await this.fetch(`http://www.reddit.com/r/${reddit}.json`);
		var json = await response.json();
		this._receivePosts(reddit,json);
	},
	_shouldFetchPosts(reddit){
		let hasPost = this.state.has(reddit);
		if( !hasPost )
			return true;
		let post = this.state.get(reddit);
		if( post.get('isFetching') )
			return false;
		return post.get('didInvalidate');
	},
	async fetchPostsIfNeeded(reddit){
		if( this._shouldFetchPosts(reddit) ){
			await this._fetchPosts(reddit);	
		}
	},
	get(name){
		return this.state.get(name);
	}
});