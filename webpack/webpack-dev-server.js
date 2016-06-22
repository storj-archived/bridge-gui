require('../server.babel');

var React = require('react');
var ReactDOM = require('react-dom/server');
var Html = require('../src/helpers/Html');

var Express = require('express');
var webpack = require('webpack');

var config = require('../src/config');
var webpackConfig = require('./dev.config');
var compiler = webpack(webpackConfig);

var host = config.host || 'localhost';
var port = (config.port + 1) || 3001;
var serverOptions = {
  contentBase: '../src/',
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

// var app = new Express();

var WebpackDevServer = require('webpack-dev-server');
var wds = new WebpackDevServer(compiler, serverOptions);
var app = wds.app;

app.get('/', function (req, res, next) {
  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(React.createElement(Html, {
      assets: {
        javascript: {main: '/dist/main.js'},
        styles: {main: '/dist/main.css'}
      }
    })));
});

wds.listen(port, 'localhost', function (err) {
  if (err) {
    return console.log(err);
  }

  console.info('==> 🚧  Webpack development server listening on port %s', port);
});
