var webpack = require('webpack');

module.exports = {
  entry: './build/client.js',
  output: {
    path:'dist',
    filename: 'bundle.js'       
  },
  module:{
  },
  resolve: {
    extensions: ['','.js']
  },
  plugins:[
  ]
};