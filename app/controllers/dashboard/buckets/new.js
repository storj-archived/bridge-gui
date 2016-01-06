import Ember from 'ember';

export default Ember.Controller.extend({
  model: {
    name: '',
    pubkeys: []
  },
  actions: {
    addPublicKey() {
      var pubkeys = this.get('model.pubkeys');
      pubkeys.pushObject(); // add empty placeholder
      this.set('model.pubkeys', pubkeys);
    }
  }
});
