import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import createStore from './redux/create';
import { Client as MetadiskClient } from 'metadisk-client';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

function applyMiddleware(req, res, next) {
  res.set('X-Frame-Options', 'DENY');
  res.set('Content-Security-Policy', "default-src 'self'; style-src 'unsafe-inline' 'self'; object-src 'none'; plugin-src 'none'; connect-src https://" + config.apiHost + ";")
  next();
}

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static/img/favicon', 'favicon.ico')));

app.use(applyMiddleware)
  .use(Express.static(path.join(__dirname, '..', 'static')));

app.use(applyMiddleware)
  .use((req, res) => {
    //Keep to prevent click-jacking; if IFrame required, set origin explicitly
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    let client = new MetadiskClient();

  //  const store = createStore(client);
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

    store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (!routerState) {
        res.status(500);
        hydrateOnClient();
      } else {
        // Workaround redux-router query string issue:
        // https://github.com/rackt/redux-router/issues/106
        if (routerState.location.search && !routerState.location.query) {
          routerState.location.query = qs.parse(routerState.location.search);
        }

        store.getState().router.then(() => {
          const component = (
            <Provider store={store} key="provider">
              <ReduxRouter/>
            </Provider>
          );

          const status = getStatusFromRoutes(routerState.routes);
          if (status) {
            res.status(status);
          }
          res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
        }).catch((err) => {
          console.error('DATA FETCHING ERROR:', pretty.render(err));
          res.status(500);
          hydrateOnClient();
        });
      }
    }));
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
