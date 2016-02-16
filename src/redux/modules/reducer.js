import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect} from 'redux-async-connect'

import auth from './auth';
import {reducer as form} from 'redux-form';
import bucketList from './bucketList';
import apiKeys from './api-keys';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  form,
  bucketList,
  apiKeys
});

/* multi-reducer example, for multiple same-schema reducers
export default combineReducers({
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  })
});
*/
