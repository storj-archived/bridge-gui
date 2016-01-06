import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    getStarted(showme, hideme) {
      Ember.$(hideme).hide();
  		Ember.$(showme).fadeIn();
  		Ember.$('input[type="email"]', showme).focus();
    }
  }
});
