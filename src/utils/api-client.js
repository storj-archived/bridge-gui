import url from 'url';
import { KeyPair, BridgeClient as Client } from 'storj-lib';
import request from 'request';
import { hashHistory } from 'react-router';
import async from 'async';
import config from 'config';

/* isArray Pollyfill, if not present */
if (!Array.isArray) {
  Array.isArray = function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

class WrappedClient extends Client {
  constructor(uri, options) {
    super(uri, options);
  }

  _request(method, path, params, callback) {
    const opts = {
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

    const requestPromise = new Promise((resolve, reject) => {
      request(opts, (err, res, body) => {
        if (err) {
          return reject(err);
        }

        if (res.statusCode > 400) {
          window.localStorage.removeItem('privkey');
          client.removeKeyPair();
          hashHistory.push('/');
          return reject(new Error(body.error || body));
        }

        resolve(body);
      });
    });

    if (callback) requestPromise.then(callback, callback);

    return requestPromise;
  }

  resolveFileFromPointers(pointers) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      async.forEachOfLimit(pointers, 6,
        function iteratee(pointer, key, callback) {
          const uri = pointer.channel;
          const client = new WebSocket(uri);

          client.onopen = function onopen() {
            client.send(JSON.stringify({
              token: pointer.token,
              hash: pointer.hash,
              operation: pointer.operation
            }));
          };

          client.onmessage = function onmessage(event) {
            const data = event.data;
            let json = null;
            // create a multidimensional Array if Array not found at index
            chunks[key] = Array.isArray(chunks[key]) ? chunks[key] : [];
            if (typeof Blob !== 'undefined' && event.data instanceof Blob) {
              chunks[key].push(data);
            } else {
              try {
                json = JSON.parse(data);
              } catch (err) {
                return callback(err);
              }
              if (json.code && json.code !== 200) {
                return callback(new Error(json.message));
              }
            }
          };

          client.onclose = function onclose(event) {
            if (event.code > 1000) {
              return callback(new Error('Error Connecting to Farmer'));
            }
            return callback();
          };

          client.onerror = function onerror(err) {
            callback(err);
          };
        },
        function end(err) {
          if (err) {
            reject(err);
          } else {
            resolve(Array.prototype.concat.apply([], chunks));
          }
        }
      );
    });
  }
}

const client = {};

client.api = new WrappedClient(url.format({
  protocol: config.apiProtocol,
  hostname: config.apiHost,
  port: config.apiPort,
  slashes: true
}));

client.useKeyPair = (keypair) => {
  client.api._options.keypair = keypair;
};

client.createKeyPair = (privkey) => {
  const keypair = new KeyPair(privkey);
  return keypair;
};

client.removeKeyPair = () => {
  if (client.api._options.keypair) {
    delete client.api._options.keypair;
  }
};

client.useBasicAuth = (email, pass) => {
  client.api._options.basicauth = client.api._options.basicauth || {};
  client.api._options.basicauth.password = pass;
  client.api._options.basicauth.email = email;
};

client.removeBasicAuth = () => {
  if (client.api._options.basicauth) {
    delete client.api._options.basicauth;
  }
};

client.resetPassword = (options) => {
  return client.api.resetPassword(options);
};

export default client;
