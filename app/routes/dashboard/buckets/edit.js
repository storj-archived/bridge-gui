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
      pubkeys: [
        '021ad5b2a84e4632566b87505dc36b2cf08035824eb925b1fa3423120c6eb436c0'
      ]
    };
  },
  actions: {
    removeBucket() {
      alert('DELETE /buckets/:id'); // implement API call here, then...
      this.transitionTo('dashboard.buckets');
    },
    updateBucket() {
      alert('PATCH /buckets/:id'); // implement API call here, then...
      this.transitionTo('dashboard.buckets');
    }
  }
});
