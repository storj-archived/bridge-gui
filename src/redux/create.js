import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import bridgeClientMiddleware from 'redux/middleware/bridge-client-middleware';
import reducer from 'redux/modules/reducer';
import uuid from 'node-uuid';

import ApolloClient, {createNetworkInterface} from 'apollo-client';
import bridgeClientWrapper from 'utils/api-client';

export default function createStore() {
  let privkey = localStorage.getItem('privkey');
  if (privkey !== null) {
    bridgeClientWrapper.useKeyPair(bridgeClientWrapper.createKeyPair(privkey));
  }

  window.addEventListener('storage', function(event) {
    // for cross-tab state updating
    if (event.key === 'privkey') {
      if (event.oldValue && !event.newValue) {
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
  // const authenticate = (opts) => {
  //   debugger;
  //
  //   bridgeClient._authenticate(opts);
  //
  //   // var opts = {
  //   //   baseUrl: this._options.baseURI,
  //   //   uri: path,
  //   //   method: method
  //   // };
  //   //
  //   // params.__nonce = uuid.v4();
  //   //
  //   // if (['GET', 'DELETE'].indexOf(method) !== -1) {
  //   //   opts.qs = params;
  //   //   opts.json = true;
  //   // } else {
  //   //   opts.json = params;
  //   // }
  //
  //   // if (bridgeClient._options.keypair) {
  //   //   const payload = ['GET', 'DELETE'].indexOf(opts.method) !== -1 ?
  //   //     querystring.stringify(opts.qs) :
  //   //     JSON.stringify(opts.json);
  //   //
  //   //   const contract = [opts.method, opts.uri, payload].join('\n');
  //   //
  //   //   opts.headers = opts.headers || {};
  //   //   opts.headers['x-pubkey'] = bridgeClient._options.keypair.getPublicKey();
  //   //   opts.headers['x-signature'] = bridgeClient._options.keypair.sign(contract, {
  //   //     compact: false
  //   //   });
  //   // } else if (bridgeClient._options.basicauth) {
  //   //   opts.auth = {
  //   //     user: bridgeClient._options.basicauth.email,
  //   //     pass: utils.sha256(bridgeClient._options.basicauth.password, 'utf8')
  //   //   };
  //   // }
  //
  //   return opts;
  // };

  const baseUrl = 'http://localhost:6382';
  const basePath = '/graphql';
  const apolloNetworkInterface = createNetworkInterface(`${baseUrl}${basePath}`);
  apolloNetworkInterface.use([{
    applyMiddleware(req, next) {
      debugger;
      const opts = req.options;
      opts.baseUrl = baseUrl;
      opts.uri = basePath;
      opts.method = 'POST';

      req.request.__nonce = uuid.v4();

      opts.json = req.request;

      bridgeClient._authenticate(opts);
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
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return {store, apolloClient};
}
