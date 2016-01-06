import Ember from 'ember';

const BUCKET_FIXTURE = [
  {
    id: 0,
    storage: 10,
    transfer: 30,
    status: 'Active',
    name: 'Free Bucket'
  }
];

export default Ember.Route.extend({
  setupController(controller) {
    controller.set('buckets', BUCKET_FIXTURE);
  }
});
