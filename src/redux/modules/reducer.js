import { combineReducers } from 'redux';
// import multireducer from 'multireducer';

import {reducer as formReducer} from 'redux-form';
import bucketList from './bucketList';
import bucket from './bucket';

export default combineReducers({
  bucket,
  bucketList,
  form: formReducer
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
