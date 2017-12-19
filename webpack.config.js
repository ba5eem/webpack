const webpack = require('webpack');

let config = {
  entry: './index.js',
  output: {
    filename: 'output.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, //files ending with .js
        exclude: /node_modules/, //exclude the node modules dir
        loader: "babel-loader" // use this (babel-core) loader
      }
    ]
  }
}

module.exports = config;

