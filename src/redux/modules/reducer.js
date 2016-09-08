import { combineReducers } from 'redux';
// import multireducer from 'multireducer';

import {reducer as formReducer} from 'redux-form';
import bucketList from './bucket-list';
import bucket from './bucket';
import billing from './billing';
import localStorage from './local-storage';

export default (apolloClient) => {
  return combineReducers({
    bucket,
    bucketList,
    billing,
    localStorage,
    form: formReducer,
    apollo: apolloClient.reducer()
  });
};

/* multi-reducer example, for multiple same-schema reducers
export default combineReducers({
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  })
});
*/
