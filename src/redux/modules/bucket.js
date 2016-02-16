const LOAD = 'metadisk-gui/bucket/LOAD';
const LOAD_SUCCESS = 'metadisk-gui/bucket/LOAD_SUCCESS';
const LOAD_FAIL = 'metadisk-gui/bucket/LOAD_FAIL';

const CREATE = 'metadisk-gui/bucket/CREATE';
const CREATE_SUCCESS = 'metadisk-gui/bucket/CREATE_SUCCESS';
const CREATE_FAIL = 'metadisk-gui/bucket/CREATE_FAIL';

const UPDATE = 'metadisk-gui/bucket/UPDATE';
const UPDATE_SUCCESS = 'metadisk-gui/bucket/UPDATE_SUCCESS';
const UPDATE_FAIL = 'metadisk-gui/bucket/UPDATE_FAIL';

function Bucket(state = {}, action = {}) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_SUCCESS:
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

    case CREATE:
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case CREATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CREATE_SUCCESS:
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

    case UPDATE:
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case UPDATE_SUCCESS:
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

export function load(bucketId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.getBucketById(bucketId)
  };
}

export function create(bucket) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.createBucket(bucket)
  };
}

export function update(bucket) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.updateBucketById(bucket.id, {
      storage  : bucket.storage,
      transfer : bucket.transfer,
      name     : bucket.name,
      pubkeys  : bucket.pubkeys
    })
  };
}
