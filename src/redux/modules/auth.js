const SIGNUP = 'metadisk-gui/auth/LOAD';
const SIGNUP_SUCCESS = 'metadisk-gui/auth/LOAD_SUCCESS';
const SIGNUP_FAIL = 'metadisk-gui/auth/LOAD_FAIL';
const LOGIN = 'metadisk-gui/auth/LOGIN';
const LOGOUT = 'metadisk-gui/auth/LOGOUT';

const initialState = {
  loadedSignup: false,
  email: '',
  password: ''
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
        loggedIn: true,
        email: action.email,
        pass: action.pass
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        email: '',
        pass: ''
      };
    default:
      return state;
  }
}

export function isAuthenticated(globalState) {
  return globalState.auth && globalState.auth.email && globalState.auth.pass;
}

export function login(email, pass) {
  return {
    type: LOGIN,
    email: email,
    pass: pass
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function signup(email, pass) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.createUser({
      email: email,
      pass: pass
    })
  }
}
