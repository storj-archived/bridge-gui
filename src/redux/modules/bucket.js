const LOAD = 'metadisk-gui/bucket/LOAD';
const LOAD_SUCCESS = 'metadisk-gui/bucket/LOAD_SUCCESS';
const LOAD_FAIL = 'metadisk-gui/bucket/LOAD_FAIL';

const CREATE = 'metadisk-gui/bucket/CREATE';
const CREATE_SUCCESS = 'metadisk-gui/bucket/CREATE_SUCCESS';
const CREATE_FAIL = 'metadisk-gui/bucket/CREATE_FAIL';

const UPDATE = 'metadisk-gui/bucket/UPDATE';
const UPDATE_SUCCESS = 'metadisk-gui/bucket/UPDATE_SUCCESS';
const UPDATE_FAIL = 'metadisk-gui/bucket/UPDATE_FAIL';

const DEL = 'metadisk-gui/bucket/DELETE';
const DEL_SUCCESS = 'metadisk-gui/bucket/DELETE_SUCCESS';
const DEL_FAIL = 'metadisk-gui/bucket/DELETE_FAIL';

const GETFILE = 'metadisk-gui/bucket/GETFILE';
const GETFILE_SUCCESS = 'metadisk-gui/bucket/GETFILE_SUCCESS';
const GETFILE_FAIL = 'metadisk-gui/bucket/GETFILE_FAIL';

const STORE = 'metadisk-gui/bucket/STORE';
const STORE_SUCCESS = 'metadisk-gui/bucket/STORE_SUCCESS';
const STORE_FAIL = 'metadisk-gui/bucket/STORE_FAIL';

const bufferToArray = require('buffer-to-arraybuffer')


export default function Bucket(state = {}, action = {}) {
  console.log(action)
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        saving: false,
        saved: false,
        token: null,
        fileHash: null,
        fileURI: null
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
        ...action.result
      };

    case CREATE:
      return {
        ...state,
        saving: true,
        saved: false,
      }
    case CREATE_FAIL:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.error
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        id: action.result.id,
        name: action.result.name,
        user: action.result.user,
        pubkeys: action.result.pubkeys
      };

    case UPDATE:
      return {
        ...state,
        saving: true,
        saved: false,
      }
    case UPDATE_FAIL:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.error
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        ...action.result
      };

    case DEL:
      return {
        ...state,
        destroying: true,
        destroyed: false,
      }
    case DEL_FAIL:
      return {
        ...state,
        destroying: false,
        destroyed: false,
        error: action.error
      };
    case DEL_SUCCESS:
      return {
        destroying: false,
        destroyed: true,
      };

    case STORE:
      return {
        ...state,
      }
    case STORE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case STORE_SUCCESS:
      return {
        ...state,
        fileHash: action.result.hash
      };

    case GETFILE:
      return {
        ...state,
      }
    case GETFILE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GETFILE_SUCCESS:
      return {
        ...state,
        fileURI: action.result
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

export function update(bucketId, bucket) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.updateBucketById(bucketId, {
      storage  : bucket.storage,
      transfer : bucket.transfer,
      name     : bucket.name,
      pubkeys  : bucket.pubkeys
    })
  };
}

export function destroy(bucketId) {
  return {
    types: [DEL, DEL_SUCCESS, DEL_FAIL],
    promise: (client) => client.destroyBucketById(bucketId)
  };
}

export function storeFile(bucketId, file) {
  return {
    types: [STORE, STORE_SUCCESS, STORE_FAIL],
    promise: (client) => client.createToken(bucketId, "PUSH").then(function(result) {
      return new Promise(function(resolve, reject) {
        var fileReq = new XMLHttpRequest();
        var formData = new FormData();
        formData.append('data', file)
        fileReq.open('PUT', client._options.baseURI + '/buckets/' + bucketId);
        fileReq.setRequestHeader('x-token', result.token)
        fileReq.send(formData);
        fileReq.addEventListener('load', function complete(ev) {
          let response = JSON.parse(fileReq.responseText);
          if(response.error) {
            return reject(new Error(response.error));
          }
          return resolve(response);
        });
        //bucketId, result.token, file

      });

    })
  };
}

export function getFile(bucketId, filehash, type) {
  return {
    types: [GETFILE, GETFILE_SUCCESS, GETFILE_FAIL],
    promise: (client) => client.createToken(bucketId, "PULL")
      .then(function(result) {
        return client.getFileFromBucket(bucketId, result.token, filehash);
      })
      .then(function(result) {
        return client.resolveFileFromPointers(result);
      })
      .then(function(result) {
        return new Promise(function(resolve, reject) {
          let arrBuff = bufferToArray(result);
          let blob = new Blob([arrBuff], {
            type: type
          });
          resolve(URL.createObjectURL(blob));
        });
      })
  };
}
/*
export function storeFile(bucketId, tokenStr, file) {
  return {
    types: [STORE, STORE_SUCCESS, STORE_FAIL],
    promise: (client) => client.storeFileInBucket(bucketId, tokenStr, file)
  };
}
*/
