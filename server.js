var path = require('path');
var express = require('express');
var webpack = require('webpack');
var request = require('request');
var config = require('./webpack.conf.dev');

var app = express();
var compiler = webpack(config);

var serverPort = process.env.PORT || 3001;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(serverPort, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${serverPort}`);
});
