const SIGNUP = 'metadisk-gui/auth/LOAD';
const SIGNUP_SUCCESS = 'metadisk-gui/auth/LOAD_SUCCESS';
const SIGNUP_FAIL = 'metadisk-gui/auth/LOAD_FAIL';
const LOGIN = 'metadisk-gui/auth/LOGIN';
const LOGIN_SUCCESS = 'metadisk-gui/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'metadisk-gui/auth/LOGIN_FAIL';
const LOGOUT = 'metadisk-gui/auth/LOGOUT';
const LOGOUT_SUCCESS = 'metadisk-gui/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'metadisk-gui/auth/LOGOUT_FAIL';

const initialState = {
  loadedSignup: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        loadingSignup: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loadingSignup: false,
        loadedSignup: true,
        signupSuccessMessage: action.result
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loadingSignup: false,
        loadedSignup: false,
        signupError: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.user;
}
/* Endpoint to simply check that a user is authenticated
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}
*/
export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
