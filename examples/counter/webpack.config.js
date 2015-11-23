var webpack = require('webpack');

module.exports = {
    entry: './build/client.js',
    output: {
        path:'dist',
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
    plugins:[]
};