export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        //TODO: find a better solution for API auth
        var authAction = action();
        if(typeof authAction === 'object' && authAction.type  && authAction.type === 'metadisk-gui/auth/LOGIN') {
          client._options.password = authAction.password;
          client._options.email = authAction.email;
        }
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
