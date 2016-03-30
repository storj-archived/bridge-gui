const LOAD = 'metadisk-gui/bucket/LOAD';
const LOAD_SUCCESS = 'metadisk-gui/bucket/LOAD_SUCCESS';
const LOAD_FAIL = 'metadisk-gui/bucket/LOAD_FAIL';

const CLEAR = 'metadisk-gui/bucket/CLEAR';

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

const LISTFILES = 'metadisk-gui/bucket/LISTFILES';
const LISTFILES_SUCCESS = 'metadisk-gui/bucket/LISTFILES_SUCCESS';
const LISTFILES_FAIL = 'metadisk-gui/bucket/LISTFILES_FAIL';

const bufferToArray = require('buffer-to-arraybuffer');

export default function Bucket(state = {}, action = {}) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        //saving: false,
        //saved: false,
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

    case CLEAR:
      return {};

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
        stored: false,
        storing: true,
      }
    case STORE_FAIL:
      return {
        ...state,
        stored: false,
        storing: false,
        error: action.error
      };
    case STORE_SUCCESS:
      return {
        ...state,
        stored: true,
        storing: false,
        listFileLoaded: false
        //fileHash: action.result.hash
      };

    case GETFILE:
      return {
        ...state,
        getFilePending: true,
        getFileLoaded: false
      }
    case GETFILE_FAIL:
      return {
        ...state,
        error: action.error,
        getFilePending: false,
        getFileLoaded: false
      };
    case GETFILE_SUCCESS:
      return {
        ...state,
        fileURI: action.result,
        downloadName: action.filename,
        getFilePending: false,
        getFileLoaded: true
      };

    case LISTFILES:
      return {
        ...state,
        listFilePending: true,
        listFileLoaded: false
      };
    case LISTFILES_FAIL:
      return {
        ...state,
        listFilePending: false,
        listFileLoaded: false,
        error: action.error
      };
    case LISTFILES_SUCCESS:
      return {
        ...state,
        listFilePending: false,
        listFileLoaded: true,
        files: action.result
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

export function clear() {
  return {
    type: CLEAR
  }
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
    promise: (client) => client.createToken(bucketId, "PUSH")
      .then(function(result) {
        return new Promise(function(resolve, reject) {
          var fileReq = new XMLHttpRequest();
          var formData = new FormData();
          formData.append('data', file);
          fileReq.open('PUT', client._options.baseURI + '/buckets/' + bucketId + '/files');
          fileReq.setRequestHeader('x-token', result.token);
          fileReq.setRequestHeader('x-filesize', file.size);
          fileReq.send(formData);

          fileReq.addEventListener('load', function handleSuccess(ev) {
            try {
              var response = JSON.parse(fileReq.responseText);
              if(fileReq.status === 200) {
                return resolve(response);
              } else if(response.error) {
                return reject(new Error(response.error));
              } else {
                return reject(new Error('Error ' + fileReq.status + 'while trying to upload your file. Please try again.' ));
              }
            } catch(e) {
              return reject(e);
            }
          });

          fileReq.addEventListener('error', handleFail);
          fileReq.addEventListener('abort', handleFail);

          function handleFail(ev) {
            return reject(new Error('An Error occurred while trying to upload your file. Please try again.'))
          }
        });
    })
  };
}

export function getFile(bucketId, filehash, type, name) {
  return {
    types: [GETFILE, GETFILE_SUCCESS, GETFILE_FAIL],
    filename: name,
    promise: (client) => client.createToken(bucketId, "PULL")
      .then(function(result) {
        return client.getFilePointer(bucketId, result.token, filehash);
      })
      .then(function(pointers) {
        return new Promise(function(resolve, reject) {
          var chunks = [];
          client.resolveFileFromPointers(pointers).then(
            function success(chunks) {
              let blob = new Blob(chunks, {
                type: type
              });
              let objURL = URL.createObjectURL(blob);
              return resolve(objURL);
            },
            function fail(err) {
              return reject(err);
            }
          );
        });
      })
  };
}

export function listFiles(bucketId) {
  return {
    types: [LISTFILES, LISTFILES_SUCCESS, LISTFILES_FAIL],
    promise: (client) => client.listFilesInBucket(bucketId)
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
