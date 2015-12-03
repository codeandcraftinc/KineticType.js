var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: './dist',
    filename: 'kinetic.js',
    library: 'Kinetic',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};
