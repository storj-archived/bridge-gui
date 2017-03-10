const SET_STORAGE = 'storj/transactionRange/SET_STORAGE';
const SET_BANDWIDTH = 'storj/transactionRange/SET_BANDWIDTH';

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
    default:
      return state;
  }
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
