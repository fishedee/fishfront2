import AppController from '../controller/appController';
import IndexController from '../controller/indexController';
import PlayController from '../controller/playController';
import {Route,IndexRoute} from 'fishfront/react/react-mvc';

export default (
	<Route path="/" component={AppController}>
		<IndexRoute component={IndexController}/>
		<Route path="play" component={PlayController}/>
	</Route>
);