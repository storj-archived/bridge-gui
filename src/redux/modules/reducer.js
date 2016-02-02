import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import buckets from './buckets';
import apiKeys from './api-keys';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  buckets,
  apiKeys
});

/* multi-reducer example
export default combineReducers({
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  })
});
*/
