import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from 'helpers/html';
import PrettyError from 'pretty-error';
import http from 'http';
import config from 'config';

import getRoutes from 'routes';

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

function addSecurityHeaders(req, res, next) {
  res.set('X-Frame-Options', 'DENY');
  res.set('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' https://js.stripe.com",
    "style-src 'unsafe-inline' 'self'",
    "object-src 'none'",
    "connect-src *",
    "frame-src https://js.stripe.com https://storj.github.io",
    "child-src https://js.stripe.com https://storj.github.io",
    "img-src 'self' https://q.stripe.com"
  ].join("; "));
  next();
}

function httpToHttpsRedirect(req, res, next) {
  if (req.protocol !== 'https' && config.httpsRedirect) {
    res.redirect('https://' + req.hostname + req.url);
  } else {
    next();
  }
}

app.use(compression())
  .use(httpToHttpsRedirect)
  .use(favicon(path.join(__dirname, '..', 'static/img/favicon', 'favicon.ico')))
  .use(addSecurityHeaders)
  .use(Express.static(path.join(__dirname, '..', 'static')))
  .get('/', addSecurityHeaders, (req, res) => {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={global.assets}/>));
  })
  .get('*', (req, res) => {
    res.status(404).redirect('/#/404');
  });

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
