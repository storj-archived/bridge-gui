export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
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
          if(result.status === '401') {

          }
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
