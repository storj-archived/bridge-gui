const SIGNUP = 'metadisk-gui/auth/LOAD';
const SIGNUP_SUCCESS = 'metadisk-gui/auth/LOAD_SUCCESS';
const SIGNUP_FAIL = 'metadisk-gui/auth/LOAD_FAIL';
const LOGIN = 'metadisk-gui/auth/LOGIN';
const LOGIN_SUCCESS = 'metadisk-gui/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'metadisk-gui/auth/LOGIN_FAIL';
const LOGOUT = 'metadisk-gui/auth/LOGOUT';

const initialState = {
  loadedSignup: false,
  email: '',
  password: '',
  loggedIn: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        savingSignup: true,
        loadedSignup: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        savingSignup: false,
        loadedSignup: true,
        signupSuccessMessage: action.result
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        savingSignup: false,
        loadedSignup: false,
        signupError: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggedIn: false,
        email: action.email,
        password: action.password
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        email: action.email,
        password: action.password
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        email: action.email,
        password: action.password
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        email: '',
        password: ''
      };
    default:
      return state;
  }
}

export function isAuthenticated(globalState) {
  return globalState.auth && globalState.auth.email && globalState.auth.password;
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    email: email,
    password: password,
    promise: (client) => client.getPublicKeys()
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function signup(email, password) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.createUser({
      email: email,
      password: password
    })
  }
}
