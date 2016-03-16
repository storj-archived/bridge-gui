import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import getRoutes from './routes';

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

function addSecurityHeaders(req, res, next) {
  res.set('X-Frame-Options', 'DENY');
  res.set('Content-Security-Policy', "default-src 'self'; style-src 'unsafe-inline' 'self'; object-src 'none'; plugin-src 'none'; connect-src https://" + config.apiHost + ";")
  next();
}

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static/img/favicon', 'favicon.ico')));

app.use(addSecurityHeaders)
  .use(Express.static(path.join(__dirname, '..', 'static')));

app.use(addSecurityHeaders)
  .use((req, res) => {

    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

  /*
    function hydrateOnClient() {
      res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
    }
  */

    function hydrateOnClient() {
      res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()}/>));
    }

    if (__DISABLE_SSR__) {
      hydrateOnClient();
      return;
    }
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
