const SET_BALANCE = 'stroj/transactionRange/SET_BALANCE';
const SET_USAGE = 'stroj/transactionRange/SET_USAGE';

const TransactionGroup = (state = {}, action = {}) => {
  switch (action.type) {
    case '@@INIT':
      return {};
    case SET_BALANCE:
      return {
        ...state,
        balance: action.balance
      };
    case  SET_USAGE:
      return {
        ...state,
        usage: action.usage
      };
    default:
      return state;
  }
};

export const setBalance = (balance) => {
  return {
    type: SET_BALANCE,
    balance
  };
};

export const setUsage = (usage) => {
  return {
    type: SET_USAGE,
    usage
  };
};

export default TransactionGroup;
