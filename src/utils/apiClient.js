import {KeyPair, Client} from 'metadisk-client';
const client = {};

client.api = new Client();

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
