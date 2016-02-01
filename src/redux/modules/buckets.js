const LOAD = 'metadisk-gui/buckets/LOAD';
const LOAD_SUCCESS = 'metadisk-gui/buckets/LOAD_SUCCESS';
const LOAD_FAIL = 'metadisk-gui/buckets/LOAD_FAIL';

const SAVE = 'metadisk-gui/buckets/SAVE';
const SAVE_SUCCESS = 'metadisk-gui/buckets/SAVE_SUCCESS';
const SAVE_FAIL = 'metadisk-gui/buckets/SAVE_FAIL';

const UPDATE = 'metadisk-gui/buckets/UPDATE';
const UPDATE_SUCCESS = 'metadisk-gui/buckets/UPDATE_SUCCESS';
const UPDATE_FAIL = 'metadisk-gui/buckets/UPDATE_FAIL';

const DEL = 'metadisk-gui/buckets/DELETE';
const DEL_SUCCESS = 'metadisk-gui/buckets/DELETE_SUCCESS';
const DEL_FAIL = 'metadisk-gui/buckets/DELETE_FAIL';

const initialState = {
  loaded: false,
  saveError: {},
  id: 0,
  storage: 10,
  transfer: 30,
  status: 'Active',
  name: 'Free Bucket'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
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

    case SAVE:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case SAVE_SUCCESS:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case SAVE_FAIL:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case UPDATE:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case UPDATE_FAIL:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case DEL:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case DEL_SUCCESS:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case DEL_FAIL:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          [action._id]: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
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
    promise: (client) => client.get('/bucket/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(bucket) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: bucket.id,
    promise: (client) => client.post('/bucket', {
      data: bucket
    })
  };
}

export function update(bucket) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    id: bucket.id,
    promise: (client) => client.put('/bucket', {
      data: bucket
    })
  };
}

export function del(bucket) {
  return {
    types: [DEL, DEL_SUCCESS, DEL_FAIL],
    id: bucket.id,
    promise: (client) => client.del('/bucket', {
      data: bucket
    })
  };
}
