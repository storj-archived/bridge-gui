import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    Ember.$('body').addClass('signup password');
  },
  deactivate: function() {
    Ember.$('body').removeClass('signup password');
  }
});
