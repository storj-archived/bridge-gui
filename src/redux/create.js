import {
  createStore as _createStore,
  applyMiddleware,
  compose
} from 'redux';
import bridgeClientMiddleware from 'redux/middleware/bridge-client-middleware';
import reducer from 'redux/modules/reducer';
import uuid from 'node-uuid';
import { print as graphqlTagPrint } from 'graphql-tag/printer';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import bridgeClientWrapper from 'utils/api-client';

// NB: for testing only
window.wrappedBridgeClient = bridgeClientWrapper;

export default function createStore() {
  const privkey = localStorage.getItem('privkey');
  if (privkey !== null) {
    const newKeyPair = bridgeClientWrapper.createKeyPair(privkey);
    bridgeClientWrapper.useKeyPair(newKeyPair);
  }

  window.addEventListener('storage', function storageListener(event) {
    // for cross-tab state updating
    if (event.key === 'privkey') {
      if (event.oldValue && !event.newValue) {
        bridgeClientWrapper.removeKeyPair();
      }
    }
  });

  const bridgeClient = bridgeClientWrapper.api;

  const baseUrl = process.env.APOLLO_CLIENT_URL || 'http://localhost:3000';
  const basePath = '/graphql';
  const apolloNetworkInterface =
    createNetworkInterface(`${baseUrl}${basePath}`);
  apolloNetworkInterface.use([{
    applyMiddleware(req, next) {
      const opts = req.options;
      opts.baseUrl = baseUrl;
      opts.uri = basePath;
      opts.method = 'POST';

      // Add `__nonce` param to request body
      req.request.__nonce = uuid.v4();

      // Copy by value so we can `print` the query
      opts.json = {...req.request};
      opts.json.query = graphqlTagPrint(opts.json.query);

      bridgeClient._authenticate(opts);
      next();
    }
  }]);

  const apolloClient = new ApolloClient({
    // shouldBatch: true,
    networkInterface: apolloNetworkInterface
  });

  const middleware = [
    bridgeClientMiddleware({ bridgeClient, apolloClient }),
    apolloClient.middleware()
  ];

  const store = _createStore(reducer(apolloClient),
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : func => func
    )
  );

  return { store, apolloClient };
}
