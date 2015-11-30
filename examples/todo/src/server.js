import babel from 'babel-polyfill';
import MvcServer from 'fishfront/react/react-mvc-server';
import WebpackConfig from '../webpack.config'; 

var route = __dirname +'/config/route';

var mvcServer = new MvcServer();
mvcServer.setWebPackConfig(WebpackConfig);
mvcServer.setRoute(route);
mvcServer.setPort(3000);
mvcServer.setStaticDir(__dirname+'/public');
mvcServer.setDevelopment(true);
mvcServer.run();