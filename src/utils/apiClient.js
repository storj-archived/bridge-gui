import {KeyPair, Client} from 'metadisk-client';
var request = require('request');
import {hashHistory} from 'react-router';

class WrappedClient extends Client {
  constructor(uri, options) {
    super(uri, options);
  }

  _request(method, path, params, stream) {
    var opts = {
      baseUrl: this._options.baseURI,
      uri: path,
      method: method
    };

    params.__nonce = Date.now();

    if (['GET', 'DELETE'].indexOf(method) !== -1) {
      opts.qs = params;
      opts.json = true;
    } else {
      opts.json = params;
    }

    this._authenticate(opts);

    if (stream) {
      return request(opts);
    }

    return new Promise(function(resolve, reject) {
      request(opts, function(err, res, body) {
        if (err) {
          return reject(err);
        }

        if (res.statusCode >= 400) {
          window.localStorage.removeItem('privkey');
          client.removeKeyPair();
          hashHistory.push('/');
          return reject(new Error(body.error || body));
        }

        resolve(body);
      });
    });
  }
}

const client = {};

client.api = new WrappedClient();

client.useKeyPair = (keypair) => {
  client.api._options.keypair = keypair;
};

client.createKeyPair = (privkey) => {
  var keypair = new KeyPair(privkey);
  return keypair;
};

client.removeKeyPair = () => {
  if(client.api._options.keypair) {
    delete client.api._options.keypair;
  }
};

client.useBasicAuth = (email, pass) => {
  client.api._options.basicauth = client.api._options.basicauth || {};
  client.api._options.basicauth.password = pass;
  client.api._options.basicauth.email = email;
};

client.removeBasicAuth = () => {
  if(client.api._options.basicauth) {
    delete client.api._options.basicauth;
  }
};

export default client;
