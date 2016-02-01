const LOADLIST = 'metadisk-gui/buckets/LOADLIST';
const LOADLIST_SUCCESS = 'metadisk-gui/buckets/LOADLIST_SUCCESS';
const LOADLIST_FAIL = 'metadisk-gui/buckets/LOADLIST_FAIL';

const LOAD = 'metadisk-gui/buckets/LOAD';
const LOAD_SUCCESS = 'metadisk-gui/buckets/LOAD_SUCCESS';
const LOAD_FAIL = 'metadisk-gui/buckets/LOAD_FAIL';

const SAVE = 'metadisk-gui/buckets/SAVE';
const SAVE_SUCCESS = 'metadisk-gui/buckets/SAVE_SUCCESS';
const SAVE_FAIL = 'metadisk-gui/buckets/SAVE_FAIL';

const DELETE = 'metadisk-gui/buckets/DELETE';
const DELETE_SUCCESS = 'metadisk-gui/buckets/DELETE_SUCCESS';
const DELETE_FAIL = 'metadisk-gui/buckets/DELETE_FAIL';

const initialState = {
  loaded: false,
  saveError: {},
  id:0,
  storage: 10,
  transfer: 30,
  status: 'Active',
  name: 'Free Bucket'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_BUCKETS:
      return {
        ...state,
        loading: true
      };

    case FETCH_BUCKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };

    case FETCH_BUCKETS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };

    case ADD_BUCKET:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case ADD_BUCKET_SUCCESS:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case ADD_BUCKET_FAIL:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case DEL_BUCKET:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case DEL_BUCKET_SUCCESS:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case DEL_BUCKET_FAIL:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case UPDATE_BUCKET:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case UPDATE_BUCKET_SUCCESS:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
            key   : action.key,
            label : action.label,
            path  : action.path,
          }
        }
      };

    case UPDATE_BUCKET_FAIL:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          action._id: {
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
    promise: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/widget/update', {
      data: widget
    })
  };
}
