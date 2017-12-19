const webpack = require('webpack');
const path = require('path');
const ExtractTextWebPackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const ImageLoader = require('image-webpack-loader');
const DashboardPlugin = require('webpack-dashboard/plugin');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  },
  resolve: {
    extensions: ['.js','.json','.scss','.css','.png'],
    alias: {
      images: path.resolve(__dirname, 'src/assets/images'),
      style: path.resolve(__dirname, 'src/assets/stylesheets')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders:['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }]

      },
      {
        test: /\.js$/, //files ending with .js
        exclude: /node_modules/, //exclude the node modules dir
        loader: "babel-loader" // use this (babel-core) loader
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextWebPackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader','postcss-loader']
        }))
      }
    ]//end rules
  },
  plugins: [
    new ExtractTextWebPackPlugin('styles.css'),
    new DashboardPlugin()
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

