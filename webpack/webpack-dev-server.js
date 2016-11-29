import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import Html from '../src/helpers/html';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Express from 'express';
import config from '../src/config';
import webpackConfig from './dev.config';
import { graphiqlExpress } from 'apollo-server';

const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = (config.port + 1) || 3001;
const serverOptions = {
  contentBase: '../src/',
  quiet: false,
  noInfo: true,
  hot: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: { colors: true }
};

const WDS = new WebpackDevServer(compiler, serverOptions);
const app = WDS.app;

const addSecurityHeaders = (req, res, next) => {
  res.set('X-Frame-Options', 'DENY');
  // res.set('Content-Security-Policy', "default-src 'self'; style-src 'unsafe-inline' 'self'; object-src 'none'; connect-src *; frame-src https://storj.github.io;");
  next();
};

app
  .use(favicon(path.join(__dirname, '..', 'static/img/favicon', 'favicon.ico')))
  .use(addSecurityHeaders)
  .use(Express.static(path.join(__dirname, '..', 'static')))
  .get('/', function (req, res, next) {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(React.createElement(Html, {
        assets: {
          js: '/dist/main.js',
          css: '/dist/main.css'
        }
      })));
  });

app.use('/graphiql', function(req, res, next) {
  res.removeHeader('Content-Security-Policy');
  graphiqlExpress({
    endpointURL: 'http://localhost:3000/graphql'
  })(req, res, next);
});

app.get('*', (req, res) => {
    res.status(404).redirect('/#/404');
  });

WDS.listen(port, host, function (err) {
  if (err) {
    return console.log(err);
  }

  console.info('==> 🚧  Webpack development server listening on port %s', port);
});
