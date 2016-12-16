const LOAD = 'storj/bucketList/LOAD';
const LOAD_SUCCESS = 'storj/bucketList/LOAD_SUCCESS';
const LOAD_FAIL = 'storj/bucketList/LOAD_FAIL';

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
        buckets: action.result,
        error: null
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        buckets: [],
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
    promise: ({bridgeClient}) => bridgeClient.getBuckets()
  };
}
