import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    scroll(target) {
      Ember.$('html, body').stop().animate({
        scrollTop: Ember.$(target).offset().top
      }, 1500, 'easeInOutExpo');
    }
  }
});
