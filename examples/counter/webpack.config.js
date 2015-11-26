var webpack = require('webpack');

module.exports = {
    context:__dirname,
    entry: './build/client.js',
    output: {
        path:__dirname,
        publicPath: '/',
        filename: 'bundle.js'       
    },
    module:{
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /Controller\.js$/, loader: "bundle?lazy" }
        ]
    },
    resolve: {
        extensions: ['','.js']
    },
    plugins:[
        new webpack.OldWatchingPlugin()
    ]
};
