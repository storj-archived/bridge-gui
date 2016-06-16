const noop = () => {};

export default {
  createSocket () {
    return {
      on: noop,
      bind: noop,
      send: noop,
      close: noop
    }
  }
};