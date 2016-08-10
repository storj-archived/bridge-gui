import {createStore as _createStore, applyMiddleware} from 'redux';
import bridgeClientMiddleware from './middleware/bridgeClientMiddleware';
import reducer from './modules/reducer';

import ApolloClient, {createNetworkInterface} from 'apollo-client';
import bridgeClientWrapper from 'utils/apiClient';

export default function createStore() {
  let privkey = localStorage.getItem('privkey');
  if (privkey !== null) {
    bridgeClientWrapper.useKeyPair(bridgeClientWrapper.createKeyPair(privkey));
  }

  window.addEventListener('storage', function(e) {
    // for cross-tab state updating
    if (e.key === 'privkey') {
      if (e.oldValue && !e.newValue) {
        bridgeClientWrapper.removeKeyPair();
      }
    }
  });

  const bridgeClient = bridgeClientWrapper.api;

  /**
   * Adds authentication headers to request object
   * @private
   * @param {Object} opts - Options parameter passed to request
   * @return {Object}
   */
  const authenticate = (opts) => {
    if (bridgeClient.keypair) {
      const payload = ['GET', 'DELETE'].indexOf(opts.method) !== -1 ?
        querystring.stringify(opts.qs) :
        JSON.stringify(opts.json);

      const contract = [opts.method, opts.uri, payload].join('\n');

      opts.headers = opts.headers || {};
      opts.headers['x-pubkey'] = bridgeClient.keypair.getPublicKey();
      opts.headers['x-signature'] = bridgeClient.keypair.sign(contract, {
        compact: false
      });
    } else if (bridgeClient.basicauth) {
      opts.auth = {
        user: bridgeClient.basicauth.email,
        pass: utils.sha256(bridgeClient.basicauth.password, 'utf8')
      };
    }

    return opts;
  };

  const apolloNetworkInterface = createNetworkInterface('http://localhost:6382/graphql');
  apolloNetworkInterface.use([{
    applyMiddleware(req, next) {
      // req.options.neaders
      authenticate(req.options);
      next();
    }
  }]);

  const apolloClient = new ApolloClient({
    networkInterface: apolloNetworkInterface
  });

  const middleware = [
    bridgeClientMiddleware({bridgeClient, apolloClient}),
    apolloClient.middleware()
  ];

  const store = _createStore(reducer(apolloClient),
    applyMiddleware(...middleware)
  );

  return {store, apolloClient};
}
