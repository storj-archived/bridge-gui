import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    Ember.$.ajax({
      url: '//status.driveshare.org/api/total',
      dataType: 'json'
    }).then(function(data) {
      controller.set('storage', data.total_TB);
      controller.set('farmers', data.total_farmers);
    });
  }
});
