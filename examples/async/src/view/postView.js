export default Views.createClass({
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>{post.get('title')}</li>
        )}
      </ul>
    );
  }
});