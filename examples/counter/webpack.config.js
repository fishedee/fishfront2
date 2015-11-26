var webpack = require('webpack');

module.exports = {
    context:__dirname,
    entry: './src/client.js',
    output: {
        path:__dirname,
        publicPath: '/',
        filename: 'bundle.js'       
    },
    module:{
        loaders: [
            { test: /\.js$/ , exclude:/node_modules/,loader:"babel?cacheDirectory"},
            { test: /\.css$/, loader: "style!css" },
            { test: /Controller\.js$/, loader: "bundle?lazy!babel?cacheDirectory" }
        ]
    },
    resolve: {
        extensions: ['','.js']
    },
    plugins:[
        new webpack.OldWatchingPlugin()
    ]
};
