const LOAD_BY_ID = 'metadisk-gui/buckets/LOAD_BY_ID';
const LOAD_BY_ID_SUCCESS = 'metadisk-gui/buckets/LOAD_BY_ID_SUCCESS';
const LOAD_BY_ID_FAIL = 'metadisk-gui/buckets/LOAD_BY_ID_FAIL';

const LOAD_BY_USER = 'metadisk-gui/buckets/LOAD_BY_USER';
const LOAD_BY_USER_SUCCESS = 'metadisk-gui/buckets/LOAD_BY_USER_SUCCESS';
const LOAD_BY_USER_FAIL = 'metadisk-gui/buckets/LOAD_BY_USER_FAIL';

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
  /* Keys for reference, no default state for a list of buckets
  loaded: false,
  saveError: {},
  id: 0,
  storage: 10,
  transfer: 30,
  status: 'Active',
  name: 'Free Bucket',
  user: 0,
  pubkeys: 0
  */
};

export default function BucketList(state = initialState, action = {}) {
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

function Bucket(state = {}, action = {}) {
  switch(action.type) {
    case ADD_BUCKET:
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case ADD_BUCKET_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_BUCKET_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        id: action.data.id,
        storage: action.data.storage,
        transfer: action.data.transfer,
        status: action.data.status,
        name: action.data.name,
        user: action.data.user,
        pubkeys: action.data.pubkeys
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.buckets && globalState.buckets.loaded;
}

export function loadById() {
  return {
    types: [LOAD_BY_ID, LOAD_BY_ID_SUCCESS, LOAD_BY_ID_FAIL],
    promise: (client) => client.get('/bucket/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function loadByUser() {
  return {
    types: [LOAD_BY_USER, LOAD_BY_USER_SUCCESS, LOAD_BY_USER_FAIL],
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
