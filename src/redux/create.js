import {createStore as _createStore, applyMiddleware} from 'redux';
import bridgeClientMiddleware from './middleware/bridgeClientMiddleware';
import reducer from './modules/reducer';

export default function createStore(apolloClient) {
  const middleware = [
    bridgeClientMiddleware(),
    apolloClient.middleware()
  ];

  const store = _createStore(reducer(apolloClient),
    applyMiddleware(...middleware)
  );

  return store;
}
