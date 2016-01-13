import DS from 'ember-data';
import {APP} from './config/environment';

// TODO: implement request signature logic here
export default DS.RESTAdapter.extend({
  host: APP.api.protocol + '//' + APP.api.host + ':' + APP.api.port,
  headers: {

  }
});
