import babel from "babel-polyfill";
import express from 'express';
import MvcServer from 'fishfront/react/react-mvc-server';
import Route from './config/route';

var mvcServer = new MvcServer();
mvcServer.setRoute(Route);

var app = new express();
var port = 3000;
app.use(express.static('dist'));
app.use(mvcServer.getMiddleware());

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
