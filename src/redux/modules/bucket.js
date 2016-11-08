const LOAD = 'storj/bucket/LOAD';
const LOAD_SUCCESS = 'storj/bucket/LOAD_SUCCESS';
const LOAD_FAIL = 'storj/bucket/LOAD_FAIL';

const CLEAR = 'storj/bucket/CLEAR';

const ADDNEWKEYFIELD = 'storj/bucket/ADDNEWKEYFIELD';
const REMOVENEWKEYFIELD = 'storj/bucket/REMOVENEWKEYFIELD';

const EDITKEYFIELD = 'storj/bucket/EDITKEYFIELD';
const STOPEDITKEYFIELD = 'storj/bucket/STOPEDITKEYFIELD';

const SELECTKEYFIELDS = 'storj/bucket/SELECTKEYFIELDS';
const SELECTALLKEYFIELDS = 'storj/bucket/SELECTALLKEYFIELDS';

const CREATE = 'storj/bucket/CREATE';
const CREATE_SUCCESS = 'storj/bucket/CREATE_SUCCESS';
const CREATE_FAIL = 'storj/bucket/CREATE_FAIL';

const UPDATE = 'storj/bucket/UPDATE';
const UPDATE_SUCCESS = 'storj/bucket/UPDATE_SUCCESS';
const UPDATE_FAIL = 'storj/bucket/UPDATE_FAIL';

const DEL = 'storj/bucket/DELETE';
const DEL_SUCCESS = 'storj/bucket/DELETE_SUCCESS';
const DEL_FAIL = 'storj/bucket/DELETE_FAIL';

const GETFILE = 'storj/bucket/GETFILE';
const GETFILE_SUCCESS = 'storj/bucket/GETFILE_SUCCESS';
const GETFILE_FAIL = 'storj/bucket/GETFILE_FAIL';

const STORE = 'storj/bucket/STORE';
const STORE_SUCCESS = 'storj/bucket/STORE_SUCCESS';
const STORE_FAIL = 'storj/bucket/STORE_FAIL';

const LISTFILES = 'storj/bucket/LISTFILES';
const LISTFILES_SUCCESS = 'storj/bucket/LISTFILES_SUCCESS';
const LISTFILES_FAIL = 'storj/bucket/LISTFILES_FAIL';

export default function Bucket(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        // saving: false,
        // saved: false,
        token: null,
        fileHash: null,
        fileURI: null,
        newKeyField: null
      };
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
        ...action.result,
        selectedKeys: [],
        editing: false
      };

    case ADDNEWKEYFIELD:
      return {
        ...state,
        newKeyField: ''
      };

    case REMOVENEWKEYFIELD:
      return {
        ...state,
        newKeyField: null
      };

    case EDITKEYFIELD:
      return {
        ...state,
        editing: action.keyId
      };

    case STOPEDITKEYFIELD:
      return {
        ...state,
        editing: false
      };

    case SELECTKEYFIELDS:
      return {
        ...state,
        selectedKeys: selectedPubKeys(state, action)
      };

    case SELECTALLKEYFIELDS:
      return {
        ...state,
        selectedKeys: selectedPubKeys(state, action)
      };

    case CLEAR:
      return {};

    case CREATE:
      return {
        ...state,
        saving: true,
        saved: false,
      };
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
        updating: true,
        updated: false,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.error
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        newKeyField: null,
        ...action.result,
        selectedKeys: selectedPubKeys(state, action)

      };

    case DEL:
      return {
        ...state,
        destroying: true,
        destroyed: false,
      };
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
      };
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
        // fileHash: action.result.hash
      };

    case GETFILE:
      return {
        ...state,
        getFilePending: true,
        getFileLoaded: false
      };
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

export function selectedPubKeys(state, action) {
  switch (action.type) {
    case SELECTKEYFIELDS:
      return (function selectKeyFields() {
        const keys = [...state.selectedKeys];
        const keyInd = keys.indexOf(action.keyId);
        const isAlreadySelected = keyInd !== -1;
        if (isAlreadySelected) {
          keys.splice(keyInd, 1);
        } else {
          keys.push(action.keyId);
        }
        return keys;
      })();

    case SELECTALLKEYFIELDS:
      return (function selectAllKeyFields() {
        let keys;
        if (state.selectedKeys.length === state.pubkeys.length) {
          keys = [];
        } else {
          keys = [...state.pubkeys];
        }
        return keys;
      })();

    case UPDATE_SUCCESS:
      return (function updateSuccess() {
        const sKeys = [...state.selectedKeys];
        state.selectedKeys.forEach((sElem) => {
          const hasBeenRemoved = action.result.pubkeys.indexOf(sElem) === -1;
          if (hasBeenRemoved) {
            sKeys.splice(sKeys.indexOf(sElem), 1);
          }
        });
        return sKeys;
      })();

    default:
      return state;
  }
}

export function load(bucketId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ bridgeClient }) => bridgeClient.getBucketById(bucketId)
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}

export function create(bucket) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: ({bridgeClient}) => bridgeClient.createBucket(bucket)
  };
}

export function update(bucketId, bucket) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: ({ bridgeClient }) => bridgeClient.updateBucketById(bucketId, {
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
    promise: ({bridgeClient}) => bridgeClient.destroyBucketById(bucketId)
  };
}

export function storeFile(bucketId, file) {
  return {
    types: [STORE, STORE_SUCCESS, STORE_FAIL],
    promise: ({bridgeClient}) => bridgeClient.createToken(bucketId, "PUSH")
      .then(function(result) {
        return new Promise(function(resolve, reject) {
          var fileReq = new XMLHttpRequest();
          var formData = new FormData();
          formData.append('data', file);
          fileReq.open('PUT', bridgeClient._options.baseURI + '/buckets/' + bucketId + '/files');
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
    promise: ({bridgeClient}) => bridgeClient.createToken(bucketId, "PULL")
      .then(function(result) {
        return bridgeClient.getFilePointer(bucketId, result.token, filehash);
      })
      .then(function(pointers) {
        return new Promise(function(resolve, reject) {
          var chunks = [];
          bridgeClient.resolveFileFromPointers(pointers).then(
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
    promise: ({bridgeClient}) => bridgeClient.listFilesInBucket(bucketId)
  };
}

export function editPubKey(id) {
  return {
    type: EDITKEYFIELD,
    keyId: id
  };
}

export function deleteSelectedPubKeys(selectedKeys, bucketId, bucket) {
  bucket.pubkeys = bucket.pubkeys.filter((val) => {
    return selectedKeys.indexOf(val) === -1;
  });

  return update(bucketId, bucket);
}

export function addNewPubKey() {
  return {
    type: ADDNEWKEYFIELD
  };
}

export function removeNewPubKey() {
  return {
    type: REMOVENEWKEYFIELD
  };
}

export function saveEditedPubKey(prevKey, newKey, bucketId, bucket) {
  let keyInd = bucket.pubkeys.indexOf(prevKey);
  let keys = [...bucket.pubkeys];

  if(keyInd !== -1) {
    keys[keyInd] = newKey;
  }
  bucket.pubkeys = keys;

  return update(bucketId, bucket);
}

export function saveNewPubKey(newKey, bucketId, bucket) {
  let keys = [...bucket.pubkeys];
  keys.push(newKey);
  bucket.pubkeys = keys;

  return update(bucketId, bucket);
}

export function stopEditPubKey() {
  return {
    type: STOPEDITKEYFIELD
  };
}

export function selectPubKey(id) {
  return {
    type: SELECTKEYFIELDS,
    keyId: id
  };
}

export function selectAllPubKey() {
  return {
    type: SELECTALLKEYFIELDS
  };
}

/*
export function storeFile(bucketId, tokenStr, file) {
  return {
    types: [STORE, STORE_SUCCESS, STORE_FAIL],
    promise: ({bridgeClient}) => bridgeClient.storeFileInBucket(bucketId, tokenStr, file)
  };
}
*/
