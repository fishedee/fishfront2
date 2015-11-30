import Header from './header';
import MainSection from './mainSection';
import DocumentHead from 'fishfront/react/react-document-head';

export default Views.createClass({
	render() {
	    return (
	      <div>
	        <DocumentHead
				meta={[
					{charset:"utf-8"},
					{name:"description",content:"Hacker News clone written in ReactJS, RefluxJS, and Firebase"},
					{name:"viewport",content:"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3"},
				]}
				link={[
					{type:"text/css",rel:"stylesheet",href:"/index.css"}
				]}
				script={[
					{src:"/bundle.js"}
				]}
			/>
	        <Header addTodo={this.props.actions.addTodo} />
	        <MainSection todos={this.props.todos} actions={this.props.actions} />
	      </div>
	    );
	}
});