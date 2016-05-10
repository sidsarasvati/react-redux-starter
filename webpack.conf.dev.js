var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'eventsource-polyfill',                       // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),           // output path
    filename: 'bundle.js',                        // compiled single js
    publicPath: 'http://localhost:3001/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Reading List - Development',
      template: path.join(__dirname, 'assets/index-template.html')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.join(__dirname, 'src')
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loaders: ['babel'],                         // see .babelrc for babel plugins
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json/,
        loaders: ['json-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "url-loader?limit=10000"
      }
    ]
  },
};
