import Ember from 'ember';

var windowListenerBound = false;

export default Ember.Component.extend({
  didInsertElement() {
    if (windowListenerBound) {
      return;
    }

    Ember.$(window).scroll(function() {
      var x = Ember.$(this).scrollTop();
      var transY = (x * 0.5), scale = 1 + (x * 0.0003);
      var transform = 'translateY(' + transY + 'px) ' +
                      'scale(' + scale + ') ' +
                      'translate3d(0,0,0)';

      windowListenerBound = true;

      Ember.$('.header-bg').css({
        opacity: 1 - (x * 0.0008),
        WebkitTransform: transform,
        MozTransform: transform,
        msTransform: transform,
        transform: transform
      });
    });
  }
});
