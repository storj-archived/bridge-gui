const { Bucket } from './bucketList'

const LOAD = 'metadisk-gui/bucketList/LOAD';
const LOAD_SUCCESS = 'metadisk-gui/bucketList/LOAD_SUCCESS';
const LOAD_FAIL = 'metadisk-gui/bucketList/LOAD_FAIL';

const DEL = 'metadisk-gui/bucketList/DELETE';
const DEL_SUCCESS = 'metadisk-gui/bucketList/DELETE_SUCCESS';
const DEL_FAIL = 'metadisk-gui/bucketList/DELETE_FAIL';

export default function BucketList(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.buckets && globalState.buckets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.getBuckets()
  };
}

export function del(bucketId) {
  return {
    types: [DEL, DEL_SUCCESS, DEL_FAIL],
    promise: (client) => client.destroyBucketById(bucketId)
  };
}
