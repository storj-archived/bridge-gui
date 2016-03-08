/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import {Client as MetadiskClient} from 'metadisk-client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import config from './config';

import getRoutes from './routes';

let client = new MetadiskClient();

const dest = document.getElementById('content');
const store = createStore(client, window.__data);

ReactDOM.render(
  <Provider store={store} key="provider">
    {getRoutes(store)}
  </Provider>,
  dest
);
/*
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
*/
/*
//if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {getRoutes(store)}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
*/
