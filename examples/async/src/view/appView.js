import Picker from './pickerView';
import Posts from './postView';
import DocumentHead from 'fishfront/react/react-document-head';

export default Views.createClass({
  componentDidMount() {
    const { actions, selectedReddit } = this.props
   	actions.fetchPostsIfNeeded(selectedReddit)
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { actions, selectedReddit } = nextProps
      actions.fetchPostsIfNeeded(selectedReddit)
    }
  },

  handleChange(nextReddit) {
    this.props.actions.selectReddit(nextReddit)
  },

  handleRefreshClick(e) {
    e.preventDefault()

    const { actions, selectedReddit } = this.props
    actions.invalidateReddit(selectedReddit)
    actions.fetchPostsIfNeeded(selectedReddit)
  },

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
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
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.size === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.size === 0 &&
          <h2>Empty.</h2>
        }
        {posts.size > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
});