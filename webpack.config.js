const webpack = require('webpack');
const path = require('path');
const ExtractTextWebPackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, //files ending with .js
        exclude: /node_modules/, //exclude the node modules dir
        loader: "babel-loader" // use this (babel-core) loader
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebPackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      }
    ]//end rules
  },
  plugins: [
    new ExtractTextWebPackPlugin('styles.css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open:true
  },
  devtool: 'eval-source-map'
}

module.exports = config;

if(process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets()
  );
}

