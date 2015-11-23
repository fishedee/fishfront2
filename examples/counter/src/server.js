import babel from "babel-polyfill";
import express from 'express';
import {MvcServer} from 'fishfront/react/react-mvc-server';
import Route from './config/route';
import Model from './config/model';

var app = new express();
var port = 3000;
app.use(express.static('dist'));
app.use(async function(req,resp){
    try{
        var mvcServer = new MvcServer();
        mvcServer.setRoute(Route);
        mvcServer.setModel(Model);
        var result = await mvcServer.renderToString(req,resp);
        if( result == null )
            return;
        resp.send(renderFullPage(result));
    }catch(e){
        resp.status(500).send('inner error');
        console.error(e.stack);
    }
});

function renderFullPage(html){
    return (
`<!doctype html>
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
    );
}

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
