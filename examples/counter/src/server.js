import babel from "babel-polyfill";
import express from 'express';
import Mvc from 'fishfront/react/react-mvc-server';
import Router from './config/router';

var app = new express();
var port = 3000;
app.use(express.static('dist'));
app.use(async function(req,resp,next){
	try{
		var mvc = new Mvc();
		mvc.setRouter(Router);
		var html = await mvc.renderToString(req.url);
		var result = renderPage(html);
		resp.send(result);
	}catch(e){
		console.log(e.stack);
		resp.send('404 not found');
	}
});

function renderPage(html){
	return `<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>tiny flux</title>
        <meta name="description" content="Hacker News clone written in ReactJS, RefluxJS, and Firebase">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3">
    </head>
    <body>
    	${html}
        <script src="/bundle.js"></script>
    </body>
</html>
`
}

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
