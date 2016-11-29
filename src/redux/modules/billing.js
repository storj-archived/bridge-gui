const ADD_CARD = 'storj/billing/ADD_CARD';
const ADD_CARD_SUCCESS = 'storj/billing/ADD_CARD_SUCCESS';
const ADD_CARD_FAIL = 'storj/billing/ADD_CARD_FAIL';

export default function Billing(state = {}, action = {}) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        saving: true,
        saved: false
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        ...action.result,
        saving: false,
        saved: true
      };
    case ADD_CARD_FAIL:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function addCard(cardData) {
  return {
    types: [ADD_CARD, ADD_CARD_SUCCESS, ADD_CARD_FAIL],
    // TODO: use a real `client` mehtod
    promise: ({ bridgeClient }) => bridgeClient.addCard(cardData)
  };
}
