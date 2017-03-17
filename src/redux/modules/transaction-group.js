const SET_STORAGE = 'storj/transactionRange/SET_STORAGE';
const SET_BANDWIDTH = 'storj/transactionRange/SET_BANDWIDTH';
const SET_BALANCE = 'storj/transactionRange/SET_BALANCE';

const TransactionGroup = (state = {}, action = {}) => {
  switch (action.type) {
    case '@@INIT':
      return {};
    case SET_STORAGE:
      return {
        ...state,
        storage: action.storage
      };
    case  SET_BANDWIDTH:
      return {
        ...state,
        bandwidth: action.bandwidth
      };
    case SET_BALANCE:
      return {
        ...state,
        balance: action.balance
      }
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

export const setStorage = (storage) => {
  return {
    type: SET_STORAGE,
    storage
  };
};

export const setBandwidth = (bandwidth) => {
  return {
    type: SET_BANDWIDTH,
    bandwidth
  };
};

export default TransactionGroup;
