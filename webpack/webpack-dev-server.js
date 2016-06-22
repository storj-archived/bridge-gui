// import '../server.babel';

import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../src/helpers/Html';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Express from 'express';
import config from '../src/config';
import webpackConfig from './dev.config';

const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = (config.port + 1) || 3001;
const serverOptions = {
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

const WDS = new WebpackDevServer(compiler, serverOptions);
const app = WDS.app;

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.get('/', function (req, res, next) {
  res.send('<!doctype html>\n' +
    ReactDOM.renderToString(React.createElement(Html, {
      assets: {
        javascript: {main: '/dist/main.js'},
        styles: {main: '/dist/main.css'}
      }
    })));
});

//-- TODO: replicate prod express config
// app.get('*', function(req, res, next){
//
// });

WDS.listen(port, 'localhost', function (err) {
  if (err) {
    return console.log(err);
  }

  console.info('==> 🚧  Webpack development server listening on port %s', port);
});
