import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    scroll(target) {
      $('html, body').stop().animate({
        scrollTop: $(target).offset().top
      }, 1500, 'easeInOutExpo');
    },
    getStarted(showme, hideme) {
      Ember.$(hideme).hide();
  		Ember.$(showme).fadeIn();
  		Ember.$('input[type="email"]', showme).focus();
    }
  }
});
