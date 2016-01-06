import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createBucket() {
      alert('POST /buckets'); // implement API call here, then...
      this.transitionTo('dashboard.buckets');
    }
  }
});
