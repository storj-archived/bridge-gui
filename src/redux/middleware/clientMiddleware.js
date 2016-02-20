export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      //TODO: find a better solution for API auth
      var authAction = action;
      if(typeof authAction === 'object' && authAction.types && authAction.types[0] && authAction.types[0] === 'metadisk-gui/auth/LOGIN') {
        client._options.password = authAction.password;
        client._options.email = authAction.email;
      }
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      // eslint-disable-line no-redeclare
      const { promise, types, ...rest } = action;

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
