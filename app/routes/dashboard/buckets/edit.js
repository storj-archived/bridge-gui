import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      bucket: {
        id: 0,
        storage: 10,
        transfer: 30,
        status: 'Active',
        name: 'Free Bucket'
      },
      pubkeys: []
    };
  }
});
