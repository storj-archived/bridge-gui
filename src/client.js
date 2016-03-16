/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import client from 'utils/apiClient';
import { Provider } from 'react-redux';
import config from './config';
import renderRoutes from './routes';

function bootstrapClient() {
  let privkey = localStorage.getItem('privkey');
  if(privkey !== null) {
    client.useKeyPair(client.createKeyPair(privkey));
  }
  return client.api;
}

const dest = document.getElementById('content');
const store = createStore(bootstrapClient(), window.__data);

ReactDOM.render(
  <Provider store={store} key="provider">
    {renderRoutes(store)}
  </Provider>,
  dest
);

window.addEventListener('storage', function(e) {
  //for cross-tab state updating
  if(e.key === 'privkey') {
    if(e.oldValue && !e.newValue) {
      client.removeKeyPair();
    }
  }
});

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
        {renderRoutes(store)}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
*/
