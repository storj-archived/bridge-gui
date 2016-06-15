import {KeyPair, BridgeClient as Client} from 'storj';
import request from 'request';
import {hashHistory} from 'react-router';
import async from 'async';
import config from '../config.js';

/* isArray Pollyfill, if not present */
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}


class WrappedClient extends Client {
  constructor(uri, options) {
    super(uri, options);
  };

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

        if (res.statusCode > 400) {
          window.localStorage.removeItem('privkey');
          client.removeKeyPair();
          hashHistory.push('/');
          return reject(new Error(body.error || body));
        }

        resolve(body);
      });
    });
  };

  resolveFileFromPointers(pointers) {
    var iteration = 0;
    var chunks = [];
    var self = this;
    return new Promise(function(resolve, reject) {
      async.forEachOfLimit(pointers, 6,
        function iteratee(pointer, key, callback) {
          let uri = pointer.channel;
          let client = new WebSocket(uri);

          client.onopen = function() {
            client.send(JSON.stringify({
              token: pointer.token,
              hash: pointer.hash,
              operation: pointer.operation
            }));
          };

          client.onmessage = function(e) {
            var json = null;
            var data = e.data;
            //create a multidimensional Array if Array not found at index
            chunks[key] = Array.isArray(chunks[key]) ? chunks[key] : [];
            if(typeof Blob !== 'undefined' && e.data instanceof Blob) {
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

          client.onclose = function(e) {
            if(e.code>1000) {
              return callback(new Error("Error Connecting to Farmer"));
            }
            return callback();
          };

          client.onerror = function(err) {
            callback(err);
          };
        },
        function end(err) {
          if(err) {
            reject(err);
          } else {
            resolve(Array.prototype.concat.apply([], chunks));
          }
        }
      );
    });
  };
};

const client = {};

client.api = new WrappedClient('https://' + config.apiHost);

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
