import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';

export default function createStore(client, data) {
  const middleware = [createMiddleware(client)];

  let finalCreateStore;
//  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/index');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
//  } else {
//    finalCreateStore = applyMiddleware(...middleware)(_createStore);
//  }

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);

  return store;
}
