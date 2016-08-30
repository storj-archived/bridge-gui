const STORE_EMAIL = 'storj/localStorage/STORE_EMAIL';

const getInitState = (state) => {
  let email;
  if (window && window.localStorage) {
    email = window.localStorage.getItem('email');
  }
  return {...state, email};
};

export default function LocalStorage(state = {}, action = {}) {
  switch (action.type) {
    case '@@INIT':
      return getInitState(state)

    case STORE_EMAIL:
      const {email} = action;
      if (window && window.localStorage) {
        window.localStorage.setItem('email', email);
      }
      return {
        ...state,
        email
      };
    default:
      return state;
  }
}

export function storeEmail(email) {
  return {
    type: STORE_EMAIL,
    email
  }
}
