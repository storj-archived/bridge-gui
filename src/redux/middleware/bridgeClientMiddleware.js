import clientWrapper from 'utils/apiClient';

export default function bridgeClientMiddleware() {
  let privkey = localStorage.getItem('privkey');
  if (privkey !== null) {
    clientWrapper.useKeyPair(clientWrapper.createKeyPair(privkey));
  }

  window.addEventListener('storage', function(e) {
    //for cross-tab state updating
    if (e.key === 'privkey') {
      if (e.oldValue && !e.newValue) {
        clientWrapper.removeKeyPair();
      }
    }
  });

  const client = clientWrapper.api;

  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      // eslint-disable-line no-redeclare
      const {promise, types, ...rest} = action;

      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          next({...rest, result, type: SUCCESS});
        },
        (error) => {
          next({...rest, error, type: FAILURE});
        }
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}
